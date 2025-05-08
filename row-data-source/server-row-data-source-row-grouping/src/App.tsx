import {
  LyteNyteGrid,
  useLyteNytePro,
  useServerDataSource,
} from "@1771technologies/lytenyte-pro";
import {
  AsyncDataResponseProReact,
  DataFetcherProReact,
} from "@1771technologies/lytenyte-pro/types";
import "@1771technologies/lytenyte-pro/grid.css";
import { ColumnProReact } from "@1771technologies/lytenyte-pro/types";
import { bankDataSmall } from "@1771technologies/sample-data/bank-data-smaller";
import { useId } from "react";
import sql from "alasql";

const columns: ColumnProReact[] = [
  { id: "age", type: "number" },
  { id: "job", rowGroupable: true },
  { id: "balance", type: "number" },
  { id: "education", rowGroupable: true },
  { id: "marital" },
  { id: "default" },
  { id: "housing" },
];

export function App() {
  const ds = useServerDataSource({
    rowDataFetcher: dataFetcher,
  });

  const grid = useLyteNytePro({
    gridId: useId(),
    rowDataSource: ds,
    rowGroupModel: ["job", "education"],
    columns,
  });

  return (
    <div style={{ height: 500, display: "flex", flexDirection: "column" }}>
      <div style={{ flex: "1" }}>
        <LyteNyteGrid grid={grid} />
      </div>
    </div>
  );
}

// Create our server db. This is for illustration purposes only

sql(`
CREATE TABLE IF NOT EXISTS banks
 (
    age number,
    job string,
    balance number,
    education string,
    marital string,
    _default string,
    housing string
 )
`);

sql.tables.banks.data = bankDataSmall;

const dataFetcher: DataFetcherProReact = async (p) => {
  await new Promise<void>((res) => {
    setTimeout(() => res(), 500);
  });

  const blockSize = p.blockSize;
  const blocks: AsyncDataResponseProReact["blocks"] = [];
  const state = p.api.getState();

  const groupModel = state.rowGroupModel.peek();
  const isGrouping = groupModel.length > 0;

  let rootCount: number | undefined = undefined;
  if (isGrouping) {
    rootCount = sql<{ cnt: number }[]>(
      `SELECT count(*) AS cnt FROM banks GROUP BY ${groupModel[0]}`
    ).length;
  } else {
    rootCount = sql<{ cnt: number }[]>(`SELECT count(*) AS cnt FROM banks`)[0]
      .cnt;
  }

  for (let i = 0; i < p.requestBlocks.length; i++) {
    const b = p.requestBlocks[i];

    const groupKey = groupModel[b.path.length];

    // We have a row grouping so we need to group by item, offset and get count.
    if (groupKey) {
      const data = sql<{ childCnt: number; pathKey: string }[]>(
        `SELECT *, ${groupKey} AS pathKey, count(*) AS childCnt FROM banks GROUP BY ${groupKey} LIMIT ${blockSize} OFFSET ${
          blockSize * b.blockKey
        }`
      );
      const cnt = sql<{ cnt: number }[]>(
        `SELECT count(*) AS cnt FROM banks GROUP BY ${groupKey}`
      ).length;

      blocks.push({
        blockKey: b.blockKey,
        frame: {
          childCounts: data.map((d) => d.childCnt),
          data: data.map((c) => ({ ...c, pathKey: c.pathKey.toString() })),
          ids: data.map(
            (_, i) => `${i + b.blockKey * blockSize}__${b.path.join("/")}`
          ),
          kinds: data.map(() => 2),
          pathKeys: data.map((c) => c.pathKey.toString()),
        },
        path: b.path,
        size: cnt,
      });
      continue;
    }

    const whereParts = b.path
      .map((c, i) => {
        const column = p.api.columnById(groupModel[i])!;
        return `${groupModel[i]} = ${
          column.type === "number" ? Number.parseFloat(c) : `'${c}'`
        }`;
      })
      .join(" AND ");

    const whereClause = whereParts ? `WHERE ${whereParts}` : "";

    const query = `SELECT * FROM banks ${whereClause} LIMIT ${blockSize} OFFSET ${
      b.blockKey * blockSize
    }`;
    const cntQuery = `SELECT count(*) AS cnt FROM banks ${whereClause}`;

    const data = sql(query) as unknown[];
    const count = sql<{ cnt: number }[]>(cntQuery)[0].cnt;

    blocks.push({
      blockKey: b.blockKey,
      frame: {
        childCounts: data.map(() => 0),
        data,
        ids: data.map((_, i) => `${b.path ? b.path.join("/") + "/" : ""}${i}`),
        kinds: data.map(() => 1),
        pathKeys: data.map(() => null),
      },
      path: b.path,
      size: count,
    });
  }

  return {
    blocks,
    reqTime: p.reqTime,
    rootCount,
  } satisfies AsyncDataResponseProReact;
};

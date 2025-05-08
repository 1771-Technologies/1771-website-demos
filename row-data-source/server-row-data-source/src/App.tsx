import {
  LyteNyteGrid,
  useLyteNytePro,
  useServerDataSource,
} from "@1771technologies/lytenyte-pro";
import {
  AsyncDataResponseProReact,
  DataFetcherParamsPropReact,
} from "@1771technologies/lytenyte-pro/types";
import "@1771technologies/lytenyte-pro/grid.css";
import { ColumnProReact } from "@1771technologies/lytenyte-pro/types";
import { bankDataSmall } from "@1771technologies/sample-data/bank-data-smaller";
import { useId } from "react";
import sql from "alasql";

const columns: ColumnProReact[] = [
  { id: "age", type: "number" },
  { id: "job" },
  { id: "balance", type: "number" },
  { id: "education" },
  { id: "marital" },
  { id: "default" },
  { id: "housing" },
  { id: "loan" },
  { id: "contact" },
  { id: "day", type: "number" },
  { id: "month" },
  { id: "duration" },
  { id: "campaign" },
  { id: "pdays" },
  { id: "previous" },
  { id: "poutcome" },
  { id: "y" },
];

export function App() {
  const ds = useServerDataSource({
    rowDataFetcher: dataFetcher,
  });

  const grid = useLyteNytePro({
    gridId: useId(),
    rowDataSource: ds,
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
    housing string,
    loan string,
    contact string,
    day number,
    month string,
    duration number,
    campaign number,
    pdays number,
    previous number,
    poutcome string,
    y string
 )
`);

sql.tables.banks.data = bankDataSmall;

const dataFetcher = async (p: DataFetcherParamsPropReact) => {
  // An artificial pause to make it seem like a server request
  await new Promise<void>((res) => {
    setTimeout(() => res(), 500);
  });

  const blockSize = p.blockSize;
  const blocks: AsyncDataResponseProReact["blocks"] = [];

  let rootCount: number | undefined = undefined;
  rootCount = sql<{ cnt: number }[]>(`SELECT count(*) AS cnt FROM banks`)[0]
    .cnt;

  for (let i = 0; i < p.requestBlocks.length; i++) {
    const b = p.requestBlocks[i];

    const query = `SELECT * FROM banks LIMIT ${blockSize} OFFSET ${
      b.blockKey * blockSize
    }`;
    const cntQuery = `SELECT count(*) AS cnt FROM banks`;

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

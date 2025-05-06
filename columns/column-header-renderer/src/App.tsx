import {
  LyteNyteGrid,
  useLyteNytePro,
  useClientDataSource,
} from "@1771technologies/lytenyte-pro";
import "@1771technologies/lytenyte-pro/grid.css";
import {
  ColumnHeaderRendererParamsProReact,
  ColumnProReact,
} from "@1771technologies/lytenyte-pro/types";
import { bankDataSmall } from "@1771technologies/sample-data/bank-data-smaller";
import { useId } from "react";

function HeaderRendererExample({
  api,
  column,
}: ColumnHeaderRendererParamsProReact) {
  const name = column.headerName ?? column.id;
  const index = api.columnIndex(column);

  return (
    <div
      style={{
        textAlign: "center",
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textTransform: "uppercase",
      }}
    >
      {index}. {name}
    </div>
  );
}

const columns: ColumnProReact[] = [
  { id: "age", type: "number", headerRenderer: HeaderRendererExample },
  { id: "job", headerRenderer: HeaderRendererExample },
  { id: "balance", type: "number", headerRenderer: HeaderRendererExample },
  { id: "education", headerRenderer: HeaderRendererExample },
  { id: "marital", headerRenderer: HeaderRendererExample },
];

export function App() {
  const ds = useClientDataSource({ data: bankDataSmall });

  const grid = useLyteNytePro({
    gridId: useId(),
    rowDataSource: ds,
    columns,

    columnBase: {
      widthFlex: 1,
    },
  });

  return (
    <div style={{ height: 500, display: "flex", flexDirection: "column" }}>
      <div style={{ flex: "1" }}>
        <LyteNyteGrid grid={grid} />
      </div>
    </div>
  );
}

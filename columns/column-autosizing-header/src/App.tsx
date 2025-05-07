import {
  LyteNyteGrid,
  useLyteNytePro,
  useClientDataSource,
} from "@1771technologies/lytenyte-pro";
import "@1771technologies/lytenyte-pro/grid.css";
import { ColumnProReact } from "@1771technologies/lytenyte-pro/types";
import { bankDataSmall } from "@1771technologies/sample-data/bank-data-smaller";
import { useId } from "react";

const PADDING = 16;
const columns: ColumnProReact[] = [
  {
    id: "age",
    type: "number",
    headerRenderer: () => (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          textAlign: "center",
        }}
      >
        <div>The Age</div>
        <div>Of Bank Account owner</div>
      </div>
    ),
    headerAutosizeFn: (c) =>
      (c.api.autosizeMeasure("Of Bank Account Owner")?.width ?? 0) + PADDING,
  },
  { id: "job" },
  { id: "balance", type: "number" },
  { id: "education" },
  { id: "marital" },
];

export function App() {
  const ds = useClientDataSource({ data: bankDataSmall });

  const grid = useLyteNytePro({
    gridId: useId(),
    rowDataSource: ds,
    columns,
    columnHeaderHeight: 60,

    columnBase: {
      resizable: true,
    },
  });

  return (
    <div style={{ height: 500, display: "flex", flexDirection: "column" }}>
      <div>
        <button
          onClick={() => {
            grid.api.autosizeColumns(null, { includeHeader: true });
          }}
        >
          Autosize Columns
        </button>
        <button onClick={() => grid.state.columns.set(columns)}>
          Reset Columns
        </button>
      </div>
      <div style={{ flex: "1" }}>
        <LyteNyteGrid grid={grid} />
      </div>
    </div>
  );
}

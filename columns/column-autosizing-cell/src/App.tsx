import {
  LyteNyteGrid,
  useLyteNytePro,
  useClientDataSource,
} from "@1771technologies/lytenyte-pro";
import "@1771technologies/lytenyte-pro/grid.css";
import { ColumnProReact } from "@1771technologies/lytenyte-pro/types";
import { bankDataSmall } from "@1771technologies/sample-data/bank-data-smaller";
import { useId } from "react";

const columns: ColumnProReact[] = [
  {
    id: "age",
    type: "number",
    width: 120,
  },
  { id: "job", width: 180 },
  { id: "balance", type: "number" },
  { id: "education", width: 220 },
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
      cellAutosizeFn: () => 150,
    },
  });

  return (
    <div style={{ height: 500, display: "flex", flexDirection: "column" }}>
      <div>
        <button
          onClick={() => {
            grid.api.autosizeColumns();
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

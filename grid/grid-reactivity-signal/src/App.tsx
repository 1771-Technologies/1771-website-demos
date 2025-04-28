import {
  LyteNyteGrid,
  useLyteNytePro,
  useClientDataSource,
} from "@1771technologies/lytenyte-pro";
import "@1771technologies/lytenyte-pro/grid.css";
import { ColumnProReact } from "@1771technologies/lytenyte-pro/types";
import { bankDataSmall } from "@1771technologies/sample-data/bank-data-smaller";
import { useMemo } from "react";

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
  const ds = useClientDataSource({ data: bankDataSmall });

  const grid = useLyteNytePro({
    gridId: "my-grid",
    rowDataSource: ds,
    columns,

    rowSelectionSelectedIds: new Set(["3-center", "4-center"]),
    rowSelectionCheckbox: "normal",
    rowSelectionMode: "multiple",
    rowSelectionMultiSelectOnClick: true,
    rowSelectionPointerActivator: "single-click",
  });

  const selectedRows = grid.state.rowSelectionSelectedIds.use();
  const selectedRow = useMemo(() => {
    if (!selectedRows.size) return null;

    return [...selectedRows.values()].join(", ");
  }, [selectedRows]);

  return (
    <div style={{ height: 700, display: "flex", flexDirection: "column" }}>
      <div>
        <button
          onClick={() => grid.state.rowSelectionSelectedIds.set(new Set())}
        >
          Clear Row Selection
        </button>
      </div>
      <div style={{ padding: 8, display: "flex", gap: 8 }}>
        {selectedRow && `Currently selected rows: ${selectedRow}`}
        {!selectedRow && "No rows selected"}
      </div>
      <div style={{ flex: "1" }}>
        <LyteNyteGrid grid={grid} />
      </div>
    </div>
  );
}

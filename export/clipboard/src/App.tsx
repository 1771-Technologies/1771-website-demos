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
  const ds = useClientDataSource({
    data: bankDataSmall,
  });

  const grid = useLyteNytePro({
    gridId: useId(),
    rowDataSource: ds,
    columns,

    cellSelections: [{ rowStart: 2, rowEnd: 6, columnStart: 2, columnEnd: 5 }],
    cellSelectionMode: "range",
  });

  return (
    <div style={{ height: 500, display: "flex", flexDirection: "column" }}>
      <button
        onClick={async () => {
          const s = grid.state.cellSelections.peek()?.[0];
          grid.api.clipboardCopyCells(s);
        }}
      >
        Copy
      </button>
      <button
        onClick={async () => {
          const s = grid.state.cellSelections.peek()?.[0];
          grid.api.clipboardCutCells(s);
        }}
      >
        Cut
      </button>
      <button
        onClick={async () => {
          const s = grid.state.cellSelections.peek()?.[0];
          if (!s) return;
          grid.api.clipboardPasteCells(s);
        }}
      >
        Paste
      </button>
      <div style={{ flex: "1" }}>
        <LyteNyteGrid grid={grid} />
      </div>
    </div>
  );
}

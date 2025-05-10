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

  const grid2 = useLyteNytePro({
    gridId: useId(),
    rowDataSource: ds,
    columns,
  });

  const grid = useLyteNytePro({
    gridId: "First Grid",
    rowDataSource: ds,

    rowDragEnabled: true,
    rowDragMultiRow: true,
    rowSelectionMode: "multiple",
    rowSelectionMultiSelectOnClick: true,
    rowDragExternalGrids: [grid2.api],
    columns,
  });

  grid2.useEvent("onRowDragDrop", (p) => {
    alert(
      `You dragged over ${p.overIndex} from ${p
        .externalGridApi!.getState()
        .gridId.peek()}`
    );
  });

  return (
    <div>
      <div
        style={{
          height: 700,
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        <div style={{ flex: "1" }}>
          <LyteNyteGrid grid={grid} />
        </div>
        <div style={{ flex: "1" }}>
          <LyteNyteGrid grid={grid2} />
        </div>
      </div>
    </div>
  );
}

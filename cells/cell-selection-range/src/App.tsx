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
];

export function App() {
  const ds = useClientDataSource({
    data: bankDataSmall,
  });

  const grid = useLyteNytePro({
    gridId: useId(),
    rowDataSource: ds,
    columns,

    cellSelections: [{ rowStart: 2, rowEnd: 5, columnStart: 2, columnEnd: 4 }],

    cellSelectionMode: "range",
  });

  return (
    <div style={{ height: 500, display: "flex", flexDirection: "column" }}>
      <div style={{ flex: "1" }}>
        <LyteNyteGrid grid={grid} />
      </div>
    </div>
  );
}

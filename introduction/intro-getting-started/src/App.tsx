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
  { id: "marital" },
  { id: "education" },
  { id: "balance", type: "number" },
];

export function App() {
  const ds = useClientDataSource({ data: bankDataSmall });

  const grid = useLyteNytePro({
    gridId: useId(),
    rowDataSource: ds,
    columns,
    columnBase: {
      sortable: true,
      movable: true,
      resizable: true,
      uiHints: { sortButton: true },
    },
  });

  return (
    <div style={{ height: 500 }}>
      <LyteNyteGrid grid={grid} />
    </div>
  );
}

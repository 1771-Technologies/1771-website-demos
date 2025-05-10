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
  {
    id: "marital",
    cellEditProvider: (p) => {
      return (
        <select
          style={{ width: "100%", height: "100%", boxSizing: "border-box" }}
          value={p.value as string}
          onChange={(e) => p.setValue(e.target.value)}
        >
          <option>married</option>
          <option>divorced</option>
          <option>single</option>
        </select>
      );
    },
  },
];

export function App() {
  const ds = useClientDataSource({
    data: bankDataSmall,
  });

  const grid = useLyteNytePro({
    gridId: useId(),
    rowDataSource: ds,
    columns,

    cellEditPointerActivator: "single-click",
    columnBase: {
      cellEditPredicate: true,
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

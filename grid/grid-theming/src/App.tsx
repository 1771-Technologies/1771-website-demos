import {
  LyteNyteGrid,
  useLyteNytePro,
  useClientDataSource,
} from "@1771technologies/lytenyte-pro";
import "@1771technologies/lytenyte-pro/grid.css";
import { ColumnProReact } from "@1771technologies/lytenyte-pro/types";
import { bankDataSmall } from "@1771technologies/sample-data/bank-data-smaller";
import { useState } from "react";

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

    rowSelectionSelectedIds: new Set(["0-center", "1-center"]),
    cellSelections: [{ rowStart: 4, rowEnd: 7, columnStart: 2, columnEnd: 4 }],

    columnBase: {
      sortable: true,
      movable: true,
      resizable: true,
      uiHints: { sortButton: true },
    },
  });
  const [theme, setTheme] = useState("lng1771-teal");

  return (
    <div style={{ height: 700, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: 8, display: "flex", gap: 8 }}>
        <label>Select Theme</label>
        <select value={theme} onChange={(e) => setTheme(e.target.value)}>
          <option value="lng1771-teal">LyteNyte Teal</option>
          <option value="lng1771-term256">Term 256</option>
          <option value="dark">Dark</option>
          <option value="light">Light</option>
        </select>
      </div>
      <div style={{ flex: "1" }} className={theme}>
        <LyteNyteGrid grid={grid} />
      </div>
    </div>
  );
}

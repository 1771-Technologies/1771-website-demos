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
    rowSelectionCheckbox: "normal",
    rowSelectionMode: "multiple",
    rowSelectionPointerActivator: "single-click",
    rowSelectionMultiSelectOnClick: true,
  });

  const [events, setEvents] = useState(0);
  grid.useEvent("onRowSelectionSelected", () => {
    setEvents((prev) => prev + 1);
  });
  grid.useEvent("onRowSelectionDeselected", () => {
    setEvents((prev) => prev + 1);
  });

  return (
    <div style={{ height: 700, display: "flex", flexDirection: "column" }}>
      <div>Row selection events recorded: {events}</div>
      <div style={{ flex: "1" }}>
        <LyteNyteGrid grid={grid} />
      </div>
    </div>
  );
}

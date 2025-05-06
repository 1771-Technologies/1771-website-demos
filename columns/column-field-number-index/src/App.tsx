import {
  LyteNyteGrid,
  useLyteNytePro,
  useClientDataSource,
} from "@1771technologies/lytenyte-pro";
import "@1771technologies/lytenyte-pro/grid.css";
import { ColumnProReact } from "@1771technologies/lytenyte-pro/types";
import { stockData } from "@1771technologies/sample-data/stock-data-smaller";
import { useId } from "react";

const columns: ColumnProReact[] = [
  { field: 0, id: "ticker" },
  { field: 1, id: "full", widthFlex: 1 },
  { field: 2, id: "analyst-rating" },
  { field: 3, id: "price", type: "number" },
  { field: 4, id: "currency" },
];

export function App() {
  const ds = useClientDataSource({ data: stockData });

  const grid = useLyteNytePro({
    gridId: useId(),
    rowDataSource: ds,
    columns,
  });

  return (
    <div style={{ height: 500, display: "flex", flexDirection: "column" }}>
      <div style={{ flex: "1" }}>
        <LyteNyteGrid grid={grid} />
      </div>
    </div>
  );
}

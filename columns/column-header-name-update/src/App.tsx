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
  { headerName: "Years Alive", id: "age", type: "number" },
  { headerName: "Employment", id: "job" },
  { headerName: "Money In Bank", id: "balance", type: "number" },
  { headerName: "Smartness Level", id: "education" },
  { headerName: "Single Or Not?", id: "marital" },
];

export function App() {
  const ds = useClientDataSource({ data: bankDataSmall });

  const grid = useLyteNytePro({
    gridId: useId(),
    rowDataSource: ds,
    columns,

    columnBase: {
      widthFlex: 1,
    },
  });

  const c = grid.state.columns.use();

  return (
    <div style={{ height: 500, display: "flex", flexDirection: "column" }}>
      <div>
        <input
          aria-label="update-age"
          style={{ width: 150, boxSizing: "border-box" }}
          value={c[0].headerName ?? ""}
          onChange={(e) => {
            grid.api.columnUpdate(c[0], { headerName: e.target.value ?? "" });
          }}
        />
        <input
          aria-label="update-job"
          style={{ width: 150, boxSizing: "border-box" }}
          value={c[1].headerName ?? ""}
          onChange={(e) => {
            grid.api.columnUpdate(c[1], { headerName: e.target.value ?? "" });
          }}
        />
        <input
          aria-label="update-balance"
          style={{ width: 150, boxSizing: "border-box" }}
          value={c[2].headerName ?? ""}
          onChange={(e) => {
            grid.api.columnUpdate(c[2], { headerName: e.target.value ?? "" });
          }}
        />
        <input
          aria-label="update-education"
          style={{ width: 150, boxSizing: "border-box" }}
          value={c[3].headerName ?? ""}
          onChange={(e) => {
            grid.api.columnUpdate(c[3], { headerName: e.target.value ?? "" });
          }}
        />
        <input
          aria-label="update-marital"
          style={{ width: 150, boxSizing: "border-box" }}
          value={c[4].headerName ?? ""}
          onChange={(e) => {
            grid.api.columnUpdate(c[4], { headerName: e.target.value ?? "" });
          }}
        />
      </div>

      <div style={{ flex: "1" }}>
        <LyteNyteGrid grid={grid} />
      </div>
    </div>
  );
}

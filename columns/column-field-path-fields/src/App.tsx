import {
  LyteNyteGrid,
  useLyteNytePro,
  useClientDataSource,
} from "@1771technologies/lytenyte-pro";
import "@1771technologies/lytenyte-pro/grid.css";
import { ColumnProReact } from "@1771technologies/lytenyte-pro/types";
import { performance } from "@1771technologies/sample-data/performance";
import { useId } from "react";

const columns: ColumnProReact[] = [
  { id: "name" },
  { id: "q1", field: { kind: 1, path: "performance.q1" } },
  { id: "q2", field: { kind: 1, path: "performance.q2" } },
  { id: "q3", field: { kind: 1, path: "performance.q3" } },
  { id: "q4", field: { kind: 1, path: "performance.q4" } },
  { id: "q1 revenue", field: { kind: 1, path: "revenue[0]" } },
  { id: "q2 revenue", field: { kind: 1, path: "revenue[1]" } },
  { id: "q3 revenue", field: { kind: 1, path: "revenue[2]" } },
  { id: "q4 revenue", field: { kind: 1, path: "revenue[3]" } },
];

export function App() {
  const ds = useClientDataSource({ data: performance });

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

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
  const ds = useClientDataSource({ data: bankDataSmall });

  const grid = useLyteNytePro({
    gridId: useId(),
    rowDataSource: ds,
    columns,
    floatingRowEnabled: true,

    columnBase: {
      floatingCellRenderer: (p) => {
        return (
          <div
            style={{
              width: "100%",
              height: "100%",
              boxSizing: "border-box",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingInline: 8,
            }}
          >
            <button
              onClick={() =>
                p.api.columnUpdate(p.column, {
                  width: p.api.columnVisualWidth(p.column) - 10,
                })
              }
            >
              -
            </button>
            Width: {p.api.columnVisualWidth(p.column)}
            <button
              onClick={() =>
                p.api.columnUpdate(p.column, {
                  width: p.api.columnVisualWidth(p.column) + 10,
                })
              }
            >
              +
            </button>
          </div>
        );
      },
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

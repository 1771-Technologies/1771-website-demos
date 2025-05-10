import {
  LyteNyteGrid,
  useLyteNytePro,
  useClientDataSource,
} from "@1771technologies/lytenyte-pro";
import "@1771technologies/lytenyte-pro/grid.css";
import { ColumnProReact } from "@1771technologies/lytenyte-pro/types";
import { companiesWithPricePerf } from "@1771technologies/sample-data/companies-with-price-performance";
import { useId } from "react";
import { Sparklines, SparklinesLine } from "react-sparklines";

const columns: ColumnProReact[] = [
  { id: "Company" },
  { id: "Founded" },
  { id: "Employee Cnt" },
  {
    id: "1 Year Perf",
    cellRenderer: (p) => {
      const field = p.api.columnField(p.row, p.column) as number[];

      return (
        <div
          style={{
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
            padding: 4,
          }}
        >
          <Sparklines data={field}>
            <SparklinesLine color="blue" />
          </Sparklines>
        </div>
      );
    },
  },
  {
    id: "Price",
    cellRenderer: (p) => {
      const field = p.api.columnField(p.row, p.column) as string;

      return (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            paddingInline: 8,
            boxSizing: "border-box",
            fontFamily: "monospace",
          }}
        >
          ${field}
        </div>
      );
    },
  },
];

export function App() {
  const ds = useClientDataSource({
    data: companiesWithPricePerf,
  });

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

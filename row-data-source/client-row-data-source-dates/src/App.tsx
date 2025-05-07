import {
  LyteNyteGrid,
  useLyteNytePro,
  useClientDataSource,
} from "@1771technologies/lytenyte-pro";
import "@1771technologies/lytenyte-pro/grid.css";
import { ColumnProReact } from "@1771technologies/lytenyte-pro/types";
import { companiesWithPricePerf } from "@1771technologies/sample-data/companies-with-price-performance";
import { useId } from "react";

const columns: ColumnProReact[] = [
  { id: "Company" },
  { id: "Founded" },
  { id: "Employee Cnt" },
  { id: "Country" },
  { id: "Price" },
  {
    id: "YearEnd",
    headerName: "Year End",
    sortable: true,
    type: "date",
    uiHints: { sortButton: true },
  },
];

export function App() {
  const ds = useClientDataSource({
    data: companiesWithPricePerf,

    sortToDate: (c) => {
      if (!c) return new Date();

      return parseMonthDay(c as string);
    },
  });

  const grid = useLyteNytePro({
    gridId: useId(),
    rowDataSource: ds,
    columns,
  });

  return (
    <div style={{ height: 700, display: "flex", flexDirection: "column" }}>
      <div style={{ flex: "1" }}>
        <LyteNyteGrid grid={grid} />
      </div>
    </div>
  );
}

function parseMonthDay(
  dateString: string,
  year: number = new Date().getFullYear()
): Date {
  // Create a date from the string plus the current year
  const date = new Date(`${dateString}, ${year}`);
  console.log(date);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date string format");
  }

  return date;
}

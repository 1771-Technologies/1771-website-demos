import {
  LyteNyteGrid,
  useLyteNytePro,
  useClientDataSource,
} from "@1771technologies/lytenyte-pro";
import "@1771technologies/lytenyte-pro/grid.css";
import { ColumnProReact } from "@1771technologies/lytenyte-pro/types";
import { bankDataSmall } from "@1771technologies/sample-data/bank-data-smaller";
import { useId } from "react";

type MaritalType = "divorced" | "married" | "single";
const maritalIndex = {
  divorced: 2,
  married: 1,
  single: 0,
};

const columns: ColumnProReact[] = [
  { id: "education" },
  {
    id: "marital",
    sortComparator: (_, l, r) => {
      return maritalIndex[l as MaritalType] - maritalIndex[r as MaritalType];
    },
  },
  { id: "age", type: "number" },
  { id: "job" },
  { id: "balance", type: "number" },
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
  const ds = useClientDataSource({
    data: bankDataSmall,
  });

  const grid = useLyteNytePro({
    gridId: useId(),
    rowDataSource: ds,
    columns,

    sortModel: [{ columnId: "marital", isDescending: false }],
    columnBase: {
      uiHints: { sortButton: true },
      sortable: true,
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

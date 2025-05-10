import {
  useClientDataSource,
  useLyteNytePro,
} from "@1771technologies/lytenyte-pro";
import "@1771technologies/lytenyte-pro/grid.css";
import { ColumnProReact } from "@1771technologies/lytenyte-pro/types";
import { bankDataSmall } from "@1771technologies/sample-data/bank-data-smaller";
import { FilterManager } from "@1771technologies/lytenyte-pro/filters";

const columns: ColumnProReact[] = [
  { id: "age", type: "number", groupPath: ["Specifics"] },
  { id: "job", groupPath: ["Specifics"] },
  { id: "balance", type: "number" },
  { id: "education" },
  { id: "marital" },
  { id: "default", groupPath: ["Hosing"] },
  { id: "housing", groupPath: ["Hosing"] },
  { id: "loan", groupPath: ["Hosing"] },
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
    gridId: "x",
    columns,
    rowDataSource: ds,

    columnBase: {
      resizable: true,
      movable: true,
      sortable: true,
      rowGroupable: true,
      columnPivotable: true,
      measureFnsAllowed: ["avg", "count", "last", "first"],
      aggFnsAllowed: ["avg", "count", "last", "first"],
    },
  });

  return (
    <div
      style={{
        border: "1px solid black",
        padding: 8,
      }}
    >
      <FilterManager.Root grid={grid} column={columns[0]}>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <FilterManager.SimpleRoot>
            <FilterManager.SimpleOperator />
            <FilterManager.SimpleValue />
          </FilterManager.SimpleRoot>

          <FilterManager.SimpleSwitch />

          <FilterManager.SimpleRoot isAdditional>
            <FilterManager.SimpleOperator />
            <FilterManager.SimpleValue />
          </FilterManager.SimpleRoot>

          <FilterManager.InFilterRoot>
            <FilterManager.InFilterContainer>
              <FilterManager.InFilterViewport />
            </FilterManager.InFilterContainer>
          </FilterManager.InFilterRoot>

          <FilterManager.ApplyButton />
          <FilterManager.ClearButton />
        </div>
      </FilterManager.Root>
    </div>
  );
}

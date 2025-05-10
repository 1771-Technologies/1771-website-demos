import {
  useClientDataSource,
  useLyteNytePro,
} from "@1771technologies/lytenyte-pro";
import "@1771technologies/lytenyte-pro/grid.css";
import { ColumnProReact } from "@1771technologies/lytenyte-pro/types";
import { bankDataSmall } from "@1771technologies/sample-data/bank-data-smaller";
import { PillManager } from "@1771technologies/lytenyte-pro/pill-manager";

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
      <PillManager.Root grid={grid}>
        <PillManager.DragPlaceholder />
        <PillManager.Rows>
          <PillManager.Row pillSource="columns">
            <PillManager.RowLabelColumns />
            <PillManager.Pills>
              {({ pills }) => {
                return (
                  <>
                    {pills.map((c) => (
                      <PillManager.Pill key={c.label} item={c} menu="x" />
                    ))}
                  </>
                );
              }}
            </PillManager.Pills>
            <PillManager.Expander></PillManager.Expander>
          </PillManager.Row>
          <PillManager.Separator />

          <PillManager.Row pillSource="row-groups">
            <PillManager.RowLabelRowGroups />
            <PillManager.Pills>
              {({ pills }) => {
                return (
                  <>
                    {pills.map((c) => (
                      <PillManager.Pill key={c.label} item={c} />
                    ))}
                  </>
                );
              }}
            </PillManager.Pills>
            <PillManager.Expander />
          </PillManager.Row>
          <PillManager.Separator />

          <PillManager.Row pillSource="aggregations">
            <PillManager.RowLabelAggregations />
            <PillManager.Pills>
              {({ pills }) => {
                return (
                  <>
                    {pills.map((c) => (
                      <PillManager.Pill key={c.label} item={c} />
                    ))}
                  </>
                );
              }}
            </PillManager.Pills>
            <PillManager.Expander />
          </PillManager.Row>
          <PillManager.Separator />

          <PillManager.Row pillSource="measures">
            <PillManager.RowLabelMeasures />
            <PillManager.Pills>
              {({ pills }) => {
                return (
                  <>
                    {pills.map((c) => (
                      <PillManager.Pill key={c.label} item={c} />
                    ))}
                  </>
                );
              }}
            </PillManager.Pills>
            <PillManager.Expander />
          </PillManager.Row>
          <PillManager.Separator />

          <PillManager.Row pillSource="column-pivots">
            <PillManager.RowLabelColumnPivots />
            <PillManager.Pills>
              {({ pills }) => {
                return (
                  <>
                    {pills.map((c) => (
                      <PillManager.Pill key={c.label} item={c} />
                    ))}
                  </>
                );
              }}
            </PillManager.Pills>
            <PillManager.Expander />
          </PillManager.Row>
        </PillManager.Rows>
      </PillManager.Root>
    </div>
  );
}

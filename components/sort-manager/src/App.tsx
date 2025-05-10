import {
  useClientDataSource,
  useLyteNytePro,
} from "@1771technologies/lytenyte-pro";
import "@1771technologies/lytenyte-pro/grid.css";
import { ColumnProReact } from "@1771technologies/lytenyte-pro/types";
import { bankDataSmall } from "@1771technologies/sample-data/bank-data-smaller";
import { SortManager } from "@1771technologies/lytenyte-pro/sort-manager";

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
      <SortManager.Root grid={grid}>
        <SortManager.Container
          style={{
            paddingInline: 8,
            paddingTop: 20,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {({ items }) => {
            return (
              <>
                {items.map((c, i) => {
                  return (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        gap: "8px",
                        alignItems: "center",
                      }}
                    >
                      <SortManager.SortColumnSelect item={c} />
                      <SortManager.SortSelect item={c} />
                      <SortManager.SortDirectionSelect item={c} />
                      <SortManager.SortAdder item={c} />
                      <SortManager.SortRemove item={c} />
                    </div>
                  );
                })}
              </>
            );
          }}
        </SortManager.Container>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginTop: 8,
            paddingInline: 8,
          }}
        >
          <SortManager.SortApply></SortManager.SortApply>
          <SortManager.SortCancel></SortManager.SortCancel>
          <SortManager.SortClear></SortManager.SortClear>
        </div>
      </SortManager.Root>
    </div>
  );
}

import {
  useClientDataSource,
  useLyteNytePro,
} from "@1771technologies/lytenyte-pro";
import "@1771technologies/lytenyte-pro/grid.css";
import { ColumnManager } from "@1771technologies/lytenyte-pro/column-manager";
import { ColumnProReact } from "@1771technologies/lytenyte-pro/types";
import { bankDataSmall } from "@1771technologies/sample-data/bank-data-smaller";

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
        width: "400px",
        height: "1200px",
        border: "1px solid black",
        padding: 8,
      }}
    >
      <ColumnManager.Root
        grid={grid}
        style={{ display: "flex", flexDirection: "column", height: "100%" }}
      >
        <div
          style={{
            paddingInline: "8px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxSizing: "border-box",
          }}
        >
          <ColumnManager.Search style={{ flex: 1 }} />
          <ColumnManager.PivotModeToggle />
        </div>
        <ColumnManager.DragPlaceholder />
        <div style={{ height: 600 }}>
          <ColumnManager.Tree>
            {(c) => {
              return <ColumnManager.TreeItem columnItem={c} />;
            }}
          </ColumnManager.Tree>
        </div>

        <div style={{ overflow: "auto", flex: 1, width: "100%" }}>
          {(
            ["row-groups", "aggregations", "column-pivots", "measures"] as const
          ).map((c) => {
            return (
              <>
                <ColumnManager.Separator dir="horizontal" />
                <ColumnManager.DragBox
                  source={c}
                  key={c}
                  style={{ paddingBlock: 8 }}
                >
                  <ColumnManager.DragBoxControls>
                    <ColumnManager.DragBoxLabel>
                      {c === "row-groups"
                        ? "Row Groups"
                        : c === "aggregations"
                        ? "Aggregations"
                        : c === "column-pivots"
                        ? "Column Pivots"
                        : "Measures"}
                    </ColumnManager.DragBoxLabel>
                    <ColumnManager.DragBoxExpander />
                  </ColumnManager.DragBoxControls>
                  <ColumnManager.DropZoneVisibility
                    style={{ paddingInline: 8, paddingBottom: 16 }}
                  >
                    <ColumnManager.DropZone style={{ marginTop: "8px" }}>
                      {({ pills }) => {
                        return (
                          <>
                            {pills.map((c) => (
                              <ColumnManager.Pill item={c} key={c.label} />
                            ))}
                          </>
                        );
                      }}
                    </ColumnManager.DropZone>
                  </ColumnManager.DropZoneVisibility>
                </ColumnManager.DragBox>
              </>
            );
          })}
        </div>
      </ColumnManager.Root>
    </div>
  );
}

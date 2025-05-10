import {
  LyteNyteGrid,
  useClientDataSource,
  useLyteNytePro,
} from "@1771technologies/lytenyte-pro";
import "@1771technologies/lytenyte-pro/grid.css";
import { ColumnProReact } from "@1771technologies/lytenyte-pro/types";
import { Menu } from "@1771technologies/lytenyte-pro/menu";
import { bankDataSmall } from "@1771technologies/sample-data/bank-data-smaller";
import { useId } from "react";

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
    gridId: useId(),
    columns: columns,
    rowDataSource: ds,

    menuFrames: {
      alpha: {
        component: () => {
          return (
            <Menu.Positioner>
              <Menu.Container>
                <Menu.Item>Label 1</Menu.Item>
                <Menu.Item>Label 2</Menu.Item>
                <Menu.Item>Label 3</Menu.Item>
                <Menu.Separator />
                <Menu.Item>Label 4</Menu.Item>
                <Menu.Item>Label 5</Menu.Item>
                <Menu.Item disabled>Label 6</Menu.Item>
                <Menu.Group>
                  <Menu.GroupLabel>Export</Menu.GroupLabel>
                  <Menu.Item>CSX Export</Menu.Item>
                  <Menu.Item>Excel Export</Menu.Item>
                  <Menu.Item>PDF Export</Menu.Item>
                </Menu.Group>
                <Menu.Separator />

                <Menu.Checkbox>
                  <span>Minify</span>
                  <Menu.CheckboxIndicator />
                </Menu.Checkbox>
                <Menu.Checkbox>
                  <span>Expand</span>
                  <Menu.CheckboxIndicator />
                </Menu.Checkbox>

                <Menu.RadioGroup>
                  <Menu.Radio value="alpha">
                    <span>Alpha</span>
                    <Menu.RadioIndicator />
                  </Menu.Radio>
                  <Menu.Radio value="beta">
                    <span>Beta</span>
                    <Menu.RadioIndicator />
                  </Menu.Radio>
                  <Menu.Radio value="theta">
                    <span>Theta</span>
                    <Menu.RadioIndicator />
                  </Menu.Radio>
                </Menu.RadioGroup>
              </Menu.Container>
            </Menu.Positioner>
          );
        },
      },
    },

    columnBase: {
      resizable: true,
      movable: true,
      sortable: true,

      uiHints: {
        sortButton: true,
        columnMenu: true,
      },
    },
  });

  return (
    <div style={{ height: 500, display: "flex", flexDirection: "column" }}>
      <div>
        <button
          onClick={(ev) => grid.api.menuFrameOpen("alpha", ev.currentTarget)}
        >
          Click Me To Open Menu Frame
        </button>
      </div>
      <div style={{ flex: "1" }}>
        <LyteNyteGrid grid={grid} />
      </div>
    </div>
  );
}

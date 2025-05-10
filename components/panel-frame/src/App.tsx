import {
  LyteNyteGrid,
  useClientDataSource,
  useLyteNytePro,
} from "@1771technologies/lytenyte-pro";
import "@1771technologies/lytenyte-pro/grid.css";
import { ColumnProReact } from "@1771technologies/lytenyte-pro/types";
import { bankDataSmall } from "@1771technologies/sample-data/bank-data-smaller";
import { useEffect, useId } from "react";

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

    panelFrames: {
      myFrame: {
        title: "My Custom Frame",
        component: () => (
          <div>
            My custom frame content is rendered here. I can put anything I like.
            React components are fun.
          </div>
        ),
      },
    },
    panelFrameButtons: [{ id: "myFrame", label: "My Frame" }],

    columnBase: {
      resizable: true,
      movable: true,
      sortable: true,
    },
  });

  useEffect(() => {
    setTimeout(() => {
      grid.api.panelFrameOpen("myFrame");
    }, 0);
  }, [grid.api]);

  return (
    <div style={{ height: 500, display: "flex", flexDirection: "column" }}>
      <div style={{ flex: "1" }}>
        <LyteNyteGrid grid={grid} />
      </div>
    </div>
  );
}

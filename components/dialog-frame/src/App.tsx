import {
  LyteNyteGrid,
  useClientDataSource,
  useLyteNytePro,
} from "@1771technologies/lytenyte-pro";
import "@1771technologies/lytenyte-pro/grid.css";
import { ColumnProReact } from "@1771technologies/lytenyte-pro/types";
import { bankDataSmall } from "@1771technologies/sample-data/bank-data-smaller";
import { useId } from "react";
import { Dialog } from "@1771technologies/lytenyte-pro/dialog";

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

    dialogFrames: {
      dialog: {
        component: () => (
          <Dialog.Container>
            <Dialog.Description>
              This is my dialog content that would be rendered. LyteNyte Grid
              lets me renderer anything I want in an accessible dialog
            </Dialog.Description>
          </Dialog.Container>
        ),
      },
    },

    columnBase: {
      resizable: true,
      movable: true,
      sortable: true,
    },
  });

  return (
    <div style={{ height: 500, display: "flex", flexDirection: "column" }}>
      <div>
        <button
          onClick={() => {
            grid.api.dialogFrameOpen("dialog");
          }}
        >
          Open Dialog
        </button>
      </div>
      <div style={{ flex: "1" }}>
        <LyteNyteGrid grid={grid} />
      </div>
    </div>
  );
}

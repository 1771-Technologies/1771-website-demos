import {
  LyteNyteGrid,
  useLyteNytePro,
  useTreeDataSource,
} from "@1771technologies/lytenyte-pro";
import "@1771technologies/lytenyte-pro/grid.css";
import { ColumnProReact } from "@1771technologies/lytenyte-pro/types";
import { fileData } from "@1771technologies/sample-data/file-data";
import { useId } from "react";

const columns: ColumnProReact[] = [
  { id: "path" },
  { id: "size" },
  { id: "lastModified" },
  { id: "type" },
  { id: "owner" },
  { id: "permissions" },
  { id: "isHidden" },
];

export function App() {
  const ds = useTreeDataSource({
    data: fileData,
    getDataForGroup: () => {
      return {};
    },
    pathFromData: (d) => d.path.split("/").filter((c) => !!c),
    distinctNonAdjacentPaths: true,
    pathSeparator: "/",
  });

  const grid = useLyteNytePro({
    gridId: useId(),
    rowDataSource: ds,
    columns,
    treeData: true,
  });

  return (
    <div style={{ height: 500, display: "flex", flexDirection: "column" }}>
      <div style={{ flex: "1" }}>
        <LyteNyteGrid grid={grid} />
      </div>
    </div>
  );
}

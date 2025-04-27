import {
  LyteNyteGrid,
  useLyteNytePro,
  useClientDataSource,
} from "@1771technologies/lytenyte-pro";
import "@1771technologies/lytenyte-pro/grid.css";
import { bankDataSmall } from "@1771technologies/sample-data/bank-data-smaller";

const columns = [
  { id: "age" },
  { id: "job" },
  { id: "marital" },
  { id: "education" },
  { id: "balance" },
];

export function App() {
  const ds = useClientDataSource({ data: bankDataSmall });

  const grid = useLyteNytePro({
    gridId: "my-grid",
    rowDataSource: ds,
    columns,
    columnBase: {
      sortable: true,
      movable: true,
      resizable: true,
      uiHints: { sortButton: true },
    },
  });

  return (
    <div style={{ height: 500 }}>
      <LyteNyteGrid grid={grid} />
    </div>
  );
}

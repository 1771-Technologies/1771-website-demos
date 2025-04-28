import {
  LyteNyteGrid,
  useLyteNytePro,
  useClientDataSource,
} from "@1771technologies/lytenyte-pro";
import "@1771technologies/lytenyte-pro/grid.css";
import {
  ColumnProReact,
  GridProReact,
} from "@1771technologies/lytenyte-pro/types";
import { companiesWithPricePerf } from "@1771technologies/sample-data/companies-with-price-performance";
import { useMemo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

type RowData = (typeof companiesWithPricePerf)[number];

const columns: ColumnProReact[] = [
  { id: "Company" },
  { id: "Founded" },
  { id: "Employee Cnt" },
  { id: "Country" },
  { id: "Price" },
];

export function App() {
  const ds = useClientDataSource({ data: companiesWithPricePerf });

  const grid = useLyteNytePro({
    gridId: "my-grid",
    rowDataSource: ds,
    columns,

    rowSelectionSelectedIds: new Set(["0-center"]),

    rowSelectionCheckbox: "normal",
    rowSelectionMode: "multiple",
    rowSelectionMultiSelectOnClick: true,
    rowSelectionPointerActivator: "single-click",
  });

  return (
    <div style={{ height: 800, display: "flex", flexDirection: "column" }}>
      <div style={{ flex: "1" }}>
        <LyteNyteGrid grid={grid} />
      </div>
      <div style={{ padding: "10px 0px", borderTop: "1px solid gray" }}>
        {" "}
        <PriceChart grid={grid} />
      </div>
    </div>
  );
}

function PriceChart({ grid }: { grid: GridProReact<RowData> }) {
  const state = grid.state;
  const selected = state.rowSelectionSelectedIds.use();

  const rows = useMemo(() => {
    return [...selected.values()]
      .map((rowId) => grid.api.rowById(rowId))
      .filter((row) => !!row)
      .sort((l, r) => l.id.localeCompare(r.id));
  }, [grid.api, selected]);

  const data = useMemo(() => {
    const weeks: Record<string, { week: number; [key: string]: number }> =
      Object.fromEntries(
        Array.from({ length: 52 }, (_, i) => [i + 1, { week: i + 1 }])
      );

    rows.forEach((row) => {
      if (!row || !grid.api.rowIsLeaf(row)) return;

      const data = row.data["1 Year Perf"];

      data.forEach((dp, i) => {
        weeks[i + 1][row.id] = dp;
      });
    });

    return Object.values(weeks).sort((l, r) => l.week - r.week);
  }, [grid.api, rows]);

  return (
    <ResponsiveContainer height={300} width="100%">
      <AreaChart data={data}>
        <defs>
          {rows.map((row, i) => {
            const color = colors[i];

            return (
              <linearGradient id={row.id} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color.stop5} stopOpacity={0.8} />
                <stop offset="95%" stopColor={color.stop95} stopOpacity={0} />
              </linearGradient>
            );
          })}
        </defs>
        <XAxis dataKey="week" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        {rows.map((row, i) => {
          const color = colors[i];

          return (
            <Area
              type="monotone"
              dataKey={row.id}
              stroke={color.solid}
              fillOpacity={1}
              fill={`url(#${row.id})`}
            />
          );
        })}
      </AreaChart>
    </ResponsiveContainer>
  );
}
const colors = [
  { name: "Ruby Red", solid: "#E02D3F", stop5: "#FBE6E8", stop95: "#E33E4F" },
  { name: "Coral", solid: "#FF7F50", stop5: "#FFEFE9", stop95: "#FF8C61" },
  { name: "Amber", solid: "#FFBF00", stop5: "#FFF7E0", stop95: "#FFC519" },
  {
    name: "Golden Yellow",
    solid: "#FFD700",
    stop5: "#FFFAE0",
    stop95: "#FFDB19",
  },
  { name: "Lime Green", solid: "#32CD32", stop5: "#E7F9E7", stop95: "#47D247" },
  { name: "Emerald", solid: "#50C878", stop5: "#EAF8EF", stop95: "#62CE86" },
  { name: "Teal", solid: "#008080", stop5: "#E0F0F0", stop95: "#199999" },
  { name: "Sky Blue", solid: "#87CEEB", stop5: "#F1F9FD", stop95: "#93D4ED" },
  { name: "Royal Blue", solid: "#4169E1", stop5: "#E8EDFC", stop95: "#5479E4" },
  { name: "Indigo", solid: "#4B0082", stop5: "#E9E0F0", stop95: "#5C1993" },
  { name: "Purple", solid: "#800080", stop5: "#F0E0F0", stop95: "#911991" },
  { name: "Magenta", solid: "#FF00FF", stop5: "#FFE0FF", stop95: "#FF19FF" },
  { name: "Hot Pink", solid: "#FF69B4", stop5: "#FFEDF6", stop95: "#FF78BB" },
  { name: "Chocolate", solid: "#D2691E", stop5: "#F9EEE4", stop95: "#D77935" },
  { name: "Sienna", solid: "#A0522D", stop5: "#F3EAE6", stop95: "#AC6542" },
  { name: "Olive", solid: "#808000", stop5: "#F0F0E0", stop95: "#919119" },
  {
    name: "Forest Green",
    solid: "#228B22",
    stop5: "#E5F1E5",
    stop95: "#399939",
  },
  { name: "Navy Blue", solid: "#000080", stop5: "#E0E0F0", stop95: "#191999" },
  { name: "Slate Gray", solid: "#708090", stop5: "#EEF0F2", stop95: "#7F8C9A" },
  { name: "Charcoal", solid: "#36454F", stop5: "#E7E9EA", stop95: "#4B5962" },
  { name: "Crimson", solid: "#DC143C", stop5: "#FAE3E7", stop95: "#E02A4F" },
  { name: "Turquoise", solid: "#40E0D0", stop5: "#E8FBF9", stop95: "#53E3D4" },
  { name: "Violet", solid: "#8A2BE2", stop5: "#F1E6FB", stop95: "#9641E5" },
  { name: "Salmon", solid: "#FA8072", stop5: "#FEEFED", stop95: "#FB8D80" },
  { name: "Tan", solid: "#D2B48C", stop5: "#F9F6F1", stop95: "#D7BD98" },
  { name: "Maroon", solid: "#800000", stop5: "#F0E0E0", stop95: "#991919" },
  { name: "Aquamarine", solid: "#7FFFD4", stop5: "#EFFFF9", stop95: "#8CFFD8" },
  { name: "Steel Blue", solid: "#4682B4", stop5: "#E9EFF6", stop95: "#588FBB" },
  { name: "Khaki", solid: "#C3B091", stop5: "#F7F5F1", stop95: "#C9B99D" },
  { name: "Plum", solid: "#8E4585", stop5: "#F1E9F0", stop95: "#9B5892" },

  { name: "Navy Blue", solid: "#000080", stop5: "#E0E0F0", stop95: "#191999" },
  { name: "Slate Gray", solid: "#708090", stop5: "#EEF0F2", stop95: "#7F8C9A" },
  { name: "Charcoal", solid: "#36454F", stop5: "#E7E9EA", stop95: "#4B5962" },
  { name: "Crimson", solid: "#DC143C", stop5: "#FAE3E7", stop95: "#E02A4F" },
  { name: "Turquoise", solid: "#40E0D0", stop5: "#E8FBF9", stop95: "#53E3D4" },
  { name: "Violet", solid: "#8A2BE2", stop5: "#F1E6FB", stop95: "#9641E5" },
  { name: "Salmon", solid: "#FA8072", stop5: "#FEEFED", stop95: "#FB8D80" },
  { name: "Tan", solid: "#D2B48C", stop5: "#F9F6F1", stop95: "#D7BD98" },
  { name: "Maroon", solid: "#800000", stop5: "#F0E0E0", stop95: "#991919" },
  { name: "Aquamarine", solid: "#7FFFD4", stop5: "#EFFFF9", stop95: "#8CFFD8" },
  { name: "Steel Blue", solid: "#4682B4", stop5: "#E9EFF6", stop95: "#588FBB" },
  { name: "Khaki", solid: "#C3B091", stop5: "#F7F5F1", stop95: "#C9B99D" },
  { name: "Plum", solid: "#8E4585", stop5: "#F1E9F0", stop95: "#9B5892" },
];

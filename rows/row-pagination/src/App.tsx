import {
  LyteNyteGrid,
  useLyteNytePro,
  useClientDataSource,
} from "@1771technologies/lytenyte-pro";
import { Pagination } from "@ark-ui/react/pagination";
import "@1771technologies/lytenyte-pro/grid.css";
import { ColumnProReact } from "@1771technologies/lytenyte-pro/types";
import { bankDataSmall } from "@1771technologies/sample-data/bank-data-smaller";
import { useId } from "react";

const columns: ColumnProReact[] = [
  { id: "age", type: "number" },
  { id: "job" },
  { id: "balance", type: "number" },
  { id: "education" },
  { id: "marital" },
  { id: "default" },
  { id: "housing" },
  { id: "loan" },
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
    rowDataSource: ds,
    columns,

    paginate: true,
    paginatePageSize: 20,
  });

  return (
    <div>
      <div style={{ height: 500, display: "flex", flexDirection: "column" }}>
        <div style={{ flex: "1" }}>
          <LyteNyteGrid grid={grid} />
        </div>
      </div>
      <div>
        <Pagination.Root
          style={{ display: "flex", gap: "2px" }}
          count={bankDataSmall.length}
          pageSize={20}
          siblingCount={2}
          page={grid.state.paginateCurrentPage.use() + 1}
          onPageChange={(d) => {
            grid.state.paginateCurrentPage.set(d.page - 1);
          }}
        >
          <Pagination.PrevTrigger>Previous Page</Pagination.PrevTrigger>
          <Pagination.Context>
            {(pagination) =>
              pagination.pages.map((page, index) =>
                page.type === "page" ? (
                  <Pagination.Item key={index} {...page}>
                    {page.value}
                  </Pagination.Item>
                ) : (
                  <Pagination.Ellipsis key={index} index={index}>
                    &#8230;
                  </Pagination.Ellipsis>
                )
              )
            }
          </Pagination.Context>
          <Pagination.NextTrigger>Next Page</Pagination.NextTrigger>
        </Pagination.Root>
      </div>
    </div>
  );
}

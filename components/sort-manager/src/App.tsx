"use client";

import { SortManager as SM } from "@1771technologies/lytenyte-pro";
import { useClientRowDataSource, Grid } from "@1771technologies/lytenyte-pro";
import "@1771technologies/lytenyte-pro/grid.css";
import {
  AddSmallIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  CloseIcon,
} from "@1771technologies/lytenyte-pro/icons";
import type {
  Column,
  HeaderCellRendererParams,
} from "@1771technologies/lytenyte-pro/types";
import { bankDataSmall } from "@1771technologies/sample-data/bank-data-smaller";
import { useId } from "react";

type BankData = (typeof bankDataSmall)[number];

const columns: Column<BankData>[] = [
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

export default function SortManager() {
  const ds = useClientRowDataSource({ data: bankDataSmall });

  const grid = Grid.useLyteNyte({
    gridId: useId(),
    rowDataSource: ds,
    columns,

    columnBase: {
      headerRenderer: Header,
      uiHints: {
        sortable: true,
      },
    },
  });

  const view = grid.view.useValue();
  const { rootProps, rows } = SM.useSortManager({ grid });

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className="px-4 py-1">
        <SM.Root {...rootProps}>
          <SM.Rows className="py-2 flex flex-col md:grid md:grid-cols-[auto_auto_auto_auto] gap-4 max-h-[60vh">
            {rows.map((c) => {
              if (c.isCustom) return null;

              return (
                <SM.Row
                  row={c}
                  key={c.index}
                  className="flex flex-col md:grid md:grid-cols-subgrid md:col-span-full  gap-2 items-center"
                >
                  <div className="w-full">
                    <SM.ColumnSelect className="w-full bg-ln-gray-05 border border-ln-gray-30 rounded text-sm text-ln-gray-70 py-1" />
                  </div>

                  <div className="w-full">
                    <SM.ValueSelect className="w-full bg-ln-gray-05 border border-ln-gray-30 rounded text-sm text-ln-gray-70 py-1" />
                  </div>

                  <div className="hidden md:block">
                    <SM.DirectionSelect className="w-full bg-ln-gray-05 border border-ln-gray-30 rounded text-sm text-ln-gray-70 py-1" />
                  </div>

                  <div className="flex md:hidden w-full">
                    <div className="flex-1">
                      <SM.DirectionSelect className="w-full bg-ln-gray-05 border border-ln-gray-30 rounded text-sm text-ln-gray-70 py-1" />
                    </div>
                    <div className="flex items-center flex-1 justify-end">
                      <SM.Add
                        className="hover:bg-ln-gray-30  rounded"
                        as={<AddSmallIcon />}
                      />
                      <SM.Remove
                        className="hover:bg-ln-gray-30  rounded"
                        as={<CloseIcon />}
                      />
                    </div>
                  </div>

                  <div className="hidden w-full justify-end md:flex items-center gap-1">
                    <SM.Add
                      className="hover:bg-ln-gray-30  rounded"
                      as={<AddSmallIcon />}
                    />
                    <SM.Remove
                      className="hover:bg-ln-gray-30  rounded"
                      as={<CloseIcon />}
                    />
                  </div>
                </SM.Row>
              );
            })}
          </SM.Rows>

          <div className="flex items-center pb-2 gap-2">
            <div className="flex-1">
              <SM.Clear
                className="text-sm border border-red-500 bg-red-500/50 px-2 text-white hover:bg-red-500/70"
                onClick={() => grid.api.dialogFrameClose()}
              >
                Clear
              </SM.Clear>
            </div>
            <SM.Cancel
              className="text-sm hover:text-[var(--lng1771-gray-90)]"
              onClick={() => grid.api.dialogFrameClose()}
            >
              Cancel
            </SM.Cancel>
            <SM.Apply
              className="text-sm  border border-[var(--lng1771-gray-30)] bg-brandButton text-black hover:bg-brandButton/80 border-solid px-2"
              onClick={() => grid.api.dialogFrameClose()}
            >
              Apply
            </SM.Apply>
          </div>
        </SM.Root>
      </div>

      <div className="flex gap-2 py-2"></div>
      <div className="lng-grid" style={{ height: 500 }}>
        <Grid.Root grid={grid}>
          <Grid.Viewport>
            <Grid.Header>
              {view.header.layout.map((row, i) => {
                return (
                  <Grid.HeaderRow key={i} headerRowIndex={i}>
                    {row.map((c) => {
                      if (c.kind === "group") return null;

                      return (
                        <Grid.HeaderCell
                          key={c.id}
                          cell={c}
                          className="flex w-full h-full capitalize px-2 items-center"
                        />
                      );
                    })}
                  </Grid.HeaderRow>
                );
              })}
            </Grid.Header>
            <Grid.RowsContainer>
              <Grid.RowsCenter>
                {view.rows.center.map((row) => {
                  if (row.kind === "full-width") return null;

                  return (
                    <Grid.Row row={row} key={row.id}>
                      {row.cells.map((c) => {
                        return (
                          <Grid.Cell
                            key={c.id}
                            cell={c}
                            className="text-sm flex items-center px-2 h-full w-full"
                          />
                        );
                      })}
                    </Grid.Row>
                  );
                })}
              </Grid.RowsCenter>
            </Grid.RowsContainer>
          </Grid.Viewport>
        </Grid.Root>
      </div>
    </div>
  );
}

function Header({ column, grid }: HeaderCellRendererParams<BankData>) {
  const sortModel = grid.state.sortModel.useValue();

  const sortIndex = sortModel.findIndex((c) => c.columnId === column.id);

  const sort = sortIndex === -1 ? null : sortModel[sortIndex];

  const isDescending = sort?.isDescending ?? false;

  return (
    <div className="flex items-center px-2 w-full h-full text-sm">
      {column.name ?? column.id}

      {sort && (
        <div className="relative">
          {!isDescending ? (
            <ArrowUpIcon className="size-4" />
          ) : (
            <ArrowDownIcon className="size-4" />
          )}
          {sortIndex >= 0 && sortModel.length > 1 && (
            <div className="absolute top-[-2px] right-[-2px] text-xs text-ln-primary-5">
              {sortIndex + 1}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

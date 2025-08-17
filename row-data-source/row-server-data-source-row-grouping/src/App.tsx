"use client";

import { bankDataSmall as bankData } from "@1771technologies/sample-data/bank-data-smaller";
import { Grid, useServerDataSource } from "@1771technologies/lytenyte-pro";
import "@1771technologies/lytenyte-pro/grid.css";
import type {
  Column,
  DataRequest,
  DataRequestModel,
  DataResponse,
  DataResponseBranchItem,
  DataResponseLeafItem,
  DataResponsePinned,
} from "@1771technologies/lytenyte-pro/types";
import type { bankDataSmall } from "@1771technologies/sample-data/bank-data-smaller";
import { useId } from "react";
import sql from "alasql";
import {
  ChevronDownIcon,
  ChevronRightIcon,
} from "@1771technologies/lytenyte-pro/icons";

type BankData = (typeof bankDataSmall)[number];

const columns: Column<BankData>[] = [
  { id: "age", type: "number" },
  { id: "job", hide: true },
  { id: "balance", type: "number" },
  { id: "education" },
  { id: "marital" },
  { id: "default" },
  { id: "housing" },
];

export default function App() {
  const ds = useServerDataSource<BankData>({
    dataFetcher: async (p) => {
      const res = await handleRequest(p.requests, p.model);
      return res;
    },
  });

  const grid = Grid.useLyteNyte({
    gridId: useId(),
    rowDataSource: ds,
    rowGroupModel: ["job", "education"],
    columns,

    rowGroupColumn: {
      cellRenderer: ({ grid, row, column }) => {
        if (!grid.api.rowIsGroup(row)) return null;

        const field = grid.api.columnField(column, row);
        const isExpanded = grid.api.rowGroupIsExpanded(row);
        console.log(row.loading);

        return (
          <div
            className="flex items-center gap-2 w-full h-full"
            style={{ paddingLeft: row.depth * 16 }}
          >
            <button
              className="flex items-center justify-center"
              disabled={row.loading}
              onClick={(e) => {
                e.stopPropagation();
                grid.api.rowGroupToggle(row);
              }}
            >
              {row.loading && <Spinner />}
              {!row.loading && !isExpanded && <ChevronRightIcon />}
              {!row.loading && isExpanded && <ChevronDownIcon />}
            </button>

            <div>{`${field}`}</div>
          </div>
        );
      },
    },
  });

  const view = grid.view.useValue();

  return (
    <div className="lng-grid" style={{ height: 500 }}>
      <Grid.Root grid={grid}>
        <Grid.Viewport suppressHydrationWarning>
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
  );
}

// Create our server db. This is for illustration purposes only

sql(`
CREATE TABLE IF NOT EXISTS banks
 (
    age number,
    job string,
    balance number,
    education string,
    marital string,
    _default string,
    housing string,
    loan string,
    contact string,
    day number,
    month string,
    duration number,
    campaign number,
    pdays number,
    previous number,
    poutcome string,
    y string
 )
`);

sql.tables.banks.data = bankData;

export async function handleRequest(
  request: DataRequest[],
  model: DataRequestModel<any>
): Promise<(DataResponsePinned | DataResponse)[]> {
  await new Promise((res) => setTimeout(res, 500));
  const responses = request.map<DataResponse>((c) => {
    // This is a root request
    const limit = c.end - c.start;

    const hasWhere = model.quickSearch || model.filters.length;

    const groupKey = model.group[c.path.length];
    if (groupKey) {
      const data = sql<{ childCnt: number; pathKey: string }[]>(
        `SELECT *, ${groupKey} AS pathKey, count(*) AS childCnt 
        FROM banks GROUP BY ${groupKey} LIMIT ${limit} OFFSET ${c.start}`
      );
      const cnt = sql<{ cnt: number }[]>(
        `SELECT count(*) AS cnt FROM banks GROUP BY ${groupKey}`
      ).length;

      return {
        asOfTime: Date.now(),
        data: data.map<DataResponseBranchItem>((row, i) => {
          return {
            kind: "branch",
            childCount: row.childCnt,
            data: row,
            id: `${c.path.join("/")}__${i + c.start}`,
            key: row.pathKey,
          };
        }),
        start: c.start,
        end: c.end,
        kind: "center",
        path: c.path,
        size: cnt,
      };
    }

    const data = sql<any[]>(`
        WITH
          flat AS (
            SELECT
              *
            FROM
              banks
            ${hasWhere ? "WHERE" : ""}
            ${getQuickSearchFilter(model.quickSearch)}
            ${model.quickSearch && model.filters.length ? "AND" : ""}
            ${getOrderByClauseForSorts(model.sorts)}
            LIMIT ${limit} OFFSET ${c.start}
          )
          SELECT * FROM flat
      `);

    const count = sql<{ cnt: number }[]>(`
        WITH
          flat AS (
            SELECT
              *
            FROM
              banks
            ${hasWhere ? "WHERE" : ""}
            ${getQuickSearchFilter(model.quickSearch)}
            ${model.quickSearch && model.filters.length ? "AND" : ""}
            ${getOrderByClauseForSorts(model.sorts)}
          )
      SELECT count(*) as cnt FROM flat
    `)[0].cnt;

    return {
      asOfTime: Date.now(),
      data: data.map<DataResponseLeafItem>((row, i) => {
        return {
          data: row,
          id: `${c.path.join("-->")}${i + c.start}`,
          kind: "leaf",
        };
      }),
      start: c.start,
      end: c.end,
      kind: "center",
      path: c.path,
      size: count,
    };
  });

  return [
    ...responses,
    {
      kind: "top",
      asOfTime: Date.now(),
      data: [
        { kind: "leaf", data: {}, id: "t-1" },
        { kind: "leaf", data: {}, id: "t-2" },
      ],
    },
    {
      kind: "bottom",
      asOfTime: Date.now(),
      data: [
        { kind: "leaf", data: {}, id: "b-1" },
        { kind: "leaf", data: {}, id: "b-2" },
      ],
    },
  ];
}

function getOrderByClauseForSorts(sorts: DataRequestModel<any>["sorts"]) {
  if (sorts.length === 0) return "";

  const orderByStrings = sorts.map(
    (c) => `${c.columnId} ${c.isDescending ? "DESC" : "ASC"}`
  );

  return `
  ORDER BY
    ${orderByStrings.join(",\n")}
  `;
}

function getQuickSearchFilter(
  quickSearch: DataRequestModel<any>["quickSearch"]
) {
  if (!quickSearch) return "";

  const qs = `'%${quickSearch}%'`;

  return `
   (job LIKE ${qs}
    OR education LIKE ${qs}
    OR marital LIKE ${qs})
  `;
}
import React from "react";

function Spinner({
  size = 16,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
  label = "Loading…",
}) {
  const radius = 10; // SVG units
  const circumference = 2 * Math.PI * radius;

  return (
    <span
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={`inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size, lineHeight: 0 }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="spinner"
        aria-hidden="true"
        focusable="false"
      >
        {/* Track */}
        <circle
          cx="12"
          cy="12"
          r={radius}
          fill="none"
          stroke={color}
          opacity="0.2"
          strokeWidth={strokeWidth}
        />
        {/* Arc that spins */}
        <circle
          cx="12"
          cy="12"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${circumference * 0.25} ${circumference}`}
          className="spinner__arc"
        />
      </svg>
      <span className="sr-only">{label}</span>

      {/* Styles scoped to this component render */}
      <style>{`
        @keyframes spinner-rotate { to { transform: rotate(360deg); } }
        .spinner { display: block; }
        .spinner__arc { transform-origin: 12px 12px; animation: spinner-rotate 0.75s linear infinite; }
        /* Visually hidden but accessible text */
        .sr-only {
          position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
          overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
        }
      `}</style>
    </span>
  );
}

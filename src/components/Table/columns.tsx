"use client";

import { ColumnDef } from "@tanstack/react-table";

import { formatNumberWithComma, roundOff } from "@utils/formatNumberWithComma";
import { Point } from "@utils/types/points";

import { DataTableColumnHeader } from "./data-table-column-header";

export const columns: ColumnDef<Point>[] = [
  {
    accessorKey: "language_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Language" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium text-black">
            {row.getValue("language_name")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "country",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Country" />
    ),
    cell: ({ row }) => (
      <div className="w-24 text-black">{row.getValue("country")}</div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "region",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Region" />
    ),
    cell: ({ row }) => (
      <div className="w-44 text-black">{row.getValue("region")}</div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "first_language_pop",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Population" />
    ),
    cell: ({ row }) => (
      <div className="w-20 text-black">
        {formatNumberWithComma(row.getValue("first_language_pop"))}
      </div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "sorted_confidence_score",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Overlaps" />
    ),
    cell: ({ row }) => {
      const confidenceScores = JSON.parse(
        row.getValue("sorted_confidence_score") as string
      );

      const formattedScores = confidenceScores?.map(
        (item: { [language: string]: { level: number; Score: number } }) => {
          const languages = Object.keys(item);
          const scores = languages
            .map((language) => {
              const score = roundOff(item[language].Score);
              return `${language} [${score}]`;
            })
            .join("; ");
          return scores;
        }
      );

      return (
        <div className="w-72 text-black">
          {formattedScores ? (
            <span>{formattedScores}</span>
          ) : (
            <span>No Overlaps</span>
          )}
        </div>
      );
    },
    enableSorting: true,
    enableHiding: false,
  },
];

"use client";
import { useEffect, useState } from "react";

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { MixerHorizontalIcon, DownloadIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { CSVLink } from "react-csv";

import { Button } from "@components/ShadcnUi/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@components/ShadcnUi/dropdown-menu";
import { useDownloadData } from "@hooks/useDownloadData";
import { Point } from "@utils/types/points";
interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
  data: Point[];
}

const minorLanguagesheaders = [
  { label: "Country", key: "country" },
  { label: "ID", key: "id" },
  { label: "Language Code", key: "language_code" },
  { label: "Language Name", key: "language_name" },
  { label: "Region", key: "region" },
  { label: "Language Population", key: "first_language_pop" },
  { label: "Overlaps", key: "sorted_confidence_score" },
];

const majorLanguagesHeaders = [
  { label: "ID", key: "id" },
  { label: "Language Name", key: "language" },
  { label: "Iso Code", key: "iso" },
  { label: "Resource Level", key: "resource_level" },
  { label: "BCP-47 Code", key: "bcp_47" },
  { label: "Overlaps", key: "country_overlap" },
];

export function DataTableViewOptions<TData>({
  table,
  data,
}: DataTableViewOptionsProps<TData>) {
  const { regionsData, majorLanguages, majorLanguagesInResourceLevel4 } =
    useDownloadData();

  return (
    <DropdownMenu>
      <div className="flex gap-4">
        <CSVLink
          data={majorLanguagesInResourceLevel4}
          headers={majorLanguagesHeaders}
          filename={"strategic_languages_level4.csv"}
        >
          <Button
            variant="outline"
            size="sm"
            className="ml-auto hidden bg-primary px-3 py-2 font-normal text-white lg:flex"
          >
            <DownloadIcon className="mr-2 h-4 w-4" />
            Strategic Languages - Level 4
          </Button>
        </CSVLink>
        <CSVLink
          data={majorLanguages}
          headers={majorLanguagesHeaders}
          filename={"strategic_languages.csv"}
        >
          <Button
            variant="outline"
            size="sm"
            className="ml-auto hidden bg-primary px-3 py-2 font-normal text-white lg:flex"
          >
            <DownloadIcon className="mr-2 h-4 w-4" />
            All Strategic Languages
          </Button>
        </CSVLink>
        <CSVLink
          data={regionsData}
          headers={minorLanguagesheaders}
          filename={"all_regions.csv"}
        >
          <Button
            variant="outline"
            size="sm"
            className="ml-auto hidden bg-primary px-3 py-2 font-normal text-white lg:flex"
          >
            <DownloadIcon className="mr-2 h-4 w-4" />
            All Minor Languages
          </Button>
        </CSVLink>
        <CSVLink
          data={data}
          headers={minorLanguagesheaders}
          filename={"filtered_regions.csv"}
        >
          <Button
            variant="outline"
            size="sm"
            className="ml-auto hidden bg-primary px-3 py-2 font-normal text-white lg:flex"
          >
            <DownloadIcon className="mr-2 h-4 w-4" />
            Filtered Minor Languages
          </Button>
        </CSVLink>
      </div>
      {/* <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto hidden h-8 text-black lg:flex"
        >
          <MixerHorizontalIcon className="mr-2 h-4 w-4" />
          View
        </Button>
      </DropdownMenuTrigger> */}
      {/* <DropdownMenuContent align="end" className="w-[150px] bg-white">
        <DropdownMenuLabel className="text-black">
          Toggle columns
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanHide()
          )
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize text-black hover:bg-gray-200"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent> */}
    </DropdownMenu>
  );
}

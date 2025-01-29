"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { IconArrowLeft } from "@tabler/icons-react";
import { Table } from "@tanstack/react-table";
import { useRouter } from "next/navigation";

import CustomButton from "@components/Button";
import { Button } from "@components/ShadcnUi/button";
import { Input } from "@components/ShadcnUi/input";
import { Point } from "@utils/types/points";

import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  data: Point[];
}

export function DataTableToolbar<TData>({
  table,
  data,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const router = useRouter();

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center gap-4">
        <CustomButton
          label={"Back"}
          onClick={() => router.back()}
          icon={<IconArrowLeft size={16} stroke={2} strokeLinejoin="miter" />}
          buttonStyles="flex px-3 py-2 bg-primary text-white items-center justify-center gap-2 rounded-md text-xs font-bold"
          iconPosition="LEFT"
        />
        <Input
          placeholder="Filter Minor Languages..."
          value={table.getState().globalFilter ?? ""}
          onChange={(e) => table.setGlobalFilter(e.target.value)}
          className="w-[150px] rounded-md text-black outline-none lg:w-[250px]"
        />
        {/* {columnsToSearch.map((column) => {
          <Input
            placeholder={`Filter Data...`}
            value={(column?.getFilterValue() as string) ?? ""}
            onChange={(event) => column?.setFilterValue(event.target.value)}
            className="h-8 w-[150px] text-black outline-none lg:w-[250px]"
          />;
        })} */}
        {/* {table.getColumn("country") && (
          <DataTableFacetedFilter
            column={table.getColumn("country")}
            title="country"
            options={[]}
          />
        )} */}
        {/* {table.getColumn("region") && (
          <DataTableFacetedFilter
            column={table.getColumn("region")}
            title="Priority"
            options={priorities}
          />
        )} */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 text-black lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4 text-black" />
          </Button>
        )}
      </div>
      <DataTableViewOptions data={data} table={table} />
    </div>
  );
}

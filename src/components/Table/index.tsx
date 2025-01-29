"use client";

import { useEffect, useState } from "react";

import { Footer } from "@components/Footer";
import { columns } from "@components/Table/columns";
import { useAppContext } from "@context/AppContext";
import { useQueryContext } from "@context/QueryContext";
import supabase from "@utils/supabaseClient";
import { Point } from "@utils/types/points";

import { DataTable } from "./data-table";

export default function Table() {
  const { pointsInMajorLanguages } = useQueryContext();
  const { languagePoints } = useAppContext();

  const [minorLanguages, setMinorLanguages] = useState<Point[]>([]);

  useEffect(() => {
    const _points = languagePoints.filter((point) =>
      pointsInMajorLanguages.some(
        (selected) => selected === point.language_name
      )
    );
    setMinorLanguages(_points);
  }, [pointsInMajorLanguages]);

  return (
    <div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <h1 className="text-left text-lg font-bold text-black">
          Export Language Data
        </h1>
        <DataTable data={minorLanguages} columns={columns} />
      </div>
      <Footer />
    </div>
  );
}

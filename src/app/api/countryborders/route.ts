import { NextResponse } from "next/server";

import supabase from "@utils/supabaseClient";

const getCountryBorders = async () => {
  const { data, error } = await supabase
    .from("country")
    .select("country,border_polygon,latitude,longitude");
  if (error) {
    console.log("error", error);
  }
  return data;
};

export async function GET(request: Request) {
  const resData = await getCountryBorders();
  return NextResponse.json(resData);
}

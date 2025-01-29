import { NextResponse } from "next/server";

import supabase from "@utils/supabaseClient";

const getLanguages = async (params: string) => {
  if (params === "all") {
    const { data, error } = await supabase
      .from("country")
      .select()
      .order("country", { ascending: true });
    if (error) {
      console.log("error", error);
    }
    return data;
  } else {
    const { data, error } = await supabase
      .from("country")
      .select()
      .eq("Region", `${params}`)
      .order("country", { ascending: true });
    if (error) {
      console.log("error", error);
    }
    return data;
  }
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const resData = query && (await getLanguages(query));
  return NextResponse.json(resData);
}

import { NextResponse } from "next/server";

import supabase from "@utils/supabaseClient";

const getLanguages = async () => {
  const { data, error } = await supabase
    .from("region")
    .select()
    .order("region", { ascending: true });
  if (error) {
    console.log("error", error);
  }
  return data;
};

export async function GET(request: Request) {
  const resData = await getLanguages();
  return NextResponse.json(resData);
}

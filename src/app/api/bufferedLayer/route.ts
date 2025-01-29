import { NextResponse } from "next/server";

import supabase from "@utils/supabaseClient";

const getBufferedLayer = async () => {
  const { data, error, status } = await supabase
    .from("major_languages_buffered")
    .select(`polygon`);
  if (status !== 200) {
    throw new Error(`Request failed with status ${status}`);
  }
  if (error) {
    console.log("error", error);
    return { data, error };
  }
  return { data, error };
};

export async function POST() {
  const resData = await getBufferedLayer();
  return NextResponse.json(resData);
}

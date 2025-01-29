import { NextResponse } from "next/server";

import supabase from "@utils/supabaseClient";
export const maxDuration = 300;
const getLanguages = async () => {
  const { data, error, status } = await supabase
    .from("major_languages")
    .select(
      `id, language, iso, resource_level, compressed_polygon, country(country)`
    );
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
  const resData = await getLanguages();
  return NextResponse.json(resData);
}

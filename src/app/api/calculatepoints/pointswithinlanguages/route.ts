import { NextResponse } from "next/server";

import supabase from "@utils/supabaseClient";

const getPointsWithinLanguages = async (languageList: string[]) => {
  const { data, error, status } = await supabase.rpc(
    "get_points_in_major_languages",
    { languages: languageList }
  );
  if (error) {
    console.log("postgis error", error);
  }
  if (data) {
    console.log({ data });
  }
  return data;
};

export async function POST(request: Request) {
  const { languageList } = await request.json();
  const resData =
    languageList.length != 0 && (await getPointsWithinLanguages(languageList));
  return NextResponse.json(resData);
}

import { NextResponse } from "next/server";

// export const config = {
//   runtime: "edge",
// };

import supabase from "@utils/supabaseClient";

const getPointsWithinLanguagesNRegions = async (
  languageList: string[],
  regionListArray: string[]
) => {
  const { data, error, status } = await supabase.rpc("get_points_in_regions", {
    languages: languageList,
    regions: regionListArray,
  });
  console.log({ status });
  if (error) {
    console.log({ error });
  }
  return data;
};

export async function POST(request: Request) {
  const { languageList, regionListArray } = await request.json();
  const resData =
    languageList.length != 0 &&
    (await getPointsWithinLanguagesNRegions(languageList, regionListArray));
  return NextResponse.json(resData);
}

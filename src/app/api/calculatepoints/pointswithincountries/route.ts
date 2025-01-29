import { NextResponse } from "next/server";

import supabase from "@utils/supabaseClient";

const getPointsWithinLanguagesNCountries = async (
  languageList: string[],
  countryListArray: string[]
) => {
  const { data, error, status } = await supabase.rpc(
    "get_points_in_countries",
    {
      countries: countryListArray,
      languages: languageList,
    }
  );
  console.log({ status });
  if (error) {
    console.log("postgis error", error);
  }
  return data;
};

export async function POST(request: Request) {
  const { languageList, countryListArray } = await request.json();
  const resData =
    languageList.length != 0 &&
    (await getPointsWithinLanguagesNCountries(languageList, countryListArray));
  return NextResponse.json(resData);
}

import { NextResponse } from "next/server";

import supabase from "@utils/supabaseClient";

// const getLanguages = async (params: string) => {
//   const { data, error } = await supabase
//     .from("Country")
//     .select(`Country ,"Language" (Id,Language,IsoCode,ResourceLevel,Polygon)`)
//     .eq("Country", `${params}`);
//   if (error) {
//     console.log("error", error);
//   }
//   return data;
// };

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const query = searchParams.get("query");
//   const resData = query && (await getLanguages(query));
//   return NextResponse.json(resData);
// }

// const getLanguages = async () => {
//   const { data, error } = await supabase
//     .from("country_borders")
//     .select("name,geojson,latitude,longitude");
//   if (error) {
//     console.log("error", error);
//   }
//   return data;
// };

// export async function GET(request: Request) {
//   // const { searchParams } = new URL(request.url);
//   // const query = searchParams.get("query");
//   const resData = await getLanguages();
//   return NextResponse.json(resData);
// }

export async function GET(request: Request) {
  return new Response("Hello, Next.js!");
}

import { NextResponse } from "next/server";

import supabase from "@utils/supabaseClient";

const searchPoint = async (language_name: string) => {
  try {
    const { data, error } = await supabase.rpc("search_point", {
      language_param: language_name,
    });

    if (error) {
      console.error("Supabase error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return data;
  } catch (error) {
    console.error("Internal server error:", error);
    throw error;
  }
};

export async function POST(request: Request) {
  const { language_name } = await request.json();
  const resData = await searchPoint(language_name);
  return NextResponse.json(resData);
}

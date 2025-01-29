import { NextResponse } from "next/server";

import supabase from "@utils/supabaseClient";

const fetchResources = async () => {
  const { data: resourceType } = await supabase
    .from("resource_type")
    .select("*")
    .order("id", { ascending: true });

  const { data: resources } = await supabase.from("resources").select(
    `id, created_at, resource_type, priority, status, "Language"(Language), "resource_level_link"(resource_level)`
    // TODO: Languages table was updated and renamed, so this will need to be updated
  );

  return { resources, resourceType };
};

export async function GET() {
  const resData = await fetchResources();
  return NextResponse.json(resData);
}

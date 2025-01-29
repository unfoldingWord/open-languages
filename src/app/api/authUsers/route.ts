import { NextResponse } from "next/server";

import supabase from "@utils/supabaseClient";

const getUsers = async (signup_email: string) => {
  const { data, error } = await supabase.rpc("get_user_emails", {
    signup_email: signup_email,
  });
  if (error) {
    console.log("error", error);
    return error;
  }
  return data;
};

export async function POST(request: Request) {
  const { signup_email } = await request.json();
  const resData = await getUsers(signup_email);
  return NextResponse.json(resData);
}

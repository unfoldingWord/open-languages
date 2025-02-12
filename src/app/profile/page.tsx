import Link from "next/link";
import { redirect } from "next/navigation";

import SignOut from "@components/SignOutButton";
import createClient from "@utils/supabase-server";

export default async function Profile() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-min">
        <div className="card">
          <h2>User Profile</h2>
          <code className="highlight">{user.email}</code>
          <div className="heading">Last Signed In:</div>
          <code className="highlight">
            {user.last_sign_in_at &&
              new Date(user.last_sign_in_at).toUTCString()}
          </code>
          <Link className="button" href="/">
            Go Home
          </Link>
          <SignOut />
        </div>
      </div>
    </div>
  );
}

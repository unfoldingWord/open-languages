"use client";

import { useRouter } from "next/navigation";

import { useAuth } from "@context/AuthProvider";

export default function SignOut() {
  const { signOut } = useAuth();
  const router = useRouter();

  async function handleSignOut() {
    const { error } = await signOut();

    if (error) {
      console.error("ERROR signing out:", error);
    } else {
      console.log("Successfully signed out!");
      router.push("/");
    }
  }

  return (
    <button type="button" className="button-inverse" onClick={handleSignOut}>
      Sign Out
    </button>
  );
}

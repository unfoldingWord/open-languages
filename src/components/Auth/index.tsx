"use client";

import { useAuth, VIEWS } from "@context/AuthProvider";

import ResetPassword from "./ResetPassword";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import UpdatePassword from "./UpdatePassword";

interface AuthProps {
  view?: string;
}

const Auth: React.FC<AuthProps> = ({ view: initialView }) => {
  let { view } = useAuth() as any;

  if (initialView) {
    view = initialView;
  }

  return (
    <div className=" flex items-center justify-center">
      {view === VIEWS.UPDATE_PASSWORD && <UpdatePassword />}
      {view === VIEWS.FORGOTTEN_PASSWORD && <ResetPassword />}
      {view === VIEWS.SIGN_UP && <SignUp />}
      {!view || (view === VIEWS.SIGN_IN && <SignIn />)}
    </div>
  );
};

export default Auth;

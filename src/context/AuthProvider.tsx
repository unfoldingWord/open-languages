"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { AuthError } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

import supabase from "@utils/supabase-browser";

interface AuthProviderProps {
  accessToken?: string;
  children: React.ReactNode;
}

interface AuthContextValue {
  initial: boolean;
  session: any;
  user: any;
  view: string;
  setView: (view: string) => void;
  signOut: () => Promise<{ error: AuthError | null }>;
}

export const EVENTS = {
  PASSWORD_RECOVERY: "PASSWORD_RECOVERY",
  SIGNED_OUT: "SIGNED_OUT",
  USER_UPDATED: "USER_UPDATED",
};

export const VIEWS = {
  SIGN_IN: "sign_in",
  SIGN_UP: "sign_up",
  FORGOTTEN_PASSWORD: "forgotten_password",
  MAGIC_LINK: "magic_link",
  UPDATE_PASSWORD: "update_password",
};

export const AuthContext = createContext<AuthContextValue>(null!);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ accessToken, children }: AuthProviderProps) => {
  const [initial, setInitial] = useState<boolean>(true);
  const [session, setSession] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [view, setView] = useState<string>(VIEWS.SIGN_IN);
  const router = useRouter();

  useEffect(() => {
    async function getActiveSession() {
      const {
        data: { session: activeSession },
      } = await supabase.auth.getSession();
      setSession(activeSession);
      setUser(activeSession?.user ?? null);
      setInitial(false);
    }
    getActiveSession();

    const {
      data: { subscription: authListener },
    } = supabase.auth.onAuthStateChange((event, currentSession) => {
      if (currentSession?.access_token !== accessToken) {
        router.refresh();
      }

      setSession(currentSession);
      setUser(currentSession?.user ?? null);

      switch (event) {
        case EVENTS.PASSWORD_RECOVERY:
          setView(VIEWS.UPDATE_PASSWORD);
          break;
        case EVENTS.SIGNED_OUT:
        case EVENTS.USER_UPDATED:
          setView(VIEWS.SIGN_IN);
          break;
        default:
      }
    });

    return () => {
      authListener?.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(() => {
    return {
      initial,
      session,
      user,
      view,
      setView,
      signOut: () => supabase.auth.signOut(),
    };
  }, [initial, session, user, view]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

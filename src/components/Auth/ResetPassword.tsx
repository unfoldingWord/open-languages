import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import cn from "classnames";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useAuth, VIEWS } from "@context/AuthProvider";
import { getURL } from "@utils/getUrl";
import supabase from "@utils/supabase-browser";

const ResetPassword = () => {
  const { setView } = useAuth() as any;
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const schema = z.object({
    email: z.string().email("Invalid email").nonempty("Required"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<{ email: string }>({
    resolver: zodResolver(schema),
  });

  async function resetPassword(formData: { email: string }) {
    const { error } = await supabase.auth.resetPasswordForEmail(
      formData?.email,
      {
        redirectTo: `${getURL()}passwordReset`,
      }
    );

    if (error) {
      setErrorMsg(error.message);
    } else {
      setSuccessMsg("Password reset instructions sent.");
    }
  }

  return (
    <div className="card">
      <h2 className="w-full text-center">Forgot Password</h2>
      <form onSubmit={handleSubmit(resetPassword)} className="column w-full">
        <label htmlFor="email">Email</label>
        <input
          className={cn(
            "w-full rounded-xl p-2 outline-none border border-gray-400",
            errors.email && "bg-red-50",
            "text-black focus:outline-none"
          )}
          placeholder="Email"
          id="email"
          {...register("email")}
          type="email"
        />
        {errors.email && (
          <div className="text-red-600">{errors.email.message}</div>
        )}
        <button
          className="mt-7 w-full rounded-xl bg-primary p-2 text-white"
          type="submit"
        >
          Submit
        </button>
      </form>
      {errorMsg && <div className="text-center text-red-600">{errorMsg}</div>}
      {successMsg && (
        <div className="text-center text-green-500">{successMsg}</div>
      )}
      <button
        className="w-full text-black"
        type="button"
        onClick={() => setView(VIEWS.SIGN_IN)}
      >
        Remember your password? Sign In.
      </button>
    </div>
  );
};

export default ResetPassword;

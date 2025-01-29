import { useState } from "react";

import cn from "classnames";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";

import { useAuth, VIEWS } from "@context/AuthProvider";
import supabase from "@utils/supabase-browser";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const SignUp = () => {
  const { setView } = useAuth() as any;
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (formData: FormValues) => {
    try {
      setLoading(true);
      const response = await fetch("/api/authUsers", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
          signup_email: formData.email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      if (data.length > 0) {
        setErrorMsg("An account with this email already exists.");
        setLoading(false);
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              first_name: formData.firstName,
              last_name: formData.lastName,
            },
          },
        });

        if (error) {
          setErrorMsg(error.message);
          setLoading(false);
        } else {
          setSuccessMsg(
            "Success! Please check your email for further instructions."
          );
          setLoading(false);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="card">
      <h2 className="w-full text-center">Create Account</h2>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 flex w-full items-center justify-between">
          <div className="flex flex-col">
            <label htmlFor="firstName" className="mb-2 text-black">
              First Name
            </label>
            <input
              className={cn(
                "w-full rounded-xl p-2 outline-none border border-gray-400 text-black",
                errors.firstName && "bg-red-50"
              )}
              id="firstName"
              type="text"
              {...register("firstName", { required: true })}
            />
            {errors.firstName && (
              <div className="text-red-600">First name is required.</div>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="lastName" className="mb-2 text-black">
              Last Name
            </label>
            <input
              className={cn(
                "w-full rounded-xl p-2 outline-none border border-gray-400 text-black",
                errors.lastName && "bg-red-50"
              )}
              id="lastName"
              type="text"
              {...register("lastName", { required: true })}
            />
            {errors.lastName && (
              <div className="text-red-600">Last name is required.</div>
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="email" className="text-black">
            Email
          </label>
          <input
            className={cn(
              "w-full rounded-xl p-2 outline-none border border-gray-400 text-black",
              errors.email && "bg-red-50"
            )}
            id="email"
            type="email"
            {...register("email", { required: true })}
          />
        </div>
        {errors.email && <div className="text-red-600">Email is required.</div>}

        <div className="relative my-5 space-y-1.5">
          <label htmlFor="password" className="text-black">
            Password
          </label>
          <input
            className={cn(
              "w-full rounded-xl p-2 outline-none border border-gray-400 text-black",
              errors.password && "bg-red-50"
            )}
            id="password"
            type={showPass ? "text" : "password"}
            {...register("password", { required: true })}
          />
          {showPass ? (
            <EyeOff
              size={20}
              onClick={() => setShowPass((prev) => !prev)}
              className="absolute right-2 top-8 flex items-center text-gray-600"
            />
          ) : (
            <Eye
              size={20}
              onClick={() => setShowPass((prev) => !prev)}
              className="absolute right-2 top-8 flex items-center text-gray-600"
            />
          )}
          {errors.password && (
            <div className="text-red-600">Password is required.</div>
          )}
        </div>

        <button
          className="w-full rounded-xl bg-primary p-2 text-white"
          type="submit"
        >
          {loading && (
            <svg
              aria-hidden="true"
              role="status"
              className="mr-3 inline h-5 w-5 animate-spin text-white"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
          )}
          Submit
        </button>
      </form>
      {errorMsg && <div className="text-red-600">{errorMsg}</div>}
      {successMsg && <div className="text-green-500">{successMsg}</div>}
      <button
        className="w-full text-black"
        type="button"
        onClick={() => setView(VIEWS.SIGN_IN)}
      >
        Already have an account?{" "}
        <span className="hover:underline">Sign In</span>
      </button>
    </div>
  );
};

export default SignUp;

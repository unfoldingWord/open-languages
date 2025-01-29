"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";

import { toast } from "@components/ShadcnUi/use-toast";
import supabase from "@utils/supabase-browser";
interface IFormInput {
  password: string;
  passwordConfirm: string;
}

const UpdatePassword = () => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [hash, setHash] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm<IFormInput>();

  const password = watch("password");

  async function updatePassword(formData: {
    password: string;
    passwordConfirm: string;
  }) {
    if (formData.password !== formData.passwordConfirm) {
      setErrorMsg("Passwords do not match");
      return;
    }

    try {
      // if the user doesn't have access token
      if (!hash) {
        setErrorMsg("Invalid access token or type");
        return;
      }

      const hashArr = hash
        .substring(1)
        .split("&")
        .map((param) => param.split("="));

      let type;
      let accessToken;

      for (const [key, value] of hashArr) {
        if (key === "type") {
          type = value;
        } else if (key === "access_token") {
          accessToken = value;
        }
      }

      if (
        type !== "recovery" ||
        !accessToken ||
        typeof accessToken === "object"
      ) {
        setErrorMsg("Invalid access token or type");
        return;
      }

      // Update the password
      const { data, error } = await supabase.auth.updateUser({
        password: formData.password,
      });

      if (error) {
        setErrorMsg(error.message);
      } else if (data) {
        toast({
          title: "Success!",
          description: "Password updated successfully",
        });
        router.push("/");
      }
    } catch (error: any) {
      setErrorMsg(error);
    }
  }

  useEffect(() => {
    setHash(window.location.hash);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center">
      <h2 className="mb-8 text-2xl font-bold text-gray-800">Update Password</h2>
      <form
        onSubmit={handleSubmit(updatePassword)}
        className="w-full max-w-md rounded-md bg-white p-8 shadow-md"
      >
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            New Password
          </label>
          <input
            {...register("password", { required: "Password is required" })}
            className="mt-1 w-full rounded-md border p-2 text-black"
            id="password"
            type="password"
          />
          {errors.password && (
            <span className="text-sm font-semibold text-red-500">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="passwordConfirm"
            className="block text-sm font-medium text-gray-600"
          >
            Confirm Password
          </label>
          <Controller
            render={({ field }) => (
              <input
                {...field}
                className={`mt-1 w-full rounded-md border p-2 text-black ${
                  errors.passwordConfirm && "border-red-500"
                }`}
                type="password"
              />
            )}
            control={control}
            name="passwordConfirm"
            rules={{
              validate: (value) =>
                value === password || "Passwords do not match",
            }}
          />
          {errors.passwordConfirm && (
            <span className="text-sm text-red-500">
              {errors.passwordConfirm.message}
            </span>
          )}
          {errorMsg && <p className="mt-4 text-red-600">{errorMsg}</p>}
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full rounded-md bg-primary p-2 text-white hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePassword;

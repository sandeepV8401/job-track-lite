import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../store/authHook";
import { ROUTES } from "../../../config/routes.constants";
import { useGlobalToast } from "../../../app/useGlobalToast.hook";

const AuthPage = () => {
  const { login, register, isLoading, clearError } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const { showError, showSuccess } = useGlobalToast();

  const {
    register: formRegister,
    handleSubmit,
    getValues,
    reset,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onChange" });

  const toggleForm = () => {
    clearError();
    clearErrors();
    reset();
    setIsRegister((p) => !p);
  };

  const onSubmit = async (data) => {
    clearError();
    "SIGNup DATA", data;
    try {
      if (isRegister) {
        const res = await register(data).unwrap();
        showSuccess(res.message);
      } else {
        const res = await login(data).unwrap();
        showSuccess(res.message);
      }
    } catch (error) {
      console.error("❌ LOGIN/REGISTER ERROR:", error);
      const errorMessage =
  error?.message ||
  error?.data?.message ||
  "Something went wrong!";
      showError(errorMessage);
      return;
    }
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      {isRegister && (
        <>
          <input
            className="border p-2 rounded"
            placeholder="Enter Name"
            {...formRegister("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name must be atleast 3 characters",
              },
            })}
          />
          {errors.name && (
            <p className="text-red-500 text-xs">{errors.name.message}</p>
          )}
        </>
      )}

      <input
        className="border p-2 rounded"
        placeholder="Enter Email"
        {...formRegister("email", {
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address",
          },
        })}
      />
      {errors.email && (
        <p className="text-red-500 text-xs">{errors.email.message}</p>
      )}

      <input
        className="border p-2 rounded"
        type="password"
        placeholder="Enter Password"
        {...formRegister("password", {
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be atleast 6 characters",
          },
        })}
      />
      {errors.password && (
        <p className="text-red-500 text-xs">{errors.password.message}</p>
      )}

      {isRegister && (
        <>
          <input
            className="border p-2 rounded"
            type="password"
            placeholder="Confirm Password"
            {...formRegister("confirmPassword", {
              required: "Password is required",
              validate: (value) =>
                value === getValues("password") || "Password do not match",
            })}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs">
              {errors.confirmPassword.message}
            </p>
          )}
        </>
      )}

      <button
        className="bg-orange-500 text-white py-2 rounded cursor-pointer hover:bg-orange-400"
        disabled={isSubmitting || isLoading}
      >
        {isSubmitting || isLoading
          ? "Processing..."
          : isRegister
          ? "Create Account"
          : "Sign In"}
      </button>
      <div className="text-center text-sm text-gray-500">
        {isRegister ? (
          <span>
            Already have an account?
            <button
              type="button"
              onClick={toggleForm}
              className="text-orange-500 hover:underline font-medium ml-1 cursor-pointer"
            >
              Login
            </button>
          </span>
        ) : (
          <span>
            Don't have an account?
            <button
              type="button"
              onClick={toggleForm}
              className="text-orange-500 hover:underline font-medium ml-1 cursor-pointer"
            >
              Sign up
            </button>
          </span>
        )}
      </div>
    </form>
  );
};

export default AuthPage;

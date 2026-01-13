import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../auth/store/authHook";
import profileImg from "../../assets/profileImg.jpg";

const Profile = () => {
  const { user, isLoading, error, getProfile, updateProfile } = useAuth();
  useEffect(() => {
    getProfile(); // Always fetch profile on mount
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    defaultValues: {},
    mode: "onChange",
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        skills: user.skills || "",
        address: user.address || "",
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    await updateProfile(data);
    // getProfile();

    reset(data);
  };

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-gray-200/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
        </div>
      )}

      <div className="flex flex-col items-center gap-6 pt-16 sm:pt-20 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {error && (
          <div className="p-3 sm:p-2 bg-red-100/90 border border-red-200 text-red-700 text-xs sm:text-sm rounded-md max-w-md w-full text-center">
            {error}
          </div>
        )}

        <div className="flex flex-col items-center gap-3 sm:gap-2 w-full">
          <img
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover ring-2 ring-orange-200 shadow-md"
            src={profileImg}
            alt="profile"
          />
          <span className="text-gray-600 font-semibold text-sm sm:text-base text-center">
            {isLoading ? "Loading..." : user?.name || "User"}
          </span>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl"
        >
          {/* Name */}
          <div className="space-y-1">
            <input
              className={`w-full p-3 sm:p-2 rounded-lg bg-gray-100 focus:outline-none border text-sm ${
                errors.name ? "border-red-400 bg-red-50" : "border-gray-200"
              }`}
              placeholder="Name"
              {...register("name", {
                required: "Name is required",
                minLength: { value: 3, message: "Min 3 characters" },
              })}
            />
            {errors.name && (
              <span className="text-xs text-red-500 block">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="space-y-1">
            <input
              className={`w-full p-3 sm:p-2 rounded-lg bg-gray-100 focus:outline-none border text-sm ${
                errors.phone ? "border-red-400 bg-red-50" : "border-gray-200"
              }`}
              placeholder="Phone"
              {...register("phone", {
                required: "Phone is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Enter 10 digit phone number",
                },
              })}
            />
            {errors.phone && (
              <span className="text-xs text-red-500 block">
                {errors.phone.message}
              </span>
            )}
          </div>

          <div className="space-y-1 col-span-1 sm:col-span-2">
            <input
              className="w-full p-3 sm:p-2 rounded-lg bg-gray-200 text-gray-500 cursor-not-allowed border border-gray-300 text-sm"
              disabled
              {...register("email")}
            />
          </div>

          <div className="space-y-1 col-span-1 sm:col-span-2">
            <input
              className="w-full p-3 sm:p-2 rounded-lg bg-gray-100 focus:outline-none border border-gray-200 text-sm"
              placeholder="Skills (React, Node, MongoDB)"
              {...register("skills")}
            />
          </div>

          <div className="space-y-1 col-span-1 sm:col-span-2">
            <input
              className={`w-full p-3 sm:p-2 rounded-lg bg-gray-100 focus:outline-none border text-sm ${
                errors.address ? "border-red-400 bg-red-50" : "border-gray-200"
              }`}
              placeholder="Location"
              {...register("address", {
                minLength: { value: 10, message: "Min 10 characters" },
              })}
            />
            {errors.address && (
              <span className="text-xs text-red-500 block">
                {errors.address.message}
              </span>
            )}
          </div>

          <div className="col-span-1 sm:col-span-2 flex justify-center mt-4 sm:mt-2">
            <button
              type="submit"
              disabled={!isDirty || isSubmitting}
              className={`px-8 py-3 sm:py-2 rounded-lg text-white font-semibold transition text-sm w-full sm:w-auto ${
                !isDirty || isSubmitting
                  ? "bg-orange-300 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600"
              }`}
            >
              {isSubmitting ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;

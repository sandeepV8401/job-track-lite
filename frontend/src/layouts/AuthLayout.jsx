
import { Link } from "react-router-dom";
import { ROUTES } from "../config/routes.constants";
import icon from "../assets/job-track-icon.png";

const AuthLayout = ({ children }) => (
  <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-200 to-orange-200 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
      <div className="flex items-center justify-center gap-4">
        {/* Logo */}
        <img
          src={icon}
          alt="job-track-icon"
          className="w-15 h-15 object-contain"
        />

        {/* Text Section */}
        <div className="leading-tight">
          <h2 className="text-3xl font-bold">
            <span className="text-gray-700">JOB TRACK </span>
            <span className="text-sm text-orange-500 font-cursive italic align-top">
              LITE
            </span>
          </h2>
          <p className="text-sm text-gray-600 mt-1">Your dream job awaits!</p>
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white shadow-2xl rounded-2xl p-8">{children}</div>
    </div>
  </div>
);

export default AuthLayout;

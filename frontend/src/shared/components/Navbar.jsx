import React, { useEffect, useState } from "react";
import { ChevronDown, CircleUserRound, Menu, X } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import icon from "../../assets/job-track-icon.png";
import { useAuth } from "../../features/auth/store/authHook";
import { ROUTES } from "../../config/routes.constants";
import { useJob } from "../../features/jobs/store/jobHook";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const navigate = useNavigate();
  const { user, isLoading, error, getProfile, logout } = useAuth();
  const { resetAllJobFilters, getJobs } = useJob();

  useEffect(() => {
    if (!user) {
      getProfile();
    }
  }, []);
  "GET PROFILE navbar", user;

  const handleLogout = () => {
    ("Logout btn clicked");
    logout();
    navigate("/");
  };

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-gray-200/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
        </div>
      )}

      <div className="w-full px-4 py-3 sm:px-6 lg:px-12 bg-gray-200">
        <div className="flex justify-between items-center">
          {/* Left - Logo + Error */}
          <div className="flex items-center gap-2 shrink-0">
            <img className="w-9 h-9 sm:w-10" src={icon} alt="job-track-icon" />
            <h2 className="text-lg sm:text-xl font-bold hidden sm:block">
              <span className="text-gray-500">JOB TRACK</span>{" "}
              <span className="text-sm text-orange-500 font-cursive italic">
                LITE
              </span>
            </h2>
          </div>

          <button
            className="lg:hidden p-2"
            onClick={() => setMobileNav(!mobileNav)}
          >
            {mobileNav ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          <div className="hidden lg:flex font-bold text-gray-500">
            <ul className="flex gap-4 lg:gap-6 xl:gap-8">
              <li>
                <NavLink to={ROUTES.DASHBOARD}>
                  <span className="inline-block hover:text-orange-500 hover:scale-105 hover:bg-gray-50 transition-all duration-200 rounded-2xl px-3 py-1 text-sm">
                    Dashboard
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={ROUTES.JOBS}
                  onClick={() => {
                    resetAllJobFilters();
                    getJobs();
                  }}
                >
                  <span className="inline-block hover:text-orange-500 hover:scale-105 hover:bg-gray-50 transition-all duration-200 rounded-2xl px-3 py-1 text-sm">
                    All Jobs
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink to={ROUTES.ADD_JOB}>
                  <span className="inline-block hover:text-orange-500 hover:scale-105 hover:bg-gray-50 transition-all duration-200 rounded-2xl px-3 py-1 text-sm">
                    + Add Job
                  </span>
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {error && (
              <div className="hidden sm:block ml-2 p-2 bg-red-100 border border-red-300 text-red-800 text-xs rounded-lg max-w-xs">
                {error}
              </div>
            )}

            <ul className="flex items-center gap-1 sm:gap-2">
              <li className="hidden sm:block">
                <CircleUserRound className="w-5 h-5" />
              </li>
              <div className="flex gap-1 justify-center items-center">
                <li className="text-orange-500 text-xs sm:text-sm">
                  <span>Hi,</span>
                  <span className="font-cursive italic bold block sm:inline">
                    {isLoading
                      ? "Loading..."
                      : error
                      ? "Error"
                      : user?.name?.split(" ")[0] || "User"}
                  </span>
                </li>
                <li
                  className="p-1.5 sm:p-2 hover:scale-110 hover:text-orange-500 transition-all duration-200 rounded-full hover:bg-gray-50 relative"
                  onClick={() => setShowMenu(!showMenu)}
                >
                  <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer" />
                  {showMenu && (
                    <ul className="absolute top-full right-0 mt-2 w-44 sm:w-48 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-50">
                      <li>
                        <Link
                          to={ROUTES.PROFILE}
                          className="block px-3 py-2 text-xs sm:text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                          onClick={() => setShowMenu(false)}
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <button
                          className="w-full text-left px-3 py-2 text-xs sm:text-sm text-gray-700 hover:bg-red-50 hover:text-red-500"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  )}
                </li>
              </div>
            </ul>
          </div>
        </div>

        {mobileNav && (
          <div className="lg:hidden border-t border-gray-300 pt-3 pb-2">
            <ul className="flex flex-col sm:flex-row gap-3 text-center">
              <li>
                <NavLink
                  to={ROUTES.DASHBOARD}
                  className="block w-full py-2 px-4 text-sm font-medium text-gray-500 hover:text-orange-500 hover:bg-gray-100 rounded-xl"
                  onClick={() => setMobileNav(false)}
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={ROUTES.JOBS}
                  className="block w-full py-2 px-4 text-sm font-medium text-gray-500 hover:text-orange-500 hover:bg-gray-100 rounded-xl"
                  onClick={() => {
                    resetAllJobFilters();
                    getJobs();
                    setMobileNav(false);
                  }}
                >
                  Jobs
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={ROUTES.ADD_JOB}
                  className="block w-full py-2 px-4 text-sm font-medium text-gray-500 hover:text-orange-500 hover:bg-gray-100 rounded-xl"
                  onClick={() => setMobileNav(false)}
                >
                  + Add Job
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;

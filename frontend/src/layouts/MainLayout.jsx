
import { Outlet } from "react-router-dom";
import { ROUTES } from "../config/routes.constants";

import Navbar from "../shared/components/Navbar";
import Dashboard from "../features/jobs/pages/Dashboard";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-orange-50 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;

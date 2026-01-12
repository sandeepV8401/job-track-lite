  import React from "react";
  import { Route, Routes, Navigate } from "react-router-dom";
  import ProtectedRoute from "../shared/components/ProtectedRoute";
  import PublicRoute from "../shared/components/PublicRoute";

  import Dashboard from "../features/jobs/pages/Dashboard";
  import { ROUTES } from "../config/routes.constants";
  import AuthLayout from "../layouts/AuthLayout";
  import AuthPage from "../features/auth/pages/AuthPage";
  import MainLayout from "../layouts/MainLayout";
  import Jobs from "../features/jobs/pages/Jobs";
  import Profile from "../features/profile/Profile";
  import AddJob from "../features/jobs/pages/AddJob";
  import EditJob from "../features/jobs/pages/EditJob";

  const AppRoutes = () => {
    return (
      <Routes>
        {/* PUBLIC ROUTES (Login/Register) */}
        <Route
          path={ROUTES.AUTH}
          element={
            <PublicRoute>
              <AuthLayout>
                <AuthPage />
              </AuthLayout>
            </PublicRoute>
          }
        />

        {/* PROTECTED ROUTES (Dashboard/Jobs) */}
        <Route
          path={ROUTES.DASHBOARD}
          element={
            <ProtectedRoute>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.JOBS}
          element={
            <ProtectedRoute>
              <MainLayout>
                <Jobs />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.ADD_JOB}
          element={
            <ProtectedRoute>
              <MainLayout>
                <AddJob />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.UPDATE_JOB}
          element={
            <ProtectedRoute>
              <MainLayout>
                <EditJob />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.PROFILE}
          element={
            <ProtectedRoute>
              <MainLayout>
                <Profile />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        
        <Route path="/" element={<Navigate to={ROUTES.AUTH} replace />} />

        <Route path="*" element={<h1>404! Page not found.</h1>} />
      </Routes>
    );
  };

  export default AppRoutes;

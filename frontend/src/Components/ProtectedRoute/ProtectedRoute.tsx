import React from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../../utility/api";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const user = getCurrentUser();

  if (!user) {
    // Not logged in, redirect to home (login page)
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Role not allowed, redirect to home or unauthorized page
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

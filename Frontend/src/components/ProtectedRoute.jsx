import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isLoggedIn, initializing } = useAuth();

  if (initializing) return null;
  if (!isLoggedIn) return <Navigate to="/home" replace />;

  return children;
}

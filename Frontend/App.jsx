import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./src/context/AuthContext";
import { NavOverlayProvider } from "./src/context/NavOverlayContext";
import NavOverlay from "./src/components/nav/NavOverlay";
import ProtectedRoute from "./src/components/ProtectedRoute";
import Welcome from "./src/pages/Welcome";
import Home from "./src/pages/Home";
import ClassDetails from "./src/pages/ClassDetails";
import Search from "./src/pages/Search";
import MySchedule from "./src/pages/MySchedule";
import Signup from "./src/pages/Signup";

export default function App() {
  return (
    <AuthProvider>
      <NavOverlayProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/home" element={<Home />} />
            <Route path="/class/:classId" element={<ClassDetails />} />
            <Route path="/search" element={<Search />} />
            <Route
              path="/schedule"
              element={
                <ProtectedRoute>
                  <MySchedule />
                </ProtectedRoute>
              }
            />
            <Route path="/signup" element={<Signup />} />
          </Routes>
          <NavOverlay />
        </BrowserRouter>
      </NavOverlayProvider>
    </AuthProvider>
  );
}

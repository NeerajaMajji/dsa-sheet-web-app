import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Topics from "./pages/Topics";
import Problems from "./pages/Problems";
import Profile from "./pages/Profile";
import Progress from "./pages/Progress";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

function Layout() {
  const location = useLocation();
  const token = localStorage.getItem("token");

  const hideNavbar = location.pathname === "/" || !token;

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/topics"
          element={
            <PrivateRoute>
              <Topics />
            </PrivateRoute>
          }
        />

        <Route
          path="/topics/:topicId"
          element={
            <PrivateRoute>
              <Problems />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        <Route
          path="/progress"
          element={
            <PrivateRoute>
              <Progress />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

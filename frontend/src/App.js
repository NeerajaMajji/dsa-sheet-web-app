import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Topics from "./pages/Topics";
import Problems from "./pages/Problems";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Progress from "./pages/Progress";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
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
          path="/progress"
          element={
            <PrivateRoute>
              <Progress />
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;

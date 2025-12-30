import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const name = localStorage.getItem("name");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    window.location.href = "/";
  };

  return (
    <AppBar position="static">
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">DSA Tracker</Typography>

        <div>
          <Button
            color="inherit"
            component={NavLink}
            to="/topics"
            style={({ isActive }) => ({
              fontWeight: isActive ? "bold" : "normal",
            })}
          >
            Topics
          </Button>

          <Button
            color="inherit"
            component={NavLink}
            to="/progress"
            style={({ isActive }) => ({
              fontWeight: isActive ? "bold" : "normal",
            })}
          >
            Progress
          </Button>

          <Button
            color="inherit"
            component={NavLink}
            to="/profile"
            style={({ isActive }) => ({
              fontWeight: isActive ? "bold" : "normal",
            })}
          >
            Profile
          </Button>

          {/* <Typography style={{ margin: "0 15px", display: "inline-block" }}>
            {name}
          </Typography> */}

          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}

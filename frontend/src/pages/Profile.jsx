import { useEffect, useState } from "react";
import { Typography, Paper } from "@mui/material";
import { getUserId } from "../utils/auth";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function load() {
      const userId = getUserId();
      const res = await fetch(`http://localhost:5000/api/user/${userId}`);
      const data = await res.json();
      setUser(data);
    }

    load();
  }, []);

  if (!user) return <div style={{ padding: 30 }}>Loading...</div>;

  return (
    <Paper style={{ padding: 30, margin: 30 }}>
      <Typography variant="h5" gutterBottom>
        Welcome {user.name}
      </Typography>

      <Typography>Email: {user.email}</Typography>

      <Typography sx={{ marginTop: 2, color: "gray" }}>
        © 2025 Dashboard. All Rights Reserved.
      </Typography>
    </Paper>
  );
}

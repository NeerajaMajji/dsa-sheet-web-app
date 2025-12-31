import { useEffect, useState } from "react";
import { Paper, Typography, LinearProgress } from "@mui/material";
import { getUserId } from "../utils/auth";

export default function Progress() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function load() {
      const userId = getUserId();
      console.log("userId", userId);

      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/user-progress`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const result = await res.json();
      console.log("result", result);
      setData(result);
    }

    load();
  }, []);

  if (!data) return <div style={{ padding: 30 }}>Loading...</div>;

  return (
    <Paper style={{ padding: 30, margin: 30 }}>
      <Typography variant="h5" gutterBottom>
        Overall Progress
      </Typography>

      <Typography>
        {data.done} / {data.total} completed
      </Typography>

      <LinearProgress
        variant="determinate"
        value={(data.done / data.total) * 100}
        style={{ marginTop: 15, marginBottom: 20 }}
      />

      <Typography variant="h6" gutterBottom>
        Breakdown
      </Typography>

      <Typography>
        Easy: {data.easyDone} / {data.totalEasy}
      </Typography>
      <Typography>
        Medium: {data.mediumDone} / {data.totalMedium}
      </Typography>
      <Typography>
        Hard: {data.hardDone} / {data.totalHard}
      </Typography>
    </Paper>
  );
}

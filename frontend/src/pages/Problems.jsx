import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  Chip,
  Typography,
  Paper,
} from "@mui/material";
import { getUserId } from "../utils/auth";

export default function Problems() {
  const { topicId } = useParams();
  const [problems, setProblems] = useState([]);
  const [checked, setChecked] = useState({});

  useEffect(() => {
    async function load() {
      // Get problems

      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/problems/${topicId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();
      setProblems(data);

      // Get saved progress
      const userId = getUserId();

      const progRes = await fetch(
        `${process.env.REACT_APP_API_URL}/api/progress/${userId}/${topicId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const prog = await progRes.json();

      let map = {};
      prog.forEach((p) => (map[p.problemId] = p.done));

      setChecked(map);
    }

    load();
  }, [topicId]);

  const handleCheck = async (problemId, value) => {
    const userId = getUserId();

    setChecked((prev) => ({ ...prev, [problemId]: value }));

    await fetch(`${process.env.REACT_APP_API_URL}/api/progress/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ userId, problemId, done: value }),
    });
  };

  const color = (d) =>
    d === "Easy" ? "success" : d === "Medium" ? "warning" : "error";

  return (
    <Paper style={{ maxWidth: 900, margin: "40px auto", padding: 20 }}>
      <Typography variant="h5" gutterBottom>
        Problems
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Problem</TableCell>
            <TableCell>Difficulty</TableCell>
            <TableCell>Links</TableCell>
            <TableCell>Done</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {problems.map((p) => (
            <TableRow key={p._id}>
              <TableCell>{p.title}</TableCell>

              <TableCell>
                <Chip label={p.difficulty} color={color(p.difficulty)} />
              </TableCell>

              <TableCell>
                <a href={p.leetcodeLink} target="_blank" rel="noreferrer">
                  LeetCode
                </a>{" "}
                |{" "}
                <a href={p.youtubeLink} target="_blank" rel="noreferrer">
                  YouTube
                </a>{" "}
                |{" "}
                <a href={p.articleLink} target="_blank" rel="noreferrer">
                  Article
                </a>
              </TableCell>

              <TableCell>
                <Checkbox
                  checked={!!checked[p._id]}
                  onChange={(e) => handleCheck(p._id, e.target.checked)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  LinearProgress,
} from "@mui/material";
import { getUserId } from "../utils/auth";

export default function Topics() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/topics")
      .then((res) => res.json())
      .then((data) => setTopics(data));
  }, []);

  useEffect(() => {
    async function load() {
      const res = await fetch("http://localhost:5000/api/topics");
      const data = await res.json();

      const userId = getUserId();

      const enriched = await Promise.all(
        data.map(async (t) => {
          const r = await fetch(
            `http://localhost:5000/api/topic-progress/${userId}/${t._id}`
          );
          const p = await r.json();
          return { ...t, progress: p };
        })
      );

      setTopics(enriched);
    }

    load();
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <Typography variant="h4" gutterBottom>
        DSA Topics
      </Typography>

      <Grid container spacing={3}>
        {topics.map((topic) => (
          <Grid item xs={12} md={4} key={topic._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{topic.name}</Typography>

                <Typography color="text.secondary">
                  {topic.description}
                </Typography>

                <div style={{ marginTop: 15 }}>
                  <LinearProgress
                    variant="determinate"
                    value={
                      topics.length
                        ? (topic.progress?.done / topic.progress?.total) *
                            100 || 0
                        : 0
                    }
                  />

                  <Typography variant="body2">
                    {`${topic.progress?.done || 0} / ${
                      topic.progress?.total || 0
                    } completed`}
                  </Typography>
                </div>

                <Button
                  component={Link}
                  to={`/topics/${topic._id}`}
                  variant="contained"
                  sx={{ marginTop: 2 }}
                >
                  View Problems
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

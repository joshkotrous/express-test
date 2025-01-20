import express from "express";
import { Client } from "pg";

const app = express();
app.use(express.json());

const dbClient = new Client({
  connectionString: process.env.DATABASE_URL,
});
dbClient.connect();

app.post("/search", async (req, res) => {
  const { username } = req.body;

  try {
    // Unsafe query using user-supplied input directly
    const query = `SELECT * FROM users WHERE username = '${username}'`;
    const result = await dbClient.query(query);

    res.json(result.rows);
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));

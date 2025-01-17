import express from "express";
import fs from "fs";
import path from "path";

const app = express();
app.use(express.json());

app.post("/upload", (req, res) => {
  const { filename, content } = req.body;

  // Unsafe file path construction
  const uploadPath = path.join(__dirname, "uploads", filename);

  // Writing the user-supplied content to the file
  fs.writeFile(uploadPath, content, (err) => {
    if (err) {
      console.error("Error writing file:", err);
      res.status(500).send("Server error");
      return;
    }
    res.send("File uploaded successfully");
  });
});

app.listen(3000, () => console.log("Server running on port 3000"));

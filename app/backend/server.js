import express from "express";
import cors from "cors";
import db from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend up");
});

app.post("/api/submit", (req, res) => {
  const { name, message } = req.body;

  if (!name || !message) {
    return res.status(400).json({ error: "Missing fields" });
  }

  db.run(
    "INSERT INTO messages (name, message) VALUES (?, ?)",
    [name, message],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, name, message });
    }
  );
});

app.get("/api/messages", (req, res) => {
  db.all("SELECT * FROM messages", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.listen(3001, () => console.log("Backend running on http://localhost:3001"));

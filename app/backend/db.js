import sqlite3 from "sqlite3";
sqlite3.verbose();

const db = new sqlite3.Database("./app.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      message TEXT NOT NULL
    )
  `);
});

export default db;

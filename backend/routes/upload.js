import express from "express";
import multer from "multer";
import fs from "fs";
import { Client } from "pg";
import csvParser from "csv-parser";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), async (req, res) => {
  const file = req.file;

  const client = new Client({ connectionString: process.env.PG_URI });
  await client.connect();

  const tableName = file.originalname.split(".")[0].toLowerCase();
  const rows = [];

  fs.createReadStream(file.path)
    .pipe(csvParser())
    .on("data", (row) => rows.push(row))
    .on("end", async () => {
      const headers = Object.keys(rows[0]);

      const createTableSQL = `
        CREATE TABLE IF NOT EXISTS ${tableName} (
          ${headers.map((h) => `"${h}" TEXT`).join(",")}
        );
      `;

      await client.query(createTableSQL);

      for (const row of rows) {
        const values = headers.map((h) => `'${row[h]}'`);
        await client.query(`INSERT INTO ${tableName} (${headers.map((h) => `"${h}"`).join(",")}) VALUES (${values.join(",")});`);
      }

      await client.end();
      res.json({ message: "Uploaded successfully", table: tableName });
    });
});

export default router;

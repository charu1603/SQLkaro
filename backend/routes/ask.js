import express from "express";
import runQuery from "../agents/sqlAgent.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { question, table } = req.body;
  try {
    const result = await runQuery(question, table);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to generate SQL");
  }
});

export default router;

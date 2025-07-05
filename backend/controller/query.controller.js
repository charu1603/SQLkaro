import {generateSQL} from '../agents/sqlAgent.js';

export const handleQuery = async(req, res)=>{
    const {question, schema} = req.body;
  try {
    const sql = await generateSQL(question, schema);
    res.json({ sql });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
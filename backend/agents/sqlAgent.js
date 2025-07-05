import pg from 'pg';
import { SqlDatabase } from 'langchain/sql_db';
import { createSqlAgent, SqlToolkit } from 'langchain/agents/toolkits/sql';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { AgentExecutor } from 'langchain/agents';
import * as dotenv from 'dotenv';
const {
  PGUSER,
  PGHOST,
  PGDATABASE,
  PGPASSWORD,
  PGPORT
} = process.env;
dotenv.config();

const runQuery = async (question) => {
  const client = new pg.Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
  });

  await client.connect();

  try {
    const db = await SqlDatabase.fromClient(client);
    const model = new ChatOpenAI({
      modelName: "gpt-3.5-turbo",
      temperature: 0,
    });

    // Create SQL toolkit and agent
    const toolkit = new SqlToolkit(db, model);
    const executor = createSqlAgent(model, toolkit);

    const result = await executor.invoke({
      input: question,
    });

    return result.output;
  } finally {
    await client.end();
  }
};

export default runQuery;
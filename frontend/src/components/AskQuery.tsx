import React, { useState } from "react";
import axios from "axios";
import { type QueryResult } from "../../types";

interface AskQueryProps {
  table: string;
  onResult: (data: QueryResult) => void;
}

const AskQuery: React.FC<AskQueryProps> = ({ table, onResult }) => {
  const [question, setQuestion] = useState("");

  const ask = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/ask", {
        question,
        table,
      });
      onResult(res.data);
    } catch {
      alert("Error processing query ", );
    }
  };

  return (
    <div className="space-y-4 mt-6">
      <textarea
        className="w-full border p-2 rounded"
        rows={3}
        placeholder="Ask your data..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button onClick={ask} className="bg-green-600 text-white px-4 py-2 rounded">
        Ask
      </button>
    </div>
  );
};

export default AskQuery;

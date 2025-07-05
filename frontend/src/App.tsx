import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import AskQuery from "./components/AskQuery";
import ResultBox from "./components/ResultBox";
import { type QueryResult } from "../types";

function App() {
  const [table, setTable] = useState<string | null>(null);
  const [result, setResult] = useState<QueryResult["result"]>([]);
  const [query, setQuery] = useState("");

  const handleResult = (data: QueryResult) => {
    setQuery(data.query);
    setResult(data.result);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">SQLkaro - Natural Language to SQL</h1>
      <FileUpload onUpload={setTable} />
      {table && <AskQuery table={table} onResult={handleResult} />}
      {result && <ResultBox result={result} query={query} />}
    </div>
  );
}

export default App;

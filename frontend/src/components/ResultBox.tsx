import React from "react";
import { type QueryResult } from "../../types";

interface ResultBoxProps {
  result: QueryResult["result"];
  query: string;
}

const ResultBox: React.FC<ResultBoxProps> = ({ result, query }) => {
  if (!result || result.length === 0) return null;

  const headers = Object.keys(result[0]);

  return (
    <div className="mt-6 border p-4 rounded shadow">
      <p className="mb-2 text-gray-700"><strong>Generated SQL:</strong> {query}</p>
      <table className="w-full border">
        <thead>
          <tr>
            {headers.map((key) => (
              <th key={key} className="border px-2 py-1 bg-gray-100">{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {result.map((row, i) => (
            <tr key={i}>
              {headers.map((key) => (
                <td key={key} className="border px-2 py-1">{row[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultBox;

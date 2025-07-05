import type { QueryResult } from '../../types.ts';

interface ResultDisplayProps {
  sql: string;
  data: QueryResult[];
}

export default function ResultDisplay({ sql, data }: ResultDisplayProps) {
  return (
    <div className="p-6 mt-4 bg-gray-100 rounded shadow">
      <h2 className="text-lg font-semibold">Generated SQL</h2>
      <pre className="bg-white p-2 border rounded mt-2">{sql}</pre>

      {data?.length > 0 && (
        <>
          <h2 className="text-lg font-semibold mt-4">Result</h2>
          <table className="w-full text-sm mt-2 border">
            <thead>
              <tr>
                {Object.keys(data[0]).map((col) => (
                  <th key={col} className="border px-2 py-1">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr key={idx}>
                  {Object.values(row).map((val, i) => (
                    <td key={i} className="border px-2 py-1">{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

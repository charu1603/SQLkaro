// src/types.ts
export interface QueryResult {
  query: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  result: Record<string, any>[];
}

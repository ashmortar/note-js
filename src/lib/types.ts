export type Output = {
  output_type: `stream` | `display_data` | `execute_result` | `error`;
  text: string;
};

export type Cell = {
  id: string;
  type: `md` | `ts` | `tsx`;
  execution_count: number;
  metadata: Record<string, unknown>;
  outputs: Output[];
  source: string;
};

export type Notebook = {
  id: string;
  version: number;
  metadata: Record<string, unknown>;
  cells: Cell[];
};

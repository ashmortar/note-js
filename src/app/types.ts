export type Output = {
  output_type: `stream` | `display_data` | `execute_result` | `error`;
  text: string;
};

export type Cell = {
  type: `md` | `ts` | `tsx`;
  execution_count: number;
  metadata: Record<string, unknown>;
  outputs: Output[];
  source: string;
};

export type Notebook = {
  cells: Cell[];
  metadata: Record<string, unknown>;
  version: number;
  id: string;
};

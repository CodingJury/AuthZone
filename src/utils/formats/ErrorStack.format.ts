interface ParsedStack {
  message: string;
  stack: string[];
}

export const parseStack = (error: Error): ParsedStack => {
  const stack = error.stack?.split('\n').map(line => line.trim()) ?? [];
  return {
    message: error.message,
    stack,
  };
};

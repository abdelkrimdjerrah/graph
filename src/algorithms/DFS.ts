declare type Graph = Map<
  number,
  { successeurs: number[]; predecesseurs: number[] }
>;

export const DFS = (graph: Graph, start: number) => {

  if (start == -1 || !graph.size) {
    return [];
  }

  const stack: number[] = [];
  const visited: number[] = [];

  stack.push(start);

  while (stack.length > 0) {
    const currentNode = stack.pop() as number;
    visited.push(currentNode);
    const neighbors = graph.get(currentNode)!.successeurs;
    neighbors?.forEach((neighbor: number) => {
      if (!visited.includes(neighbor)) {
        stack.push(neighbor);
      }
    });
  }

  return visited;
};

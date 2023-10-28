declare type Graph = Map<
  number,
  { successeurs: number[]; predecesseurs: number[] }
>;

export const BFS = (graph: Graph, start: number) => {
  const queue: number[] = [];
  const visited: number[] = [];

  queue.push(start);

  while (queue.length > 0) {
    const currentNode = queue.shift() as number;
    visited.push(currentNode);
    const neighbors = graph.get(currentNode)!.successeurs;
    neighbors?.forEach((neighbor: number) => {
      if (!visited.includes(neighbor)) {
        queue.push(neighbor);
      }
    });
  }

  return visited;
};

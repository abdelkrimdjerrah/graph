declare type Graph = Map<
  number,
  { successeurs: number[]; predecesseurs: number[] }
>;

export const CheckCycle = (graph: Graph) => {
  for (let i = 0; i < graph.size; i++) {
    if (CheckCycleNode(graph, 0)) {
      return true;
    }
  }
  return false;
};

const CheckCycleNode = (graph: Graph, start: number) => {
  const queue: number[] = [];
  const visited: number[] = [];

  queue.push(start);

  let cycle = false;
  while (queue.length > 0 && !cycle) {
    const currentNode = queue.shift() as number;
    visited.push(currentNode);
    const neighbors = graph.get(currentNode)!.successeurs;
    neighbors?.forEach((neighbor: number) => {
      if (!visited.includes(neighbor)) {
        queue.push(neighbor);
      } else {
        cycle = true;
      }
    });
  }

  return cycle;
};

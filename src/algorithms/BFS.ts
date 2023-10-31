declare type Graph = Map<
  number,
  { successeurs: number[]; predecesseurs: number[] }
>;

export const BFS = (graph: Graph, start: number) => {
  if (start == -1  || !graph.size) {
    return [];
  }

  const queue: number[] = [];
  const visited: number[] = [];
  const remaining: number[] = [];
  const result: number[][] = [];


  graph.forEach((node, key) => {
    if (!visited.includes(key)) {
      remaining.push(key);
    }
  });

  

  queue.push(start);

  while(remaining.length > 0){

    const currentGraph: number[] = []

      while (queue.length > 0) {
        const currentNode = queue.shift() as number;
        if (!visited.includes(currentNode)) {
          visited.push(currentNode);
          currentGraph.push(currentNode)
        }
        const neighbors = graph.get(currentNode)!.successeurs;
        neighbors?.forEach((neighbor: number) => {
          if (!visited.includes(neighbor)) {
            queue.push(neighbor);
          }
        });
      }
      if(currentGraph.length > 0){
        result.push(currentGraph)
      }
      queue.push(remaining.pop() as number);

  }
  return result;
};

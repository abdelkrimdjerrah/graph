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
  const remaining: number[] = [];
  const result: number[][] = [];

  graph.forEach((node, key) => {
    if (!visited.includes(key)) {
      remaining.push(key);
    }
  });

  stack.push(start);
  while(remaining.length > 0){

    const currentGraph: number[] = []
    
    while (stack.length > 0) {
      const currentNode = stack.pop() as number;
      if (!visited.includes(currentNode)) {
        visited.push(currentNode);
        currentGraph.push(currentNode)
      }
      const neighbors = graph.get(currentNode)!.successeurs;
      neighbors?.forEach((neighbor: number) => {
        if (!visited.includes(neighbor)) {
          stack.push(neighbor);
        }
      });
    }
    if(currentGraph.length > 0){
      result.push(currentGraph)
    }
    stack.push(remaining.pop() as number);
  }


  return result;
};


declare type Graph = {
    successeurs: number[];
    predecesseurs: number[];
}[];

export const BFS = (graph: Graph, start: number) => {

  const queue: number[] = [];
  const visited: number[] = [];

  queue.push(start);

  while (queue.length > 0) {
      const currentNode = queue.shift() as number;
      if (!visited.includes(currentNode)) {
          visited.push(currentNode);
      }
      const neighbors = graph[currentNode].successeurs;
      if(neighbors.length === 0) {
          continue;
      }
      neighbors.forEach((neighbor:number) => {
          if (!visited.includes(neighbor)) {
              queue.push(neighbor);
          }
      });
  }

  return visited;

};

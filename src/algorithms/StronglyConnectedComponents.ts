declare type Graph = Map<
  number,
  { successeurs: number[]; predecesseurs: number[] }
>;

const path = (
  graph: Graph,
  node: number,
  target: number,
  visited: number[] = []
) => {
  if (node === target) {
    return true;
  }

  visited.push(node);

  const nodeSuccesseurs = graph.get(node)?.successeurs;

  if (nodeSuccesseurs) {
      for (const successeur of nodeSuccesseurs) {
        
      if (!visited.includes(successeur)) {
        if (path(graph, successeur, target, visited)) {
          return true;
        }
      }
    }
  }

  return false;
};

export const StronglyConnectedComponents = (graph: Graph) => {
  const result: number[][] = [];

  const nodes: any = [];

  graph.forEach((value, key) => {
    nodes.push(key);
  });

  while (nodes.length > 0) {
    let temp: number[] = [nodes.shift()];
    let component: number[] = [temp[0]];

    while (temp.length) {
      const current: number = temp.shift() as number;

      for (const node of nodes) {
        if(node !== current){
            if (path(graph, node, current) && path(graph, current, node)) {
              component.push(node);
              temp.push(node);
              nodes.splice(nodes.indexOf(node), 1);
            }
        }
      }
    }
    result.push(component);
  }

  return result;
};

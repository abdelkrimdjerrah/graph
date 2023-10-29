declare type Graph = Map<
  number,
  { successeurs: number[]; predecesseurs: number[] }
>;

const DeleteNode = (graph: Graph, nodeDeleted: number) => {
  graph.delete(nodeDeleted);

  graph.forEach((node) => {
    node.predecesseurs = node.predecesseurs.filter(
      (predecesseur) => predecesseur !== nodeDeleted
    );
  });

  return graph;
};

const findingRoots = (graph: Graph) => {
  const roots: number[] = [];

  graph.forEach((node, key) => {
    if (node.predecesseurs.length === 0) {
      roots.push(key);
    }
  });

  return roots;
};

const deepCopyGraph = (graph: Graph) => {
    const newGraph:Graph = new Map();
  
    graph.forEach((value, key) => {
      newGraph.set(key, {
        successeurs: [...value.successeurs],
        predecesseurs: [...value.predecesseurs],
      });
    });
  
    return newGraph;
  };

export const TopologicalStorting = (graph: Graph) => {

  const graphCopy = deepCopyGraph(graph)
  if (!graphCopy.size) {
    return [];
  }

  const result: number[][] = [];
  let roots: number[] = findingRoots(graphCopy);

  while (roots.length) {
    result.push(roots);
    roots.forEach((root) => {
      DeleteNode(graphCopy, root);
    });
    //next iteration
    roots = findingRoots(graphCopy);
  }

  return result;
};





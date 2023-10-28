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

export const TopologicalStorting = (graph: Graph) => {
  if (!graph.size) {
    return [];
  }

  const result: number[][] = [];
  let roots: number[] = findingRoots(graph);

  while (roots.length) {
    result.push(roots);
    roots.forEach((root) => {
      DeleteNode(graph, root);
    });
    //next iteration
    roots = findingRoots(graph);
  }

  return result;
};

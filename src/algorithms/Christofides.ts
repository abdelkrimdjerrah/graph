declare type Graph = {
    nodes: { id: number; label: string }[];
    edges: { from: number; to: number; label: string; currentFlow:number; maxFlow:number, color:string }[];
  }

  const minimumSpanningTree = (graph: Graph): Graph => {
    const copyGraph: Graph = JSON.parse(JSON.stringify(graph));
    const nodes = copyGraph.nodes;
    const edges = copyGraph.edges;
  
    const mst: Graph = { nodes: [], edges: [] };
    const visited = new Set<number>();
  
    if (nodes.length === 0 || edges.length === 0) return mst;
  
    visited.add(nodes[0].id); // Start with the first node
    mst.nodes.push(nodes[0]);
  
    while (visited.size !== nodes.length) {
      let minEdge: any | undefined = undefined;
      for (const edge of edges) {
        if (
          (visited.has(edge.from) && !visited.has(edge.to)) ||
          (!visited.has(edge.from) && visited.has(edge.to))
        ) {
          if (!minEdge || edge.maxFlow < minEdge.maxFlow) {
            minEdge = edge;
          }
        }
      }
  
      if (minEdge) {
        const nextNode = visited.has(minEdge.from) ? minEdge.to : minEdge.from;
        visited.add(nextNode);
        mst.nodes.push(nodes.find((node) => node.id === nextNode)!);
        mst.edges.push(minEdge);
      }
    }
  
    return mst;
  };

  const findOddDegreeVertices = (mst: Graph): number[] => {
    const degreeMap: { [key: number]: number } = {}; // Store degrees of each node
  
    // Calculate degrees of nodes
    for (const edge of mst.edges) {
      degreeMap[edge.from] = (degreeMap[edge.from] || 0) + 1;
      degreeMap[edge.to] = (degreeMap[edge.to] || 0) + 1;
    }
  
    const oddDegreeVertices: number[] = [];
    for (const nodeId in degreeMap) {
      if (degreeMap[nodeId] % 2 !== 0) {
        oddDegreeVertices.push(parseInt(nodeId));
      }
    }
  
    return oddDegreeVertices;
  };

  const minimumWeightPerfectMatching = (graph: Graph, oddVertices: number[]): any => {
    const matchedVertices = new Set<number>();
    const matchingEdges: any = [];
  
    for (const vertex of oddVertices) {
      if (!matchedVertices.has(vertex)) {
        let minEdge: any | undefined = undefined;
        for (const edge of graph.edges) {
          if ((edge.from === vertex || edge.to === vertex) && !matchedVertices.has(edge.from) && !matchedVertices.has(edge.to)) {
            if (!minEdge || parseInt(edge.label) < parseInt(minEdge.label)) {
              minEdge = edge;
            }
          }
        }
        if (minEdge) {
          matchedVertices.add(vertex);
          matchedVertices.add(minEdge.from === vertex ? minEdge.to : minEdge.from);
          matchingEdges.push(minEdge);
        }
      }
    }
  
    return matchingEdges;
  };
  

  const combineGraph = (mstEdges: any, matchingEdges: any): Graph => {
    const combinedEdges = [...mstEdges, ...matchingEdges]; // Merge MST edges and matching edges
    const uniqueNodes = new Set<number>();
  
    for (const edge of combinedEdges) {
      uniqueNodes.add(edge.from);
      uniqueNodes.add(edge.to);
    }
  
    const nodes: any = Array.from(uniqueNodes).map((id) => ({ id, label: `Node ${id}` }));
  
    return { nodes, edges: combinedEdges };
  };



  const findEulerianTour = (graph: Graph): any => {
    const eulerianTour: any = [];
    const visitedEdges: boolean[] = new Array(graph.edges.length).fill(false);
  
    const dfs = (node: number) => {
      for (let i = 0; i < graph.edges.length; i++) {
        if (!visitedEdges[i] && (graph.edges[i].from === node || graph.edges[i].to === node)) {
          const nextNode = graph.edges[i].from === node ? graph.edges[i].to : graph.edges[i].from;
          visitedEdges[i] = true;
          dfs(nextNode);
          eulerianTour.push(graph.edges[i]);
        }
      }
    };
  
    dfs(graph.edges[0].from); // Start DFS from any node
    return eulerianTour;
  };


  const shortcutEulerianTour = (eulerianTour: any): any => {
    let tspTour: any = [];
    const visitedNodes: Set<number> = new Set();
  
    for (const edge of eulerianTour) {
      if (!visitedNodes.has(edge.from)) {
        tspTour.push(edge);
        visitedNodes.add(edge.from);
      }
    }

    for (const edge of eulerianTour) {
      if (!visitedNodes.has(edge.to)) {
        tspTour.push(edge);
        visitedNodes.add(edge.to);
      }
    }

    tspTour = tspTour.filter((edge: any, index: number) => {
        const firstIndex = tspTour.findIndex((e: any) => e.from === edge.from && e.to === edge.to);
        return firstIndex === index;
        });
  
    return tspTour;
  };

export const Christofides = (graph: Graph) => {

    
    const copyGraph:Graph = JSON.parse(JSON.stringify(graph));

    const mst = minimumSpanningTree(copyGraph);
    const oddVertices = findOddDegreeVertices(mst);
    const perfectMatching = minimumWeightPerfectMatching(copyGraph, oddVertices);
    const combinedGraph = combineGraph(mst.edges, perfectMatching);
    const eulerianTour = findEulerianTour(combinedGraph);
    const tspTour = shortcutEulerianTour(eulerianTour);


    console.log(tspTour)
    return {graph: copyGraph, tspTour}
 
    }



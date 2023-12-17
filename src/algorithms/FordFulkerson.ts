declare type Graph = {
    nodes: { id: number; label: string }[];
    edges: { from: number; to: number; label: string; currentFlow:number; maxFlow:number }[];
  }

const getResidualGraph = (graph: Graph) => {
    const residualGraph: Graph = { nodes: [...graph.nodes], edges: [] };

    graph.edges.forEach((edge) => {
        const residualEdge = {
            from: edge.to,
            to: edge.from,
            label: edge.label,
            currentFlow: edge.maxFlow,
            maxFlow: edge.maxFlow
        };
        residualGraph.edges.push(residualEdge);
    });

    return residualGraph;
  }

const findPaths= (graph: Graph, start: number, end: number) => {
    const visited: number[] = [];
    const paths: number[][] = [];
  
    const DFS = (graph: Graph, start: number, end: number, path: number[]) => {
        if (start === end) {
          path.push(start);
          if(!paths.includes(path)){
              paths.push(path)
          }
          return;
        }
        visited.push(start);
        path.push(start);
        const neighbors = graph.edges
          .filter((edge) => edge.from === start)
          .map((edge) => edge.to);
        neighbors.forEach((neighbor) => {
            DFS(graph, neighbor, end, [...path]);
        });
      }
    
      DFS(graph, start, end, []);

        return paths;
  }

const getPathFlow = (graph: Graph, path: number[]) => {
    const pathFlow : number[]= [];

    for (let i = 0; i < path.length - 1; i++) {
      const edge = graph.edges.find(
        (edge) => edge.from === Number(path[i]) && edge.to === Number(path[i + 1])
      );
      if(edge)
      pathFlow.push(edge.maxFlow - edge.currentFlow);
    }

    return Math.min(...pathFlow);
  }

const augementPathFlow = (graph: Graph, residual: Graph, path: number[], augementation:number) => {
    

    const reversePath = [...path].reverse()

    for (let i = 0; i < path.length - 1; i++) {
      graph.edges.map(
        (edge) => {
            if(edge.from === Number(path[i]) && edge.to === Number(path[i + 1])){
                if((edge.currentFlow + augementation) <= edge.maxFlow){
                    edge.currentFlow += augementation 
                    edge.label = `${edge.currentFlow}/${edge.maxFlow}`
                }
            }
        }
      );
      
    }

    for (let i = 0; i < reversePath.length - 1; i++) {
        residual.edges.map(
          (edge) => {
              if(edge.from === Number(reversePath[i]) && edge.to === Number(reversePath[i + 1])){
                  if((edge.currentFlow - augementation) >= 0){
                      edge.currentFlow -= augementation 
                      edge.label = `${edge.currentFlow}/${edge.maxFlow}`
                  }
              }
          }
        );
        
      }
    

  }

const updateResidualGraph = (graph: Graph, path: string[], pathFlow: number) => {
    for (let i = 0; i < path.length - 1; i++) {
      const edge = graph.edges.find(
        (edge) => edge.from === Number(path[i]) && edge.to === Number(path[i + 1])
      );
      if (edge) {
        edge.currentFlow += pathFlow;
      }
    }
  }

  const getMaxFlow = (graph: Graph, start:number) => {
    const neighbors = graph.edges.filter((edge) => edge.from === start);
    const maxFlow = neighbors.reduce((acc, neighbor) => {
      return acc + neighbor.currentFlow;
    }, 0);
    return maxFlow;
  }

export const FordFulkerson = (graph: Graph, start: number, end: number) => {

    
    const copyGraph:Graph = JSON.parse(JSON.stringify(graph));

    const residualGraph = getResidualGraph(copyGraph);

    const paths = findPaths(copyGraph, start, end)
    
    paths.forEach((path:number[]) => {
        const pathFlow = getPathFlow(copyGraph,path)
        augementPathFlow(copyGraph, residualGraph, path,pathFlow)
    })



    return {graph: copyGraph , residualGraph: residualGraph , maxFlow: getMaxFlow(copyGraph,start)}
 
    // const residualGraph = getResidualGraph(graph);
    // const path = findPath(residualGraph, source, sink);
    
    // while (path.length > 0) {
    //     const pathFlow = getPathFlow(residualGraph, path);
    //     updateResidualGraph(residualGraph, path, pathFlow);
    // }
    
    // return getMaxFlow(residualGraph);
    }

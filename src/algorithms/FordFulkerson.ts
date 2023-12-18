declare type Graph = {
    nodes: { id: number; label: string }[];
    edges: { from: number; to: number; label: string; currentFlow:number; maxFlow:number, color:string }[];
  }

const getResidualGraph = (graph: Graph) => {
    const residualGraph: Graph = { nodes: [...graph.nodes], edges: [] };

    graph.edges.forEach((edge) => {
        const residualEdge = {
            from: edge.to,
            to: edge.from,
            label: edge.label,
            currentFlow: edge.maxFlow,
            maxFlow: edge.maxFlow,
            color: 'yellow',
        };
        residualGraph.edges.push(edge);
        residualGraph.edges.push(residualEdge);
    });

    return residualGraph;
  }

const findPaths= (graph: Graph, start: number, end: number) => {

    const paths: number[][] = [];
  
    const DFS = (graph: Graph, start: number, end: number, path: number[], visited: number[]) => {
        if (start === end) {
            path.push(start);
            paths.push([...path]); // Push a copy of the path to avoid mutation
            return;
        }
    
        visited.push(start);
        path.push(start);
        const neighbors = graph.edges
            .filter((edge) => edge.from === start)
            .map((edge) => edge.to);
    
        neighbors.forEach((neighbor) => {
            if (!visited.includes(neighbor)) {
                DFS(graph, neighbor, end, [...path], visited.slice()); // Pass a copy of visited
            }
        });
    }
      DFS(graph, start, end, [], []);

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

const augementPathFlow = (residual: Graph, path: number[], augementation:number) => {
    

    
    for (let i = 0; i < path.length - 1; i++) {
        residual.edges.map(
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
    
    const reversePath = [...path].reverse()

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


  const getMaxFlow = (graph: Graph, start:number) => {
    const neighbors = graph.edges.filter((edge) => edge.from === start);
    const maxFlow = neighbors.reduce((acc, neighbor) => {
      return acc + neighbor.currentFlow;
    }, 0);
    return maxFlow;
  }

    const getMaximumPath = (graph: Graph, paths: number[][]) => {
       
        let maxPath: number[] = paths[0]
        let maxFlow = 0
        paths.forEach((path) => {
            const pathFlow = getPathFlow(graph, path)
            if(pathFlow > maxFlow){
                maxFlow = pathFlow
                maxPath = path
            }
        })

        return maxPath

    }
export const FordFulkerson = (graph: Graph, start: number, end: number) => {

    
    const copyGraph:Graph = JSON.parse(JSON.stringify(graph));

    const residualGraph = getResidualGraph(copyGraph);

    
    
    let maxFlowStop = false
    
    while(!maxFlowStop){

        const paths = findPaths(residualGraph, start, end)
        const maxFlow =  getMaxFlow(residualGraph,start)

        while(paths.length > 0){
            
            maxFlowStop = true;
    
    
            const path = getMaximumPath(residualGraph, paths)
            const pathFlow = getPathFlow(residualGraph, path)


            augementPathFlow(residualGraph, path, pathFlow)

            paths.pop()
    
            
        }

        if(maxFlow !== getMaxFlow(residualGraph,start)){
            maxFlowStop = false
        }

    }
    
    

    return {graph: copyGraph , residualGraph: residualGraph , maxFlow: getMaxFlow(copyGraph,start)}
 
    }

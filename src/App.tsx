import Graph from "react-vis-network-graph";
import Operations from "./components/Operations";
import { useEffect, useState } from "react";
import Stats from "./components/Stats";
import { FordFulkerson } from "./algorithms/FordFulkerson";

const graphInitialData = {
  nodes: [
    { id: 1, label: "1" },
    { id: 2, label: "2" },
    { id: 3, label: "3" },
    { id: 4, label: "4" },
    { id: 5, label: "5" },
    { id: 6, label: "6" },
  ],
  edges: [
    { from: 1, to: 2, label: "2", currentFlow:0, maxFlow:2 },
    { from: 1, to: 3, label: "6", currentFlow:0, maxFlow:6 },
    { from: 1, to: 4, label: "1", currentFlow:0, maxFlow:1 },
    { from: 2, to: 3, label: "3", currentFlow:0, maxFlow:3 },
    { from: 2, to: 5, label: "7", currentFlow:0, maxFlow:7 },
    { from: 3, to: 5, label: "3", currentFlow:0, maxFlow:3 },
    { from: 3, to: 6, label: "5", currentFlow:0, maxFlow:5 },
    { from: 4, to: 3, label: "2", currentFlow:0, maxFlow:2 },
    { from: 4, to: 5, label: "6", currentFlow:0, maxFlow:6 },
    { from: 5, to: 2, label: "3", currentFlow:0, maxFlow:3 },
    { from: 5, to: 6, label: "4", currentFlow:0, maxFlow:4 },
  ],
};




  export default function App() {


  const [graphState, setGraphState] = useState<{
    nodes: { id: number; label: string }[];
    edges: { from: number; to: number; label: string, currentFlow:number, maxFlow:number, color:string }[];
  }>({ nodes: [], edges: [] });



  const graphOriented: Map<number, { successeurs: number[]; predecesseurs: number[] }> = new Map();
  const graphNonOriented: Map<number, { neighbors: number[] }> = new Map();

  const usedNodes = new Set<number>();

  for (const edge of graphState.edges) {
    
    if (!graphOriented.has(edge.from)) {
      graphOriented.set(edge.from, {
        successeurs: [],
        predecesseurs: [],
      });
    }
    
    if (!graphOriented.has(edge.to)) {
      graphOriented.set(edge.to, {
        successeurs: [],
        predecesseurs: [],
      });
    }

    
    graphOriented.get(edge.from)!.successeurs.push(edge.to);
    graphOriented.get(edge.to)!.predecesseurs.push(edge.from);
    
    usedNodes.add(edge.from);
    usedNodes.add(edge.to);


    //non oriented
    if (!graphNonOriented.has(edge.from)) {
      graphNonOriented.set(edge.from, {
        neighbors: [],
      });
    }
    
    if (!graphNonOriented.has(edge.to)) {
      graphNonOriented.set(edge.to, {
        neighbors: [],
      });
    }
      graphNonOriented.get(edge.from)!.neighbors.push(edge.to);
      graphNonOriented.get(edge.to)!.neighbors.push(edge.from);

}

for(const node of graphState.nodes) {
  if(!usedNodes.has(node.id)) {
    graphOriented.set(node.id, {
      successeurs: [],
      predecesseurs: [],
    });
    //non oriented
    graphNonOriented.set(node.id, {
      neighbors: [],
    });
  }
}


  useEffect(() => {

    setGraphState(
      {
        nodes: [...graphInitialData.nodes],
        edges: [
          ...graphInitialData.edges.map((edge) => {
            return {
              ...edge,
              color: "#ffffff",
              label: `${edge.currentFlow}/${edge.maxFlow}`,
            };
          }),
        ],
      }
    );
  }, []);


  const handleNodeSelect = (event:any) => {
    const selectedNodeId = event.detail.nodes[0];
  
    setGraphState({
      ...graphState,
      nodes: graphState.nodes.map((node) => {
        if (node.id === selectedNodeId) {
          return {
            ...node,
            color: "#ffffff", // change the color of the selected node to white
          };
        }
  
        return node;
      }),
    });
  }

    
  var options = {
    nodes: {
      size: 40,
      shape: "circle",
      color: {
        background: "#4B5563",
        border: "#4B5563",
      },
      font: { color: "white" },
    },
    edges: {
      arrows: 'none',
      color: "white",
      shadow: true,
      smooth: {
        enabled: true,
      },
      
    },
    height: "100%",



    // layout: {
    //   hierarchical: {
    //     enabled: true
    //   }
    // }
  };


  return (
    <div className="bg-zinc-950 h-screen">
      <Graph graph={graphState} options={options} />
      <Operations
        graphState={graphState}
        setGraphState={setGraphState}
        graph={graphOriented}
      />
      <Stats
        graphState={graphState}
        setGraphState={setGraphState}
        graph={graphOriented}
      />
    </div>
  );
}

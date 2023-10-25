import Graph from "react-vis-network-graph";
import Stats from "./components/Stats";
import { useEffect, useState } from "react";

const graphInitialData = {
  nodes: [ //sommets
    { id: 0, label: "Node 0", shape: "circle" },
    { id: 1, label: "Node 1", shape: "circle" },
    { id: 2, label: "Node 2", shape: "circle" },
    { id: 3, label: "Node 3", shape: "circle" },
    { id: 4, label: "Node 4", shape: "circle" },
  ],
  edges: [ //arcs 
    { from: 0, to: 1, label:'10' },
    { from: 0, to: 2, label:'10' },
    { from: 2, to: 3, label:'10' },
    { from: 3, to: 0, label:'10' },
    { from: 3, to: 4, label:'10' },
  ]
};

export default function App() {

  const [graphState, setGraphState] = useState<{nodes:{id:number,label:string, shape:string}[],edges:{from:number, to:number, label:string}[]}>({nodes:[],edges:[]});
  
  const graph: any = {};

  for (const edge of graphInitialData.edges) {
    if (!graph[edge.from]) {
      graph[edge.from] = {
        successeurs: [],
        predecesseurs: [],
      };
    }

    if (!graph[edge.to]) {
      graph[edge.to] = {
        successeurs: [],
        predecesseurs: [],
      };
    }

    graph[edge.from].successeurs.push(edge.to);
    graph[edge.to].predecesseurs.push(edge.from);
}
  
  useEffect(()=>{
    setGraphState(graphInitialData)    
  },[])

  
  var options = {
    nodes: {
      size: 40,
      color: {
        background: "#4B5563",
      },
      font: { color: "white" },
    },
    edges: {
      color: "white",
      shadow: true,
      smooth: true,
    },
    height: "900px",
  };


  return (
    <div className="bg-zinc-950">
      <Graph graph={graphState} options={options} />
      <Stats graphState={graphState} setGraphState={setGraphState} graph={graph}/> 
    </div>
  );
}

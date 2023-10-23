import Graph from "react-vis-network-graph";
import Stats from "./components/Stats";
import { useEffect, useState } from "react";

export default function App() {

  const [graph, setGraph] = useState<{nodes:{id:number,label:string, shape:string}[],edges:{from:number, to:number, label:string}[]}>({nodes:[],edges:[]});

  const graphInitialData = {
    nodes: [ //sommets
      { id: 1, label: "Node 1", shape: "circle" },
      { id: 2, label: "Node 2", shape: "circle" },
      { id: 3, label: "Node 3", shape: "circle" },
      { id: 4, label: "Node 4", shape: "circle" },
      { id: 5, label: "Node 5", shape: "circle" },
      { id: 6, label: "Node 6", shape: "circle" },
      { id: 7, label: "Node 7", shape: "circle" },
      { id: 8, label: "Node 8", shape: "circle" },
      { id: 9, label: "Node 9", shape: "circle" },
    ],
    edges: [ //arcs 
      { from: 1, to: 2, label:'10' },
      { from: 1, to: 3, label:'23' },
      { from: 2, to: 4, label:'4' },
      { from: 2, to: 5, label:'21' },
      { from: 3, to: 6, label:'77' },
      { from: 3, to: 7, label:'65' },
      { from: 4, to: 8, label:'74' },
      { from: 4, to: 9, label:'13' },
    ]
  };

  
  useEffect(()=>{
    setGraph(graphInitialData)    
  },[])

  
  
  var options = {
    nodes: {
      size: 40,
      color: {
        border: "#222222",
        background: "#666666",
      },
      font: { color: "yellow" },
    },
    edges: {
      color: "yellow",
      shadow: true,
      smooth: true,
    },
    height: "900px",
  };
  return (
    <div className="bg-zinc-950">
      <Stats graph={graph} setGraph={setGraph}/>
      <Graph graph={graph} options={options} />
    </div>
  );
}

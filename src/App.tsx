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
    { from: 3, to: 4, label:'10' },
  ]
};



export default function App() {

  const [graph, setGraph] = useState<{nodes:{id:number,label:string, shape:string}[],edges:{from:number, to:number, label:string}[]}>({nodes:[],edges:[]});
  
  const graphStructure:any = Array(9).fill({
    successeurs: [],
    predecesseurs: [],
  });

  for (const edge of graph.edges) {
    graphStructure[edge.from].successeurs.push(edge.to);
    graphStructure[edge.to].predecesseurs.push(edge.from);
  }

  console.log(graphStructure)



  
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
      <Graph graph={graph} options={options} />
      <Stats graph={graph} setGraph={setGraph} graphStructure={graphStructure}/> 
    </div>
  );
}

import React, { useState } from "react";
import Button from "./Button";
import Select from "./Select";
import { BFS } from "../algorithms/BFS";
import { DFS } from "../algorithms/DFS";
import { TopologicalStorting } from "../algorithms/TopologicalStorting"
import { CheckCycle } from "../algorithms/CheckCycle";

declare type nodeType = { id: number; label: string; };
declare type edgeType = { from: number; to: number; label: string };

interface IStats {
  graphState: {
    nodes: nodeType[];
    edges: edgeType[];
  };
  setGraphState: React.Dispatch<
    React.SetStateAction<{ nodes: nodeType[]; edges: edgeType[] }>
  >;
  graph: Map<number, { successeurs: number[]; predecesseurs: number[] }>;
}



const Stats = ({ graphState, setGraphState, graph }: IStats) => {

  const [error, setError] = useState("");
  const [resultBfs, setResultBfs] = useState<number[]>([]);
  const [resultDfs, setResultDfs] = useState<number[]>([]);
  const [resultTopologicalSorting, setResultTopologicalSorting] = useState<number[][]>([]);

  const [nodeStartBfs, setNodeStartBfs] = useState<{
    id: number;
    label: string;
  }>({ id: -1, label: "" });
  const [nodeStartDfs, setNodeStartDfs] = useState<{
    id: number;
    label: string;
  }>({ id: -1, label: "" });


  const applyBFS = () => {
    setError("");
    setResultBfs(BFS(graph, nodeStartBfs.id));
  }

  const applyDFS = () => {  
    setError("");
    setResultDfs(DFS(graph, nodeStartDfs.id));
  }

  const applyTopologicalSorting = () => {
    setError("");
    if(CheckCycle(graph)) {
      setError("There is a cycle!");
      return;
    }
    setResultTopologicalSorting(TopologicalStorting(graph));
  }



  return (
    <div className="text-white z-10 absolute top-5 right-5 flex flex-col gap-5">
      {error ? (
        <p className="text-red-500 font-medium text-lg ">{error}</p>
      ) : null}
      <div className="flex flex-col gap-2">
        <div className="text-gray-300 font-semibold">BFS:</div>
        <Select
          items={graphState.nodes}
          placeholder="Node depart"
          defaultValue={nodeStartBfs}
          setSelectedOption={setNodeStartBfs}
          selectedOption={nodeStartBfs}
        />
        <p>{resultBfs.join(' |-> ')}</p>
        <Button
          widthFull
          onClick={() => {applyBFS()}}
        >
          Apply BFS
        </Button>
      </div>
      <hr />
      <div className="flex flex-col gap-2">
        <div className="text-gray-300 font-semibold">DFS:</div>
        <Select
          items={graphState.nodes}
          placeholder="Node depart"
          defaultValue={nodeStartDfs}
          setSelectedOption={setNodeStartDfs}
          selectedOption={nodeStartDfs}
        />
        <p>{resultDfs.join(' |-> ')}</p>
        <Button widthFull onClick={() => {applyDFS()}}>
          Apply DFS
        </Button>
      </div>
      <hr />
      <div className="flex flex-col gap-2">
        <div className="text-gray-300 font-semibold">Topological Sorting:</div>
        <p>{resultTopologicalSorting.join(' |->')}</p>
        <Button widthFull onClick={() => {applyTopologicalSorting()}}>
          Apply Sorting
        </Button>
      </div>
    </div>
  );
};

export default Stats;

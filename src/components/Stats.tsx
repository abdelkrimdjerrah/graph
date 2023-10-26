import React, { useState } from "react";
import Button from "./Button";
import Select from "./Select";
import { BFS } from "../algorithms/BFS";
import { checkCycle } from "../algorithms/checkCycle";

declare type nodeType = { id: number; label: string; shape: string };
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
  const [nodeStartBfs, setNodeStartBfs] = useState<{
    id: number;
    label: string;
    shape: string;
  }>({ id: -1, label: "", shape: "" });
  const [nodeStartDfs, setNodeStartDfs] = useState<{
    id: number;
    label: string;
    shape: string;
  }>({ id: -1, label: "", shape: "" });

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
        <Button
          widthFull
          onClick={() => {
            console.log(BFS(graph, nodeStartBfs.id));
          }}
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
        <Button widthFull onClick={() => {}}>
          Apply DFS
        </Button>
      </div>
    </div>
  );
};

export default Stats;

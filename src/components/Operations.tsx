import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import Select from "./Select";

declare type nodeType = { id: number; label: string; };
declare type edgeType = { from: number; to: number; label: string, currentFlow:number, maxFlow:number, color:string };

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

const Operations = ({ graphState, setGraphState, graph }: IStats) => {
  const [error, setError] = useState("");
  const [nodeAdd, setNodeAdd] = useState("");
  const [valueArc, setValueArc] = useState("");
  const [optionSelectDeleteNode, setOptionSelectDeleteNode] = useState<{
    id: number;
    label: string;
  }>({ id: -1, label: "" });
  const [optionSelectDepartAdd, setOptionSelectDepartAdd] = useState<{
    id: number;
    label: string;
  }>({ id: -1, label: "" });
  const [optionSelectDestinationAdd, setOptionSelectDestinationAdd] = useState<{
    id: number;
    label: string;
  }>({ id: -1, label: "" });
  const [optionSelectDepartDelete, setOptionSelectDepartDelete] = useState<{
    id: number;
    label: string;
  }>({ id: -1, label: "" });
  const [optionSelectDestinationDelete, setOptionSelectDestinationDelete] =
    useState<{ id: number; label: string; }>({
      id: -1,
      label: "",
    });

  const handleAddNode = () => {
    if (nodeAdd) {
      setGraphState((prev) => ({
        ...prev,
        nodes: [
          ...prev.nodes,
          { id: prev.nodes.length, label: nodeAdd },
        ],
      }));
      setError("");
      setNodeAdd("");
    } else {
      setError("Field is empty");
    }
  };

  const handleDeleteNode = () => {
    if (optionSelectDeleteNode) {
      setGraphState((prev) => ({
        ...prev,
        nodes: prev.nodes.filter(
          (node) => node.id !== optionSelectDeleteNode.id
        ),
        edges: prev.edges.filter(
          (edge) =>
            edge.from !== optionSelectDeleteNode.id &&
            edge.to !== optionSelectDeleteNode.id
        ),
      }));
      setError("");
    } else {
      setError("Field is empty");
    }
  };

  const handleAddEdge = () => {
    if (optionSelectDepartAdd && optionSelectDestinationAdd && valueArc) {
      // Check if the edge already exists.
      const dejaExiste = graphState.edges.filter((edge: edgeType) => {
        return (
          edge.from === optionSelectDepartAdd.id &&
          edge.to === optionSelectDestinationAdd.id
        );
      });
      if (dejaExiste.length) {
        setError("Graph doit etre simple");
      } else {
        setGraphState((prev) => ({
          ...prev,
          edges: [
            ...prev.edges,
            {
              from: optionSelectDepartAdd.id,
              to: optionSelectDestinationAdd.id,
              label: valueArc,
              currentFlow: 0,
              maxFlow: 0,
              color: "#ffffff",
            },
          ],
        }));
        setError("");
        setOptionSelectDepartAdd({ id: -1, label: "" });
        setOptionSelectDestinationAdd({ id: -1, label: "" });
      }
    } else {
      setError("Field is empty");
    }
  };

  const handleDeleteEdge = () => {
    if (optionSelectDepartDelete && optionSelectDestinationDelete) {
      setGraphState((prev) => ({
        ...prev,
        edges: prev.edges.filter(
          (edge) =>
            edge.from !== optionSelectDepartDelete.id ||
            edge.to !== optionSelectDestinationDelete.id
        ),
      }));
      setError("");
      setOptionSelectDepartDelete({ id: -1, label: "" });
      setOptionSelectDestinationDelete({ id: -1, label: "" });
    } else {
      setError("Field is empty");
    }
  };

  return (
    <div className="text-white z-10 absolute top-5 left-5 flex flex-col gap-5">
      {error ? (
        <p className="text-red-500 font-medium text-lg ">{error}</p>
      ) : null}
      <div className="flex flex-col gap-2">
        <div className="text-gray-300 font-semibold">Add Node:</div>
        <Input
          text="Name of node"
          type="text"
          widthFull
          onChange={(v) => setNodeAdd(v)}
          value={nodeAdd}
          className="py-2 text-xs w-[250px] bg-white text-black pr-8"
        />
        <Button widthFull onClick={handleAddNode}>
          Add Node
        </Button>
      </div>
      <hr />
      <div className="flex flex-col gap-2">
        <div className="text-gray-300 font-semibold">Delete Node:</div>
        <Select
          items={graphState.nodes}
          placeholder="Delete Node"
          defaultValue={optionSelectDeleteNode}
          setSelectedOption={setOptionSelectDeleteNode}
          selectedOption={optionSelectDeleteNode}
        />
        <Button widthFull onClick={handleDeleteNode}>
          Delete Node
        </Button>
      </div>
      <hr />
      <div className="flex flex-col gap-2">
        <div className="text-gray-300 font-semibold">Add Arc:</div>
        <div className="flex flex-col gap-2">
          <Select
            items={graphState.nodes}
            placeholder="Node depart"
            defaultValue={optionSelectDepartAdd}
            setSelectedOption={setOptionSelectDepartAdd}
            selectedOption={optionSelectDepartAdd}
          />
          <Select
            items={graphState.nodes}
            placeholder="Node destination"
            defaultValue={optionSelectDestinationAdd}
            setSelectedOption={setOptionSelectDestinationAdd}
            selectedOption={optionSelectDestinationAdd}
          />
          <Input
            text="Value of edge"
            type="text"
            widthFull
            onChange={(v) => setValueArc(v)}
            value={valueArc}
            className="py-2 text-xs w-[250px] bg-white text-black pr-8"
          />
        </div>
        <Button widthFull onClick={handleAddEdge}>
          Add Arc
        </Button>
      </div>
      <hr />
      <div className="flex flex-col gap-2">
        <div className="text-gray-300 font-semibold">Delete Arc:</div>
        <Select
          items={graphState.nodes}
          placeholder="Node depart"
          defaultValue={optionSelectDepartDelete}
          setSelectedOption={setOptionSelectDepartDelete}
          selectedOption={optionSelectDepartDelete}
        />
        <Select
          items={graphState.nodes}
          placeholder="Node destination"
          defaultValue={optionSelectDestinationDelete}
          setSelectedOption={setOptionSelectDestinationDelete}
          selectedOption={optionSelectDestinationDelete}
        />
        <Button widthFull onClick={handleDeleteEdge}>
          Delete Arc
        </Button>
      </div>
    </div>
  );
};

export default Operations;

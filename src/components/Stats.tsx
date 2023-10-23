import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import Select from "./Select";

declare type nodeType = { id: number; label: string; shape: string };
declare type edgeType = { from: number; to: number, label:string };

interface IStats {
  graph: {
    nodes: nodeType[];
    edges: edgeType[];
  };
  setGraph: React.Dispatch<React.SetStateAction<{ nodes: nodeType[]; edges: edgeType[]; }>>;
}

const Stats = ({ graph, setGraph }: IStats) => {
    
  const [sommetAjouter, setSommetAjouter] = useState("");
  const [sommetSupprimer, setSommetSupprimer] = useState("");
  const [optionSelectDepartAjouter, setOptionSelectDepartAjouter] = useState<{id:number,label:string, shape:string}>({id: -1, label: '',shape:''});
  const [optionSelectDestinationAjouter, setOptionSelectDestinationAjouter] = useState<{id:number,label:string, shape:string}>({id: -1, label: '',shape:''});
  const [optionSelectDepartSupprimer, setOptionSelectDepartSupprimer] = useState<{id:number,label:string, shape:string}>({id: -1, label: '',shape:''});
  const [optionSelectDestinationSupprimer, setOptionSelectDestinationSupprimer] = useState<{id:number,label:string, shape:string}>({id: -1, label: '',shape:''});

 

  const handleAjouterSommet = () => {
    if (sommetAjouter) {
      setGraph((prev) => ({
        ...prev,
        nodes: [...prev.nodes, { id: prev.nodes.length + 1, label: sommetAjouter, shape: "circle" }],
      }));
    }
    setSommetAjouter("");
  };

  const handleSupprimerSommet = () => {
    if (sommetAjouter) {

    }
    setSommetSupprimer("");
  };

  const handleAjouterArc = () => {
    if (optionSelectDepartAjouter && optionSelectDestinationAjouter) {
      graph.edges.push( { from: optionSelectDepartAjouter.id, to: optionSelectDestinationAjouter.id, label:'' })  
    }
  };

  const handleSupprimerArc = () => {
    if (optionSelectDepartSupprimer && optionSelectDestinationSupprimer) {

    }
  };

  return (
    <>
    
      <div className="text-white z-10 absolute top-5 right-5 flex flex-col gap-5">
        <div className="flex gap-2">
          <p>Sommets:</p>
          <p>{graph.nodes.length}</p>
        </div>
        <div className="flex gap-2">
          <p>Arcs:</p>
          <p>{graph.edges.length}</p>
        </div>
      </div>
    
      <div className="text-white z-10 absolute top-5 left-5 flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <div className="text-yellow-400 font-semibold">Ajouter Sommet:</div>
          <Input
            text="Nom de sommet ..."
            type="text"
            widthFull
            onChange={(v) => setSommetAjouter(v)}
            value={sommetAjouter}
            className="py-2 text-xs w-[250px] bg-white text-black pr-8"
          />
          <Button widthFull onClick={handleAjouterSommet}>
            Add Sommet
          </Button>
        </div>
        <hr />
        <div className="flex flex-col gap-2">
          <div className="text-yellow-400 font-semibold">Supprimer Sommet:</div>
          <Input
            text="Nom de sommet ..."
            type="text"
            widthFull
            onChange={(v) => setSommetSupprimer(v)}
            value={sommetSupprimer}
            className="py-2 text-xs w-[250px] bg-white text-black pr-8"
          />
          <Button widthFull onClick={handleSupprimerSommet}>
            Supprimer Sommet
          </Button>
        </div>
        <hr />
        <div className="flex flex-col gap-2">
          <div className="text-yellow-400 font-semibold">Ajouter Arc:</div>
          <div className="flex gap-2">
          
                  <Select
                      items={graph.nodes}
                      placeholder="Sommet depart"
                      defaultValue={optionSelectDepartAjouter}
                      setSelectedOption={setOptionSelectDepartAjouter}
                      selectedOption={optionSelectDepartAjouter}
                  />

          
                  <Select
                      items={graph.nodes}
                      placeholder="Sommet destination"
                      defaultValue={optionSelectDestinationAjouter}
                      setSelectedOption={setOptionSelectDestinationAjouter}
                      selectedOption={optionSelectDestinationAjouter}
                  />
              
          </div>
          <Button widthFull onClick={handleAjouterArc}>
            Add Arc
          </Button>
        </div>
        <hr />
        <div className="flex flex-col gap-2">
          <div className="text-yellow-400 font-semibold">Supprimer Arc:</div>
          <div className="flex gap-2">
          
                  <Select
                      items={graph.nodes}
                      placeholder="Sommet depart"
                      defaultValue={optionSelectDepartSupprimer}
                      setSelectedOption={setOptionSelectDepartSupprimer}
                      selectedOption={optionSelectDepartSupprimer}
                  />

                  <Select
                      items={graph.nodes}
                      placeholder="Sommet destination"
                      defaultValue={optionSelectDestinationSupprimer}
                      setSelectedOption={setOptionSelectDestinationSupprimer}
                      selectedOption={optionSelectDestinationSupprimer}
                  />
              
          </div>
          <Button widthFull onClick={handleSupprimerArc}>
            Supprimer Arc
          </Button>
        </div>
      </div>
    </>
  );
};

export default Stats;

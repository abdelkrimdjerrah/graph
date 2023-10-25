import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import Select from "./Select";
import { ParcourLargeur } from "./ParcourLargeur";

declare type nodeType = { id: number; label: string; shape: string };
declare type edgeType = { from: number; to: number, label:string };

interface IStats {
  graph: {
    nodes: nodeType[];
    edges: edgeType[];
  };
  setGraph: React.Dispatch<React.SetStateAction<{ nodes: nodeType[]; edges: edgeType[]; }>>;
  graphStructure: {
    successeurs: number[];
    predecesseurs: number[];
  }[]
}


const Stats = ({ graph, setGraph, graphStructure }: IStats) => {
  
  const [error, setError] = useState('')
  const [sommetAjouter, setSommetAjouter] = useState("");
  const [sommetSupprimer, setSommetSupprimer] = useState("");
  const [valueArc, setValueArc] = useState("");
  const [optionSelectSupprimerSommet, setOptionSelectSupprimerSommet] = useState<{id:number,label:string, shape:string}>({id: -1, label: '',shape:''});
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
      setError('')
      setSommetAjouter("");
    }
    else{
      setError('Field is empty')
    }
  };



  const handleSupprimerSommet = () => {
    if (optionSelectSupprimerSommet) {
      setGraph((prev) => ({
        ...prev,
        nodes: prev.nodes.filter((node) => node.id !== optionSelectSupprimerSommet.id),
        edges: prev.edges.filter((edge) => edge.from !== optionSelectSupprimerSommet.id && edge.to !== optionSelectSupprimerSommet.id),
      }));
      setError('')
      setSommetSupprimer("");
    }
    else{
      setError('Field is empty')
    }
  };

  const handleAjouterArc = () => {
    if (optionSelectDepartAjouter && optionSelectDestinationAjouter && valueArc) {
       // Check if the edge already exists.
      const dejaExiste = graph.edges.filter((edge: edgeType) => {
        return edge.from === optionSelectDepartAjouter.id && edge.to === optionSelectDestinationAjouter.id;
      });
      if(dejaExiste.length){
        setError('Graph doit etre simple')
      }
      else{
        setGraph((prev) => ({
          ...prev,
          edges: [...prev.edges, { from: optionSelectDepartAjouter.id, to: optionSelectDestinationAjouter.id, label:valueArc }],
        }));
        setError('')
        setOptionSelectDepartAjouter({id: -1, label: '',shape:''})
        setOptionSelectDestinationAjouter({id: -1, label: '',shape:''})
      }
    }
    else{
      setError('Field is empty')
    }
  };

  const handleSupprimerArc = () => {
    if (optionSelectDepartSupprimer && optionSelectDestinationSupprimer) {
      setGraph((prev) => ({
        ...prev,
        edges: prev.edges.filter((edge) => edge.from !== optionSelectDepartSupprimer.id || edge.to !== optionSelectDestinationSupprimer.id),
      }));
      setError('')
      setOptionSelectDepartSupprimer({id: -1, label: '',shape:''})
        setOptionSelectDestinationSupprimer({id: -1, label: '',shape:''})
    }
    else{
      setError('Field is empty')
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
        <div className="flex gap-2">
          <p>Parcour Largeur:</p>
          <p>{ParcourLargeur(graphStructure,0)}</p>
        </div>
      </div>
    
      <div className="text-white z-10 absolute top-5 left-5 flex flex-col gap-5">

        {error ? <p className="text-red-500 font-medium text-lg ">{error}</p> : null}

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
          <Select
              items={graph.nodes}
              placeholder="Supprimer sommet"
              defaultValue={optionSelectSupprimerSommet}
              setSelectedOption={setOptionSelectSupprimerSommet}
              selectedOption={optionSelectSupprimerSommet}
          />

          <Button widthFull onClick={handleSupprimerSommet}>
            Supprimer Sommet
          </Button>
        </div>
        <hr />
        <div className="flex flex-col gap-2">
          <div className="text-yellow-400 font-semibold">Ajouter Arc:</div>
          <div className="flex flex-col gap-2">
          
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

            <Input
              text="Value d'arc"
              type="text"
              widthFull
              onChange={(v) => setValueArc(v)}
              value={valueArc}
              className="py-2 text-xs w-[250px] bg-white text-black pr-8"
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

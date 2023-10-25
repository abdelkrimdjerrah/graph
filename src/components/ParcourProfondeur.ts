declare type Graph = {
    [id: number]: {
      successeurs: number[];
      predecesseurs: number[];
    };
  }[];


export const ParcourProfondeur = (graph: Graph, start: number) => {

    const queue: number[] = [];
    const visited: number[] = [];

    queue.push(start);
    

    return visited;

}
import { Steps } from "@/models/Algorithm.model";

type Node = {
    x: number;
    y: number;
    distance: number;
    visited: boolean;
    previous: Node | null;
  };
  
  type Matrix = number[][];


const execution = (vals: boolean[][], start: [number, number], end: [number, number][]): 
{
    steps: Steps[],
    found: boolean,
    path: [number, number][]
} => {
    const possibleEnds = end.map(([x, y]) => `${x},${y}`);
    const steps : Steps[] = [];
    const visited = new Set<string>();
    const nodes: Node[][] = vals.map((row, x) =>
      row.map((value, y) => ({
        x,
        y,
        distance: Infinity,
        visited: false,
        previous: null,
      }))
    );
  
    const startNode = nodes[start[0]][start[1]]
    const unvisited: Node[] = nodes.flat();
    startNode.distance = 0;
      
    while (unvisited.length > 0) {
      const currentNode = getClosestNode(unvisited);
      console.log(currentNode)
      if(visited.has(`${currentNode.x},${currentNode.y}`)) continue;
      steps.push({ node: [currentNode.x, currentNode.y], visited: new Set(visited), step: steps.length });
      visited.add(`${currentNode.x},${currentNode.y}`)
      currentNode.visited = true;
      unvisited.splice(unvisited.indexOf(currentNode), 1);


      if (possibleEnds.includes(`${currentNode.x},${currentNode.y}`)) {
        return {
            steps: steps,
            found: true,
            path: getPath(currentNode)
        }
      }
  
      for (const neighbor of getNeighbors(nodes, currentNode)) {
        if (!visited.has(`${neighbor.x},${neighbor.y}`) && vals[neighbor.x][neighbor.y]) {
          const distance = currentNode.distance + 1;
          if (distance < neighbor.distance) {
            neighbor.distance = distance;
            neighbor.previous = currentNode;
          }
        }
      }
    }
  

    return {
        steps: [],
        found: false,
        path: []
    }
}


  
  function getClosestNode(nodes: Node[]): Node {
    return nodes.reduce((closest, node) => (node.distance < closest.distance ? node : closest));
  }
  
  function getNeighbors(nodes: Node[][], node: Node): Node[] {
    const neighbors: Node[] = [];
    const { x, y } = node;
  
    if (x > 0) {
      neighbors.push(nodes[x - 1][y]);
    }
    if (y > 0) {
      neighbors.push(nodes[x][y - 1]);
    }
    if (x < nodes.length - 1) {
      neighbors.push(nodes[x + 1][y]);
    }
    if (y < nodes[x].length - 1) {
      neighbors.push(nodes[x][y + 1]);
    }
  
    return neighbors;
  }
  
  function getPath(endNode: Node): [number,number][] {
    const path: [number,number][] = [];
    let currentNode: Node | null = endNode;
  
    while (currentNode !== null) {
        console.log(currentNode)
      path.unshift([currentNode.x, currentNode.y])
      currentNode = currentNode.previous;
    }
  
    return path;
  }
  






export default execution;
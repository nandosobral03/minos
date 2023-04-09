
type Node = {
    x: number;
    y: number;
    distance: number;
    previous: Node | null;
    valid: boolean;
  };
  
  type Matrix = number[][];


const execution = (vals: boolean[][], start: [number, number], end: [number, number][]): 
{
    found: boolean,
    path: [number, number][]
    visited: [number, number][]
} => {
    const possibleEnds = end.map(([x, y]) => `${x},${y}`);
    const visited = new Set<string>();
    const visitedArray: [number, number][] = [];
    const nodes: Node[][] = vals.map((row, x) =>
      row.map((value, y) => ({
        x,
        y,
        distance: Infinity,
        visited: false,
        previous: null,
        valid : value
      }))
    );
  
    const startNode = nodes[start[0]][start[1]]
    const unvisited: Node[] = nodes.flat().filter(node => node.valid);
    startNode.distance = 0;
      
    while (unvisited.length > 0) {
      const currentNode = getClosestNode(unvisited);
      console.log(currentNode)
      if(visited.has(`${currentNode.x},${currentNode.y}`)) continue;
      
      
      unvisited.splice(unvisited.indexOf(currentNode), 1);
      
      if(currentNode.distance === Infinity) break;
      visited.add(`${currentNode.x},${currentNode.y}`)
      visitedArray.push([currentNode.x, currentNode.y])

      if (possibleEnds.includes(`${currentNode.x},${currentNode.y}`)) {
        return {
            found: true,
            path: getPath(currentNode),
            visited: visitedArray
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
        found: false,
        path: [],
        visited: visitedArray
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
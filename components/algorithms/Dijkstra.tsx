import { useState } from "react";
import Explanation from "../Explanation";
import NoExplanation from "../NoExplanation";
import style from "../../styles/About.module.scss";

const Dijkstra = () => {
    const [activeExplanation, setActiveExplanation] = useState<
    undefined | number
  >(undefined);
  const segments: { text: string; explanation?: string }[] = [
    {
      text: `Type Node = {
        x: number;
        y: number;
        distance: number;
        previous: Node | null;
        valid: boolean;
      };`,
      explanation: `The Node type is used to represent a node in the grid. It contains the x and y coordinates of the node, the distance from the starting node, the previous node in the path, and whether or not the node is valid.`,
    },
    {
      text: `const dijkstra = (vals: boolean[][], start: [number, number], end: [number, number][]): {`,
      explanation: `Dijkstra's algorithm is a pathfinding algorithm that finds the shortest path between two points.`,
    },
    {
      text: `const possibleEnds = end.map(([x, y]) => \`\${x},\${y}\`);
      const visited = new Set<string>();
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
    `,
    explanation: `The possibleEnds array is an array of the end nodes, having them in this format makes it easier to check if a node is an end node. The visited set is used to keep track of which nodes have been visited. The nodes array is a 2D array of nodes, it is initialized with the x and y coordinates of each node, the distance from the starting node, whether or not the node has been visited, the previous node in the path, and whether or not the node is valid.`,
    },
    {
      text: `const startNode = nodes[start[0]][start[1]]
      const unvisited: Node[] = nodes.flat().filter(node => node.valid);
      startNode.distance = 0;
    `,
    explanation: `The startNode is the node that the algorithm starts at. The unvisited array is an array of all the nodes that have not been visited. The startNode's distance is set to 0 because it is the starting node.`,
    },
    {
      text: `while (unvisited.length > 0) {
        const currentNode = getClosestNode(unvisited);
        if(visited.has(\`\${currentNode.x},\${currentNode.y}\`)) continue;
        `,
      explanation: `The algorithm loops until there are no more unvisited nodes. The currentNode is the closest node to the starting node that has not been visited. If the currentNode has already been visited, the loop continues.`, 
    },
    {
      text: `unvisited.splice(unvisited.indexOf(currentNode), 1);`,
      explanation: `The currentNode is removed from the unvisited array.`,
    },
    {
      text: `if(currentNode.distance === Infinity) break;`,
      explanation: `If the currentNode's distance is Infinity, the loop breaks. This is because if the currentNode's distance is Infinity, then there are no more nodes that are connected to the starting node.`,
    },
    {
      text: `visited.add(\`\${currentNode.x},\${currentNode.y}\`)`,
      explanation: `The currentNode is added to the visited set.`,
    },
    {
      text: `if (possibleEnds.includes(\`\${currentNode.x},\${currentNode.y}\`)) {
        return getPath(currentNode);
      }`,
      explanation: `If the currentNode is an end node, the path is returned.`,
    }
              
];

/*

  };
  
      
      unvisited.splice(unvisited.indexOf(currentNode), 1);
      
      if(currentNode.distance === Infinity) break;
      visited.add(`${currentNode.x},${currentNode.y}`)

      if (possibleEnds.includes(`${currentNode.x},${currentNode.y}`)) {
        return path
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
  

    return path;
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
      path.unshift([currentNode.x, currentNode.y])
      currentNode = currentNode.previous;
    }
  
    return path;
  }
  


*/
 
  return (
    <div className={style.explanationCard} style={{ gap: "2px" }}>
      {segments.map((segment, i) =>
        segment.explanation ? (
          <Explanation
            key={i}
            lines={segment.text.split("\n")}
            explanation={segment.explanation}
            active={activeExplanation === i}
            onClicked={() => {
              if (activeExplanation === i) setActiveExplanation(undefined);
              else setActiveExplanation(i);
            }}
          />
        ) : (
          <NoExplanation key={i} lines={segment.text.split("\n")} />
        )
      )}
    </div>
  );
};

export default Dijkstra;

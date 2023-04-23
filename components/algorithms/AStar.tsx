import { useState } from "react";
import Explanation from "../Explanation";
import NoExplanation from "../NoExplanation";
import style from "../../styles/About.module.scss";

const AStar = () => {
  const [activeExplanation, setActiveExplanation] = useState<
    undefined | number
  >(undefined);
  const segments: { text: string; explanation?: string }[] = [
    {
      text: `const AStar = (vals: boolean[][], start: [number, number], end: [number, number][]): path: [number, number][] => {`,
      explanation: `AStar is a pathfinding algorithm that finds the shortest path between two points. It is a modification of Dijkstra's algorithm that uses a heuristic to prioritize the search.`,
    },
    {
      text: `const openSet = new Set([start.join(",")]);`,
      explanation: `The open set is a set of nodes that have been visited but not yet explored. It is initialized with the starting node.`,
    },
    {
      text: `const cameFrom = new Map<string, string>();`,
      explanation: `The cameFrom map is used to reconstruct the path once the algorithm has finished. It maps each node to the node that it was visited from.`,
    },
    {
      text: `const gScore = new Map<string, number>([[\`\${start[0]},\${start[1]}\`, heuristic(start, end)]]);`,
      explanation: `The gScore map is used to keep track of the cost of the best path to each node. It is initialized with the starting node.`,
    },
    {
      text: `const fScore = new Map([[\`\${start[0]},\${start[1]}\`, heuristic(start, end)]]);`,
      explanation: `The fScore map is used to keep track of the cost of the best path to each node plus the heuristic. It is initialized with the starting node.`,
    },
    {
      text: `const visited = new Set<string>();`,
      explanation: `The visited set is used to keep track of which nodes have been visited.`,
    },
    {
      text: `while (openSet.size > 0) {
                const current = Array.from(openSet).reduce(
                    (a, b) => (fScore.get(a)! < fScore.get(b)! ? a : b)
                );`,
      explanation: `The algorithm runs until the open set is empty. The current node is the node in the open set with the lowest fScore.`,
    },
    {
      text: `let ending = end.find(([x, y]) => current === \`\${x},\${y}\`);
                if (ending) {
                    return path: reconstructPath(cameFrom, ending),
                }`,
      explanation: `If the current node is the end node, the algorithm is finished. The path is reconstructed using the cameFrom map.`,
    },
    {
      text: `if(!vals[ +current.split(",")[0] ] || !vals[ +current.split(",")[0] ][ +current.split(",")[1] ]){
                    openSet.delete(current);
                    continue
                }`,
      explanation: `If the current node is not a valid node, it is removed from the open set and the loop continues.`,
    },
    {
      text: `if(visited.has(current)){
                    openSet.delete(current);
                    continue
                    `,
      explanation: `If the current node has already been visited, it is removed from the open set and the loop continues.`,
    },
    {
        text: `visited.add(current);
                openSet.delete(current);`,
        explanation: `As we are now visiting the current node, it is removed from the open set and added to the visited set.`,
    },
    {
        text: `for (const neighbor of neighbors(current.split(",").map(Number) as [number, number], vals)) {
                    const tentativeGScore = gScore.get(current)! + 1;
                    const neighborKey = \`\${neighbor[0]},\${neighbor[1]}\`
                    `,
        explanation: `The algorithm loops through the neighbors of the current node, calculating the tentative gScore for each.`,
    },
    {
        text: `if (tentativeGScore < (gScore.get(neighborKey) || Infinity)) {
                        cameFrom.set(neighborKey, current);
                        gScore.set(neighborKey, tentativeGScore);
                        fScore.set(
                            neighborKey,
                            tentativeGScore + heuristic(neighbor, end)
                        );
                }`,
        explanation: `If the tentative gScore is less than the current gScore for the neighbor, the neighbor's gScore, fScore, and cameFrom are updated.`,
    },
    {
        text: `}
    }`
    },
    {
        text: `return [];`,
        explanation: `If the algorithm finishes without finding the end node, it returns an empty array.`,
    },
    {
        text: `}`,
    },
    {
        text : `const reconstructPath = (cameFrom: Map<string, string>, current: [number, number]) => {
        let curr = current.join(",");
        const totalPath = [current];
        while (cameFrom.has(curr)) {
            curr = cameFrom.get(curr)!;
            totalPath.push(curr.split(",").map(Number) as [number, number]);
        }
        return totalPath.reverse();
    }`,
    explanation: `The reconstructPath function is used to reconstruct the path once the algorithm has finished, since we have the best path to each node stored in the cameFrom map, we can simply follow the path back to the start node.`,
    },
    {
        text: `const neighbors = (a: [number, number], vals: boolean[][]) : [number, number][] => {
        let directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        const neighbors: [number, number][] = [];
        const [x, y] = a;
        for(let [dx, dy] of directions){
                if(vals[x + dx] && vals[x + dx][y + dy]){
                    neighbors.push([x + dx, y + dy]);
                }
            }
        return neighbors;
    }`,
    explanation: `The neighbors function is used to find the neighbors of a given node. It loops through the four directions and adds the valid neighbors to the neighbors array.`,
    },
    {
        text: `const  heuristic = (a: [number, number], b: [number, number][]) => {
            let bestHeuristic = Infinity;
            for(let end of b ){
                let [x, y] = end
                bestHeuristic = Math.min(bestHeuristic, manhattan(a, x, y));
            }
            return bestHeuristic;
        }`,
        explanation: `The heuristic function is used to estimate the distance between two nodes. In this case, we are using the Manhattan distance. Since the Manhattan distance is always an underestimation, the algorithm is guaranteed to find the shortest path.
        To adapt the algorithm to find the shortest path between multiple end nodes, we loop through the end nodes and return the best heuristic.`
    },
    {
        text : `const manhattan = (a: [number, number], x: number, y: number) => {
            return Math.abs(a[0] - x) + Math.abs(a[1] - y);
        }`,
        explanation: `The manhattan function is used to calculate the Manhattan distance between two nodes.`
    }
  ];
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

export default AStar;

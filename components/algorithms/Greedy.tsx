import { useState } from "react";
import Explanation from "../Explanation";
import NoExplanation from "../NoExplanation";
import style from "../../styles/About.module.scss";
const Greddy = (props: any) => {
  const [activeExplanation, setActiveExplanation] = useState<
    undefined | number
  >(undefined);
  const segments = [
    {
      text: `const greedy = (vals: boolean[][], start: [number, number], end: [number, number][]): path: [number,number] => {`,
      explanation: `The funcion takes 3 arguments - the grid, the starting point, and the possible end points. It returns the path from the starting point to the closest end point if one exists.`,
    },
    {
      text: `    const possibleEnds = end.map(([x, y]) => \`\${x},\${y}\`);`,
      explanation: `We convert the end points to a string so we can easily check if the current point is an end point.`,
    },
    {
      text: `    const visited = new Set<string>();
    visited.add(\`\${current[0]},\${current[1]}\`);
    const path: [number, number][] = [start];
    let current = start;
            `,
      explanation: `We create a set to keep track of the points we have visited. We add the starting point to the set and create an array to keep track of the path.`,
    },
    {
      text: `   while (!possibleEnds.includes(\`\${current[0]},\${current[1]}\`)) {`,
      explanation: `We loop until we reach an end point.`,
    },
    {
      text: `       const neighbors: [number, number][] = [];
        if (current[0] > 0 && !visited.has(\`\${current[0] - 1},\${current[1]}\`) && vals[current[0] - 1][current[1]]) {
            neighbors.push([current[0] - 1, current[1]]);
        }
        if (current[0] < vals.length - 1 && !visited.has(\`\${current[0] + 1},\${current[1]}\`) && vals[current[0] + 1][current[1]]) {
            neighbors.push([current[0] + 1, current[1]]);
        }
        if (current[1] > 0 && !visited.has(\`\${current[0]},\${current[1] - 1}\`) && vals[current[0]][current[1] - 1]) {
            neighbors.push([current[0], current[1] - 1]);
        }
        if (current[1] < vals[0].length - 1 && !visited.has(\`\${current[0]},\${current[1] + 1}\`) && vals[current[0]][current[1] + 1]) {
            neighbors.push([current[0], current[1] + 1]);
        }`,
      explanation: `We check the 4 neighbors of the current point. If the neighbor is valid (not out of bounds or a wall) and we have not visited it, we add it to the neighbors array so we can check it later.`,
    },
    {
      text: `       if (neighbors.length === 0) {
            path.pop();
            current = path[path.length - 1];
            if(!current) return []
      }`,
      explanation: `If there are no neighbors, we pop the last point off the path and set the current point to the new last point. If there are no points left in the path it means there is no path to the end point so we return an empty array.`,
    },
    {
      text: `       let closest: [number, number] = neighbors[0];
       let closestDistance = distance(closest, end);
       for (let i = 1; i < neighbors.length; i++) {
            const neighbor = neighbors[i];
            const neighborDistance = manhattanDistance(neighbor, end);
             if (neighborDistance < closestDistance) {
                closest = neighbor;
                closestDistance = neighborDistance;
             }
         }`,
      explanation: `We find the neighbor that is closest to the end point using the Manhattan distance.`,
    },
    {
      text: `        path.push(closest);
        current = closest;
        visited.add(\`\${current[0]},\${current[1]}\`);
    }`,
    },
    {
    text: `   return path;
}`,
    },
    {
      text: `const manhattanDistance = (a: [number, number], b: [number, number][]): number => {
    let min = Infinity;
    for (let i = 0; i < b.length; i++) {
        const [x, y] = b[i];
        const distance = Math.abs(a[0] - x) + Math.abs(a[1] - y);
        if (distance < min) {
            min = distance;
        }
    }
    return min
}`,
      explanation: `We find the lowest manhattan distance to the nearest end point.`}
  ];
  return (
    <div className={style.explanationCard} style={{gap : "2px"}}>
      {segments.map((segment, i) =>
        segment.explanation ? (
          <Explanation
            key={i}
            lines={segment.text.split("\n")}
            explanation={segment.explanation}
            active = {activeExplanation === i}
            onClicked={() => {
                if(activeExplanation === i) setActiveExplanation(undefined);
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

export default Greddy;

import { useState } from "react";
import Explanation from "../Explanation";
import NoExplanation from "../NoExplanation";
import style from "../../styles/About.module.scss";
const DFS = (props: any) => {
  const [activeExplanation, setActiveExplanation] = useState<
    undefined | number
  >(undefined);
  const segments: { text: string; explanation?: string }[] = [
    {
      text: `const DFS = (vals: boolean[][], start: [number, number], end: [number, number][]): path: [number,number] => {`,
      explanation: `The funcion takes 3 arguments - the grid, the starting point, and the possible end points. It returns the path from the starting point to the closest end point if one exists.`,
    },
    {
      text: `    const possibleEnds = end.map(([x, y]) => \`\${x},\${y}\`);`,
      explanation: `We convert the end points to a string so we can easily check if the current point is an end point.`,
    },
    {
      text: `
        const visited = new Set<string>();
        const stack = [start];`,
      explanation: `We keep track of the visited points and the stack(LIFO) of points to visit .`,
    },
    {
      text: `
        while (stack.length > 0) {
            const node = stack.pop()!;
            const [x, y] = node;
            const key = \`\${x},\${y}\`;

            if (possibleEnds.includes(key)) {
                path.push(node)
                break;
            }`,
      explanation: `We pop the point from the stack and check if it is an end point`,
    },
    {
      text: `
            if (vals[x][y] && !visited.has(key)) {
                path.push(node)
                visited.add(key);`,
      explanation: `If the point is valid and has not been visited, we add it to the path and mark it as visited.`,
    },
    {
        text: `
                if (x > 0) {
                    stack.push([x - 1, y]);
                }
                if (y > 0) {
                    stack.push([x, y - 1]);
                }
                if (x < vals.length - 1) {
                    stack.push([x + 1, y]);
                }
                if (y < vals[0].length - 1) {
                    stack.push([x, y + 1]);
                }
          }`,
      explanation: `We add the adjacent points to the stack in the order of right, down, left, up.`,
    },
    {
      text: `
      }
      return path
  }`,
      explanation: `We return the path.`,
    },
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

export default DFS;

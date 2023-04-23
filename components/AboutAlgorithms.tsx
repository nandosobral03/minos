import { createElement, useEffect, useState } from "react";
import DFS from "./algorithms/DFS";
import Greddy from "./algorithms/Greedy";
import styles from "../styles/About.module.scss";
type ValidAlgorithms = "greedy" | "dijkstra";
type AlgorithmDescriptions = {
  [key in ValidAlgorithms]: {
    explanations: [string, string, string];
    wiki: string;
    implementationComponent: any;
    title: string;
  };
};
const AboutAlgorithms = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState<ValidAlgorithms>("greedy");
  const [selectedExplanation, setSelectedExplanation] = useState<number>(0);
  const explanationIcons = [
    'info',
    'linear_scale',
    'functions'
  ]
  const algorithmDescriptions: AlgorithmDescriptions = {
    // dijkstra:{
    //     eli5: "Dijkstra's algorithm is a graph traversal algorithm that finds the shortest path between two nodes in a graph. It is a weighted algorithm, meaning that it takes into account the weight of each edge in the graph. It is a greedy algorithm, meaning that it makes the best choice at each step. It is a single-source algorithm, meaning that it finds the shortest path from a single node to all other nodes in the graph.",
    //     implementationComponent: DFS
    // },
    greedy: {
      explanations: [
        `The Greedy search algorithm is a way to find the best solution to a problem by always choosing the option that seems to be the best at the moment. It works by starting at the initial state of the problem and considering all the possible moves that can be made from that state. Then it chooses the move that appears to be the best and moves to the next state. This process is repeated until a solution is found or it is determined that no solution exists.`,
        `The Greedy search algorithm is a heuristic search algorithm that is used to find the optimal solution in a problem space. It starts at the initial state and expands the node that appears to be the best choice at that particular moment, based on the heuristic function. This function estimates the cost or the value of each move that can be made from the current state. The algorithm does not consider the future consequences of its actions, but only the immediate rewards or costs. As a result, the Greedy search algorithm can sometimes get stuck in a local optimum and miss the global optimum. However, it is often faster and more efficient than other search algorithms, especially when the problem space is large and complex.`,
        `The Greedy search algorithm is a member of the class of informed search algorithms, which use domain-specific knowledge to guide the search towards the solution. It is based on the principle of making locally optimal choices at each step, in the hope of finding a global optimum. The algorithm uses a heuristic function to evaluate each state and select the most promising one for expansion. The heuristic function is often an estimate of the remaining cost or distance to the goal state, based on some assumptions or heuristics about the problem domain. The Greedy search algorithm can be viewed as a best-first search algorithm that expands the nodes with the lowest heuristic value first. However, it does not take into account the cost of the path to the current state, so it may get stuck in a dead-end or suboptimal path. To overcome this limitation, variants of the Greedy search algorithm have been proposed, such as the A* search algorithm, which combines the heuristic value and the cost of the path to evaluate each state`,
      ],
      wiki: "https://en.wikipedia.org/wiki/Greedy_algorithm",
      implementationComponent: Greddy,
      title: "Greedy Pathfinding",
    },
    dijkstra: {
      explanations: ["", "", ""],
      wiki: "",
      implementationComponent: undefined,
      title: "",
    },
  };


  const algorithmsArray = Object.keys(algorithmDescriptions).map(
    (algorithm) => {
      return {
        ...(algorithmDescriptions as any)[algorithm],
      };
    }
  );

  const handleSelectChange = (value: ValidAlgorithms) => {
    setSelectedAlgorithm(value);
    setSelectedExplanation(0);
  };

  return (
    <div className={styles.container}>
      <h2>Algorithms</h2>
        <select
          className={styles.algorithmSelector}
          onChange={(e) =>
            handleSelectChange(e.target.value as ValidAlgorithms)
          }
        >
          {algorithmsArray.map((algorithm) => (
            <option key={algorithm.title} value={algorithm.title}>{algorithm.title}</option>
          ))}
        </select>
        <div className={styles.explanationCard}>
          <div className={styles.explanationCardHeader}>
            <span className={styles.explanationCardTitle}>
              {algorithmDescriptions[selectedAlgorithm].title}
            </span>
            <div className={styles.explanationSelector}>
              {algorithmDescriptions[selectedAlgorithm].explanations.map(
                (explanation, index) => {
                  return (
                    <button onClick={() => setSelectedExplanation(index)} className={selectedExplanation === index ? styles.active : ""} key={index}>
                      <span className="material-symbols-outlined"> {explanationIcons[index]}</span>
                    </button>
                  );
                }
              )}
            </div>
          </div>
          <div className={styles.explanationCardBody}>
            {
              algorithmDescriptions[selectedAlgorithm].explanations[
                selectedExplanation
              ]
            }
          </div>
        </div>
        {createElement(
          algorithmDescriptions[selectedAlgorithm].implementationComponent
        )}
      </div>
  );
};

export default AboutAlgorithms;

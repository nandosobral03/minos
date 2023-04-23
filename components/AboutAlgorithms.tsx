import { createElement, useEffect, useState } from "react";
import DFS from "./algorithms/DFS";
import Greddy from "./algorithms/Greedy";
import styles from "../styles/About.module.scss";
import BFS from "./algorithms/BFS";
type ValidAlgorithms = "greedy" | "dfs" | "bfs";
type AlgorithmDescriptions = {
  [key in ValidAlgorithms]: {
    explanations: [string, string, string];
    implementationComponent: any;
    title: string;
    id: string;
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
      implementationComponent: Greddy,
      title: "Greedy Pathfinding",
      id: "greedy",
    },
    dfs: {
      explanations: [
        `DFS is a graph traversal algorithm that explores a graph by visiting as far as possible along each branch before backtracking. The algorithm explores the depth of the graph first before moving on to the next branch. This ensures that the algorithm covers the entire graph.
        `,
        `DFS starts at a given source vertex and explores as far as possible along each branch before backtracking. The algorithm uses a stack to keep track of the vertices to be visited. Whenever a vertex is visited, its adjacent vertices are pushed onto the stack. This ensures that the algorithm explores the depth of the graph first before moving on to the next branch.
        DFS can be used to solve a variety of problems, such as finding the shortest path between two vertices in a graph, determining if a graph is connected, and finding all the connected components in a graph.`,
        `DFS is a graph traversal algorithm that starts at a given source vertex and explores a graph by visiting as far as possible along each branch before backtracking. The algorithm uses a stack to keep track of the vertices to be visited, with the source vertex being the first vertex in the stack. The algorithm then repeatedly pops the top vertex from the stack, explores its adjacent vertices, and pushes any unexplored adjacent vertices onto the stack. This process continues until all vertices have been visited.
        DFS can be used to solve a variety of problems, including finding the shortest path between two vertices in a graph, determining if a graph is connected, and finding all the connected components in a graph. The time complexity of DFS is O(V + E), where V is the number of vertices in the graph and E is the number of edges. DFS uses a stack to keep track of the vertices to be visited, and the space complexity of the algorithm is O(V), where V is the number of vertices in the graph.`
      ],
      implementationComponent: DFS,
      title: "Depth First Search",
      id: "dfs",
    },
    bfs:{
      explanations: [
        `BFS is a graph traversal algorithm that explores all the vertices of a graph level by level, starting from a given source vertex. The algorithm explores all the vertices at a particular level before moving on to the next level. This ensures that the shortest path to all vertices from the source vertex is found`,
        `BFS works by starting at the source vertex and exploring all its adjacent vertices first. The algorithm then explores the adjacent vertices of the vertices that were just explored, and so on, until all vertices have been visited. BFS uses a queue to keep track of the vertices to be visited. Whenever a vertex is visited, its adjacent vertices are added to the queue. This ensures that vertices at the same level are explored before moving on to the next level.

        BFS can be used to solve a variety of problems, such as finding the shortest path between two vertices in a graph, determining if a graph is connected, and finding all the connected components in a graph.`,
        `
        BFS is a graph traversal algorithm that starts at a given source vertex and explores all the vertices in the graph that are reachable from the source vertex. The algorithm works by maintaining a queue of vertices to be visited, with the source vertex being the first vertex in the queue. The algorithm then repeatedly dequeues the first vertex in the queue, explores its adjacent vertices, and enqueues any unexplored adjacent vertices into the queue. This process continues until all vertices have been visited.

BFS can be used to solve a variety of problems, including finding the shortest path between two vertices in a graph, determining if a graph is connected, and finding all the connected components in a graph. The time complexity of BFS is O(V + E), where V is the number of vertices in the graph and E is the number of edges. BFS uses a queue to keep track of the vertices to be visited, and the space complexity of the algorithm is O(V).
        `],
      implementationComponent: BFS,
      title: "Breadth First Search",
      id: "bfs",
    }

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
            <option key={algorithm.title} value={algorithm.id.toLowerCase()}>{algorithm.title}</option>
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

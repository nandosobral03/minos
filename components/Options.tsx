import styles from "@/styles/Visualizer.module.scss";
import { memo, useEffect } from "react";
import Brushes from "./Brushes";
import TimeOptions from "./TimeOptions";
import { Algorithm } from "@/models/Algorithm.model";

const Options = memo(
  ({
    onAlgorithmChange,
    changeBrush,
    brush,
    runAlgorithm,
    reset,
    nextStep,
    previousStep,
  }: {
    onAlgorithmChange: (algorithm: Algorithm | null) => void;
    brush: number;
    changeBrush: (brush: number) => void;
    runAlgorithm: () => void;
    reset: () => void;
    nextStep: () => void;
    previousStep: () => void;
  }) => {
    useEffect(() => {
      const algorithms = require("@/logic/algorithms").default;
      const algo = algorithms.find((algo: Algorithm) => algo.name === "DFS");
      onAlgorithmChange(algo);
    }, []);

    const algorithms = require("@/logic/algorithms").default;
    const changeAlgorithm = (algorithm: string) => {
      const algo = algorithms.find(
        (algo: Algorithm) => algo.name === algorithm
      );
      onAlgorithmChange(algo);
    };

    return (
      <div className={styles.options}>
        <select
          onChange={(e) => {
            changeAlgorithm(e.target.value);
          }}
          className={styles.algorithmSelector}
        >
          <option value="DFS">Depth First Search</option>
          <option value="BFS">Breadth First Search</option>
          <option value="dijkstra">Dijkstra's Algorithm</option>
        </select>
        <Brushes brush={brush} changeBrush={(e) => changeBrush(e)} />
        <TimeOptions runAlgorithm={runAlgorithm} reset={reset} nextStep={nextStep} previousStep={previousStep} />
      </div>
    );
  }
);

export default Options;

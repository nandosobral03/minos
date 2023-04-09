import styles from "@/styles/Options.module.scss";
import { memo, useEffect } from "react";
import Brushes from "./Brushes";
import TimeOptions from "./TimeOptions";
import { Algorithm } from "@/models/Algorithm.model";
import { MazePreset } from "@/models/MazePreset.model";
import AlgorithmSelector from "./AlgorithmSelector";
import MazeGenerator from "./MazeGenerator";

const Options = memo(
  ({
    onAlgorithmChange,
    onGenerateMaze,
    changeBrush,
    brush,
    runAlgorithm,
    reset,
    nextStep,
    previousStep,
  }: {
    onAlgorithmChange: (algorithm: Algorithm | null) => void;
    onGenerateMaze: (preset: MazePreset) => void;
    brush: number;
    changeBrush: (brush: number) => void;
    runAlgorithm: () => void;
    reset: () => void;
    nextStep: () => void;
    previousStep: () => void;
  }) => {
   
    return (
      <div className={styles.options}>
       <AlgorithmSelector onAlgorithmChange={onAlgorithmChange} />
        <MazeGenerator onGenerateMaze={onGenerateMaze} />
        <Brushes brush={brush} changeBrush={(e) => changeBrush(e)} />
        <TimeOptions runAlgorithm={runAlgorithm} reset={reset} nextStep={nextStep} previousStep={previousStep} />
      </div>
    );
  }
);

export default Options;

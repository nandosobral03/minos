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
    playing,
  }: {
    onAlgorithmChange: (algorithm: Algorithm | null) => void;
    onGenerateMaze: (preset: MazePreset) => void;
    brush: number;
    changeBrush: (brush: number) => void;
    runAlgorithm: () => void;
    reset: () => void;
    nextStep: () => void;
    previousStep: () => void;
    playing: boolean;
  }) => {
    return (
      <div className={`${styles.options} ${playing ? styles.disabled : ""}`}>
        <Brushes brush={brush} changeBrush={(e) => changeBrush(e)} />
        <AlgorithmSelector onAlgorithmChange={onAlgorithmChange} />
        <TimeOptions
          runAlgorithm={runAlgorithm}
          reset={reset}
          nextStep={nextStep}
          previousStep={previousStep}
          playing={playing}
        />
        <MazeGenerator onGenerateMaze={onGenerateMaze} />
      </div>
    );
  }
);

export default Options;

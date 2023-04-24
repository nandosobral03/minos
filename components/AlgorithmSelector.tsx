import styles from "@/styles/Options.module.scss";
import { Algorithm } from "@/models/Algorithm.model";
import { useEffect } from "react";

const AlgorithmSelector = ({
  onAlgorithmChange,
}: {
  onAlgorithmChange: (algorithm: Algorithm) => void;
}) => {
  useEffect(() => {
    const algorithms = require("@/logic/algorithms").default;
    const algo = algorithms[0];
    onAlgorithmChange(algo);
  }, [onAlgorithmChange]);

  const algorithms = require("@/logic/algorithms").default;
  const changeAlgorithm = (algorithm: string) => {
    const algo = algorithms.find((algo: Algorithm) => algo.name === algorithm);
    onAlgorithmChange(algo);
  };

  return (
    <div className={styles.algorithmSelect}>
      <select
        onChange={(e) => {
          changeAlgorithm(e.target.value);
        }}
        className={styles.select}
      >
        {algorithms.map((algo: Algorithm) => {
          return (
            <option value={algo.name} key={algo.name}>
              {algo.description}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default AlgorithmSelector;

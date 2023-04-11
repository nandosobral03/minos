import { useEffect } from "react";
import styles from "../styles/Options.module.scss";

const TimeOptions = ({
  runAlgorithm,
  reset,
  nextStep,
  previousStep,
}: {
  runAlgorithm: () => void;
  reset: () => void;
  nextStep: () => void;
  previousStep: () => void;
}) => {



  return (
    <>
      <button className={styles.button} onClick={runAlgorithm}>
        <span className="material-symbols-outlined">play_arrow</span>
      </button>
      <button className={styles.button} onClick={reset}>
        <span className="material-symbols-outlined">restart_alt</span>
      </button>

      <button
        className={styles.button}
        onClick={previousStep}
      >
        <span
          className="material-symbols-outlined"
          style={{ transform: "scaleX(-1)" }}
        >
          step_over
        </span>
      </button>

      <button className={styles.button} onClick={nextStep}>
        <span className="material-symbols-outlined">step_over</span>
      </button>
    </>
  );
};

export default TimeOptions;

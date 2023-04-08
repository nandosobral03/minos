import Options from "@/components/Options";
import Layout from "@/components/Layout";
import VisualizerComponent from "@/components/VisualizerContainer";
import { useCallback, useEffect, useState } from "react";
import { Algorithm, Steps } from "@/models/Algorithm.model";

const Visualizer = () => {
  const [algorithm, setAlgorithm] = useState<Algorithm | null>(null);
  const [playing, setPlaying] = useState(false);
  const [brush, setBrush] = useState(1);
  const [height, setHeight] = useState(14);
  const [width, setWidth] = useState(14);
  const [steps, setSteps] = useState<Steps[]>([]);
  const [currentStep, _setCurrentStep] = useState(0);
  const [path, setPath] = useState<[number, number][]>([]);
  const [matrix, setMatrix] = useState<number[][]>(
    Array.from({ length: height }, () => Array.from({ length: width }, () => 0))
  );

  useEffect(() => {
    const resize = () => {
      const realWidth = window.innerWidth - 250;
      const realHeight = window.innerHeight * 0.95 - 48;
      const cellSize = 25;
      console.log(realWidth, realHeight);
      if (realWidth > 350) {
        setWidth(Math.ceil(realWidth / cellSize));
      }
      if (realHeight > 200) {
        setHeight(Math.ceil(realHeight / cellSize));
      }
    };

    window.addEventListener("resize", resize);
    resize();
    return () => window.removeEventListener("resize", resize);
  }, []);


  const resetMatrix = useCallback(() => {
    const newMatrix = Array.from({ length: height }, () => Array.from({ length: width }, () => 0));
    newMatrix[0][0] = 3;
    newMatrix[height - 1][width - 1] = 4;
    setMatrix(newMatrix);
    setSteps([]);
  }, [height, width]);


  useEffect(() => {
    resetMatrix();
  }, [resetMatrix])



  const changeMatrixValue = (x: number, y: number, value: number, forceSync = false) => {
    if (forceSync) {
      setMatrix((prev) => {
        prev[x][y] = value;
        return prev;
      });
    } else {
      const newMatrix = matrix.map((row) => [...row]);
      newMatrix[x][y] = value;
      setMatrix(newMatrix);
    }
  };

  const runAlgorithm = () => {
    const startRow = matrix.findIndex((row) => row.includes(3));
    const startCol = matrix[startRow].findIndex((cell) => cell === 3);
    const start: [number, number] = [startRow, startCol];
    const endings = findAllEndingCells();
    const newMatrix = matrix.map((row) => [
      ...row.map((cell) => (cell === 5 ? false : true)),
    ]);
    console.log(algorithm)
    const { found, path, steps } = algorithm!.execute(
      newMatrix,
      start,
      endings
    );
      console.log (found, path, steps)
    setSteps(steps);
    setPath(path);
  };

  useEffect(() => {
    setCurrentStep(steps.length == 0 ? 0 : steps.length - 1);
  }, [steps]);

  
  const setCurrentStep = (step: number) => {
    if (step == 0) _setCurrentStep(0);
    if (step < 0 || step >= steps.length) return;
    _setCurrentStep(step);
  };


  useEffect(() => {
    const clearVisited = () => {
      const valuesToKeep = [3, 4, 5];
      const newMatrix = matrix.map((row) => row.map((cell) => (valuesToKeep.includes(cell) ? cell : 0)));
      setMatrix(newMatrix);
    };
    
    const nextStep = steps[currentStep];
    if (!nextStep) return;
    clearVisited();
    let lastVisitedSteps = nextStep.visited;
    let current = nextStep.node;
    for (let elem of Array.from(lastVisitedSteps)) {
      const [x, y] = elem.split(",").map((e) => parseInt(e));
      if (matrix[x][y] === 4 || matrix[x][y] === 3) continue;
      changeMatrixValue(x, y, 1, true);
    }

    if (currentStep === steps.length - 1) {
      showFinalPath();
    } else {
      const [x, y] = current;
      changeMatrixValue(x, y, 6, true);
    }
  }, [currentStep]);

  const showFinalPath = () => {
    for (let elem of path) {
      const [x, y] = elem;
      if (matrix[x][y] === 4 || matrix[x][y] === 3) continue;
      changeMatrixValue(x, y, 2, true);
    }
  };

  const findAllEndingCells = () => {
    const endingCells: [number, number][] = [];
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] === 4) {
          endingCells.push([i, j]);
        }
      }
    }
    return endingCells;
  };

  return (
    <>
      <Layout>
        <Options
          onAlgorithmChange={setAlgorithm}
          changeBrush={setBrush}
          brush={brush}
          runAlgorithm={runAlgorithm}
          reset={() => resetMatrix()}
          nextStep={() => setCurrentStep(currentStep + 1)}
          previousStep={() => setCurrentStep(currentStep - 1)}
        />
        <VisualizerComponent
          currentMatrix={matrix}
          changeCell={changeMatrixValue}
          brush={brush}
        />
      </Layout>
    </>
  );
};

export default Visualizer;

import Options from "@/components/Options";
import Layout from "@/components/Layout";
import VisualizerComponent from "@/components/VisualizerContainer";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    window.addEventListener("resize", () => {
      resize();
    });
    resize();
  }, []);


  const setCurrentStep = (step: number) => {
    if(step == 0) _setCurrentStep(0);
    if(step < 0 || step >= steps.length) return;
    _setCurrentStep(step);
  }

  const resize = () => {
    let realWidth = window.innerWidth - 250;
    let realHeight = window.innerHeight * 0.95 - 48;
    let cellSize = 25;

    if (realWidth > 350) {
      setWidth(Math.ceil(realWidth / cellSize));
    }
    if (realHeight > 200) {
      setHeight(Math.ceil(realHeight / cellSize));
    }
  };

  useEffect(() => {
    resetMatrix();
  }, [height, width]);

  const resetMatrix = () => {
    const newMatrix = Array.from({ length: height }, () =>
      Array.from({ length: width }, () => 0)
    );
    newMatrix[0][0] = 3;
    newMatrix[height - 1][width - 1] = 4;
    setMatrix((prev) => newMatrix)
    setSteps([]);
  };

  const clearVisited = () => {
    const valuesToKeep = [3, 4, 5];
    const newMatrix = matrix.map((row) => [...row.map((cell) => ( valuesToKeep.includes(cell) ? cell : 0))]);
    setMatrix(newMatrix);
  }

  const [matrix, setMatrix] = useState<number[][]>(
    Array.from({ length: height }, () => Array.from({ length: width }, () => 0))
  );

  const changeMatrixValueForceSync = (x: number, y: number, value: number) => {
    setMatrix((prev) => {
      prev[x][y] = value;
      return prev;
    })
  };

  const changeMatrixValue = (x: number, y: number, value: number) => {
    const newMatrix = matrix.map((row) => [...row]);
    newMatrix[x][y] = value;
    setMatrix(newMatrix);
  };

  const runAlgorithm = () => {
    const startRow = matrix.findIndex((row) => row.includes(3));
    const startCol = matrix[startRow].findIndex((cell) => cell === 3);
    const start: [number, number] = [startRow, startCol];
    const endings = findAllEndingCells();
    const newMatrix = matrix.map((row) => [
      ...row.map((cell) => (cell === 5 ? false : true)),
    ]);
    const { found, path, steps } = algorithm!.execute(
      newMatrix,
      start,
      endings
    );

    setSteps(steps);
    setPath(path);
  };

  useEffect(() => {
    setCurrentStep(steps.length == 0 ? 0 : steps.length - 1);
  }, [steps])


  useEffect(() => {
    const nextStep = steps[currentStep];
    if(!nextStep) return;
    clearVisited();
    let lastVisitedSteps = nextStep.visited;
    let current = nextStep.node;
    for (let elem of Array.from(lastVisitedSteps)) {
      const [x, y] = elem.split(",").map((e) => parseInt(e));
      if(matrix[x][y] === 4 || matrix[x][y] === 3) continue;
      changeMatrixValueForceSync(x, y, 1);
    }

    if (currentStep === steps.length - 1) {
      showFinalPath();
    } else {
      const [x, y] = current;
      changeMatrixValueForceSync(x, y, 6);
    }
  }, [currentStep]);






  const showFinalPath = () => {
    for (let elem of path) {
      const [x, y] = elem;
      if(matrix[x][y] === 4 || matrix[x][y] === 3) continue;
      changeMatrixValueForceSync(x, y, 2);
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
          nextStep = {() => setCurrentStep(currentStep + 1)}
          previousStep = {() => setCurrentStep(currentStep - 1)}
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

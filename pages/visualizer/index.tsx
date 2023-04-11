import Options from "@/components/Options";
import Layout from "@/components/Layout";
import VisualizerComponent from "@/components/VisualizerContainer";
import { useCallback, useEffect, useState } from "react";
import { Algorithm, Steps } from "@/models/Algorithm.model";
import { MazePreset } from "@/models/MazePreset.model";
import { cells } from "@/logic/cells";

const Visualizer = () => {
  const [algorithm, setAlgorithm] = useState<Algorithm | null>(null);
  const [playing, setPlaying] = useState(false);
  const [brush, setBrush] = useState(1);
  const [height, setHeight] = useState(14);
  const [width, setWidth] = useState(14);
  const [visited, setVisited] = useState<[number,number][]>([]);
  const [currentStep, _setCurrentStep] = useState(0);
  const [path, setPath] = useState<[number, number][]>([]);
  const [matrix, setMatrix] = useState<number[][]>(
    Array.from({ length: height }, () => Array.from({ length: width }, () => cells.empty.id)),
  );

  useEffect(() => {
    const resize = () => {
    const realWidth = window.innerWidth - 288;
    const realHeight = window.innerHeight * 0.95 - 120;
    const cellSize = 28;
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
    newMatrix[0][0] = cells.start.id;
    newMatrix[height - 1][width - 1] = cells.end.id;
    setMatrix(newMatrix);
    setVisited([]);
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
      if(matrix[x][y] != value) {
        const newMatrix = matrix.map((row) => row.map((cell) => (cell)));
        newMatrix[x][y] = value;
        setMatrix(newMatrix);
      }
    }
  };

  const runAlgorithm = () => {
    const startRow = matrix.findIndex((row) => row.includes(cells.start.id));
    const startCol = matrix[startRow].findIndex((cell) => cell === cells.start.id);
    const start: [number, number] = [startRow, startCol];
    const endings = findAllEndingCells();
    const newMatrix = matrix.map((row) => [
      ...row.map((cell) => (cell !== cells.wall.id)),
    ]);
    let { found, path, visited } = algorithm!.execute(
      newMatrix,
      start,
      endings,
    );
    visited = visited.filter((elem, index) => elem[0] != startRow || elem[1] != startCol);
    setVisited(v => {
      animateAlgorithm(visited).then(() => {
        console.log("done");
      });
      return visited;
    });
    setPath(path);
   
  };


  const animateAlgorithm = async (visited: [number, number][]) => {
    for(let i = 0; i < visited.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 35));
      _setCurrentStep(i);
    }
  };

  useEffect(() => {
    setCurrentStep(0);



  }, [visited]);

  
  const setCurrentStep = (step: number) => {
    if (step == 0) _setCurrentStep(0);
    if (step < 0 || step >= visited.length) return;
    console.log(step);
    _setCurrentStep(step);
  };


  useEffect(() => {
    const clearVisited = () => {
      const valuesToKeep = [cells.start.id, cells.end.id, cells.wall.id];
      const newMatrix = matrix.map((row) => row.map((cell) => (valuesToKeep.includes(cell) ? cell : cells.empty.id)));
      setMatrix(newMatrix);
    };
    
    const currentVisited = visited[currentStep];
    if (!currentVisited) return;
    clearVisited();


    for (let elem of Array.from(visited.slice(0, path.length > 0 ? currentStep  : currentStep + 1))) {
      const [x, y] = elem;
      if (matrix[x][y] === cells.start.id || matrix[x][y] === cells.end.id) continue;
      changeMatrixValue(x, y, cells.visited.id, true);
    }



    if (currentStep === visited.length - 1) {
      showFinalPath();
    } else {
      const [x, y] = currentVisited;
      changeMatrixValue(x, y, cells.current.id, true);
    }
  }, [currentStep]);

  const showFinalPath = () => {
    for (let elem of path) {
      const [x, y] = elem;
      if (matrix[x][y] === cells.start.id || matrix[x][y] === cells.end.id) continue;
      changeMatrixValue(x, y, cells.path.id, true);
    }
  };

  const findAllEndingCells = () => {
    const endingCells: [number, number][] = [];
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] === cells.end.id) {
          endingCells.push([i, j]);
        }
      }
    }
    return endingCells;
  };

  const setWalls = (walls: boolean[][]) => {
    setMatrix((prev) => {
      const valuesToKeep = [cells.start.id, cells.end.id];
      const newMatrix : number[][] = prev.map((row, i) => row.map((cell, j) => (walls[i][j] ? cells.wall.id : (valuesToKeep.includes(cell) ? cell : cells.empty.id))));
      newMatrix[0][0] = cells.start.id;
      newMatrix[height - 1][width - 1] = cells.end.id;
      return newMatrix;
    })
  }


  const generateMaze = (preset: MazePreset) => {
    const newMaze = preset.generate(height, width);
    setWalls(newMaze);
  }

  return (
    <>
      <Layout>
        <Options
          onAlgorithmChange={setAlgorithm}
          onGenerateMaze={(preset) => generateMaze(preset)}
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

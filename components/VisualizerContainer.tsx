import styles from "../styles/Visualizer.module.scss";
import { cells } from "@/logic/cells";
const VisualizerComponent = ({
  currentMatrix,
  changeCell,
  brush,
}: {
  currentMatrix: number[][];
  changeCell: (x: number, y: number, value: number) => void;
  brush: number;
}) => {
  


  return (
    <div
      className={styles.matrix}
      style={{ gridTemplateColumns: `repeat(${currentMatrix[0].length}, 1fr)`,
        gridTemplateRows: `repeat(${currentMatrix.length}, 1fr)`,
      }}
    >
      {currentMatrix.map((row, rowIndex) => {
        return currentMatrix[rowIndex].map((col, colIndex) => {
          return (
            <div
              className={`${styles.block} ${cells.findCellById(currentMatrix[rowIndex][colIndex]).class}`}
              key={rowIndex + "$" + colIndex}
              id={rowIndex + "$" + colIndex}
              onClick={() => changeCell(rowIndex, colIndex, brush)}
              onMouseOver={(e) => {
                if (e.buttons === 1) {
                    changeCell(rowIndex, colIndex, brush);
                }
            }}
            >
              {/* {rowIndex} {colIndex} */}
            </div>
          );
        });
      })}
    </div>
  );
};

export default VisualizerComponent;

import styles from "../styles/Visualizer.module.scss";

const VisualizerComponent = ({
  currentMatrix,
  changeCell,
  brush,
}: {
  currentMatrix: number[][];
  changeCell: (x: number, y: number, value: number) => void;
  brush: number;
}) => {
  const clases = [
    styles.empty,
    styles.visited,
    styles.path,
    styles.start,
    styles.end,
    styles.wall,
    styles.current
  ];
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
              className={`${styles.block} ${clases[col]}`}
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

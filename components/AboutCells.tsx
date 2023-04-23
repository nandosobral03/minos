import { cells } from "@/logic/cells";
import styles from "@/styles/About.module.scss";
const AboutCells = () => {
  const descriptions = {
    empty: "Empty cell, the algorithm can pass through it",
    wall: "Wall cell, the algorithm can't pathfind through it",
    start:
      "Start cell, the cell from which the algorithm starts pathfinding, at all points there can be only one start cell",
    end: "End cell, the cell to which the algorithm pathfinds, there can be multiple end cells and the algorithms will pathfind to any of them",
    visited: "Visited cell, the cell that the algorithm has visited",
    path: "Path cell, the cell that is part of the path that the algorithm has found to reach the end cell",
    current: "Current cell, the cell that the algorithm is currently visiting",
  };

  const cellsArray = Object.keys(cells)
    .filter((key) => typeof (cells as any)[key] === "object")
    .map((key) => {
      return {
        name: key,
        class: (cells as any)[key].class,
        color: (cells as any)[key].color,
        description: (descriptions as any)[key],
      };
    });

  return (
    <div className={styles.container}>
        <h1 className={styles.cellTitle}>Cells</h1>
      <div className={styles.aboutContainer}>
        {cellsArray.map((cell, index) => {
          return (
            <div key={index}>
              <div className={styles.cellDescription}>
                <div className={`${styles.cell} ${cell.class}`}></div>
                <div className={styles.cellName}>{cell.description}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AboutCells;

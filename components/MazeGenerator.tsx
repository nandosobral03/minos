import { MazePreset } from "@/models/MazePreset.model";
import { useEffect, useState } from "react";
import styles from "@/styles/Options.module.scss";

const MazeGenerator = ({
  onGenerateMaze,
}: {
  onGenerateMaze: (preset: MazePreset) => void;
}) => {
  const presets: MazePreset[] = require("@/logic/maze").default;
  const [mazePreset, setMazePreset] = useState<string>(presets[0].name);

  const generateMaze = () => {
    const preset = presets.find((preset) => preset.id === mazePreset);
    if (preset) {
      onGenerateMaze(preset);
    }
  };


  useEffect(() => {
    setMazePreset(presets[0].id);
  }, []);

  return (
    <>
      <select onChange={(e) => setMazePreset(e.target.value)} className={styles.select}>
        {presets.map((preset: MazePreset) => {
          return (
            <option value={preset.id} key={preset.id}>
              {preset.name}
            </option>
          );
        })}
      </select>
      <button onClick={() => generateMaze()} className={`${styles.button}`}> 
        <span className="material-symbols-outlined">dashboard</span>
       </button>
    </>
  );
};

export default MazeGenerator;

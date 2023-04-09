import { MazePreset } from "@/models/MazePreset.model";
import { useState } from "react";

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

  return (
    <>
      <select onChange={(e) => setMazePreset(e.target.value)}>
        {presets.map((preset: MazePreset) => {
          return (
            <option value={preset.id} key={preset.id}>
              {preset.name}
            </option>
          );
        })}
      </select>
      <button onClick={() => generateMaze()}>Generate Maze</button>
    </>
  );
};

export default MazeGenerator;

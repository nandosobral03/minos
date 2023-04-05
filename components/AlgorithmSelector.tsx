const AlgorithmSelector = ({
  onAlgorithmChange,
}: {
  onAlgorithmChange: (algorithm: Algorithm | null) => void;
}) => {
    const algorithms = require("@/logic/algorithms").default;
    console.log(algorithms)
    const getAlgorithm = (algorithm: string) => {
   
  };
  return (
    <>
      <select onChange={(e) => {getAlgorithm(e.target.value)}}>
        <option value="bfs">Breadth First Search</option>
        <option value="dfs">Depth First Search</option>
        <option value="dijkstra">Dijkstra's Algorithm</option>
      </select>
    </>
  );
};

export default AlgorithmSelector;

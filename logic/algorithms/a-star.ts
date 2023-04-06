import { Steps } from "@/models/Algorithm.model";

const execution = (vals: boolean[][], start: [number, number], end: [number, number][]): 
{
    steps: Steps[],
    found: boolean,
    path: [number, number][]
} => {
    const openSet = new Set([start.join(",")]);
    const cameFrom = new Map<string, string>();
    const gScore = new Map<string, number>([[`${start[0]},${start[1]}`, heuristic(start, end)]]);
    const fScore = new Map([[`${start[0]},${start[1]}`, heuristic(start, end)]]);
    const visited = new Set<string>();
    const steps = [];
  while (openSet.size > 0) {
    const current = Array.from(openSet).reduce(
      (a, b) => (fScore.get(a)! < fScore.get(b)! ? a : b)
    );
    let ending = end.find(([x, y]) => current === `${x},${y}`);
    if (ending) {
      console.log(cameFrom)
        console.log("found")
        
      return {
        path: reconstructPath(cameFrom, ending),
        steps: steps,
        found: true
      }
    }
    if(!vals[ +current.split(",")[0] ] || !vals[ +current.split(",")[0] ][ +current.split(",")[1] ]){
        openSet.delete(current);
        continue
    }
    if(visited.has(current)){
        openSet.delete(current);
        continue
    }
    visited.add(current);
    openSet.delete(current);
    steps.push({ node: current.split(",").map(Number) as [number, number] 
      
      , visited: new Set(visited), step: steps.length });

    for (const neighbor of neighbors(current.split(",").map(Number) as [number, number], vals)) {
      const tentativeGScore = gScore.get(current)! + 1;
      const neighborKey = `${neighbor[0]},${neighbor[1]}`
      if(neighborKey === "0,0") {
        console.log("neighbor", neighbor)
        console.log("neighborKey", neighborKey)
        console.log("current", current)
        console.log("tentativeGScore", tentativeGScore)
        console.log("gScore.get(neighborKey)", gScore.get(neighborKey))
        
      }
      if (tentativeGScore < (gScore.get(neighborKey) || Infinity)) {
          cameFrom.set(neighborKey, current);
          gScore.set(neighborKey, tentativeGScore);
          fScore.set(
            neighborKey,
              tentativeGScore + heuristic(neighbor, end)
          );
          openSet.add(neighborKey);
      }
    }
  }
console.log("not found")
  return {steps: [], path: [], found: false}
}


const reconstructPath = (cameFrom: Map<string, string>, current: [number, number]) => {
    console.log("reconstructing path", cameFrom, current)
    let curr = current.join(",");
    const totalPath = [current];
    while (cameFrom.has(curr)) {
        console.log("curr", curr)
        console.log("cameFrom.get(curr)", cameFrom.get(curr))
        curr = cameFrom.get(curr)!;
        totalPath.push(curr.split(",").map(Number) as [number, number]);
    }
    console.log(totalPath)
    return totalPath.reverse();
}

const neighbors = (a: [number, number], vals: boolean[][]) : [number, number][] => {
    let directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    const neighbors: [number, number][] = [];
    const [x, y] = a;
    for(let [dx, dy] of directions){
            if(vals[x + dx] && vals[x + dx][y + dy]){
                neighbors.push([x + dx, y + dy])
            }
        }
    
    return neighbors;
}



const  heuristic = (a: [number, number], b: [number, number][]) => {
    let bestHeuristic = Infinity;
    for(let end of b ){
        let [x, y] = end
        bestHeuristic = Math.min(bestHeuristic, manhattan(a, x, y));
    }
    return bestHeuristic;
}

const manhattan = (a: [number, number], x: number, y: number) => {
    return Math.abs(a[0] - x) + Math.abs(a[1] - y);
}

export default execution;
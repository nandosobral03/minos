const execution = (vals: boolean[][], start: [number, number], end: [number, number][]): {
    found: boolean,
    path: [number, number][]
    visited: [number, number][],

} => {
    const possibleEnds = end.map(([x, y]) => `${x},${y}`);
    const visited = new Set<string>();
    const visitedArray: [number, number][] = [];
    const path: [number, number][] = [start];
    let current = start;
    visited.add(`${current[0]},${current[1]}`);
    visitedArray.push(current);

    while (!possibleEnds.includes(`${current[0]},${current[1]}`)) {
        const neighbors: [number, number][] = [];
        if (current[0] > 0 && !visited.has(`${current[0] - 1},${current[1]}`) && vals[current[0] - 1][current[1]]) {
            neighbors.push([current[0] - 1, current[1]]);
        }
        if (current[0] < vals.length - 1 && !visited.has(`${current[0] + 1},${current[1]}`) && vals[current[0] + 1][current[1]]) {
            neighbors.push([current[0] + 1, current[1]]);
        }
        if (current[1] > 0 && !visited.has(`${current[0]},${current[1] - 1}`) && vals[current[0]][current[1] - 1]) {
            neighbors.push([current[0], current[1] - 1]);
        }
        if (current[1] < vals[0].length - 1 && !visited.has(`${current[0]},${current[1] + 1}`) && vals[current[0]][current[1] + 1]) {
            neighbors.push([current[0], current[1] + 1]);
        }

        if (neighbors.length === 0) {
            // No unvisited neighbors, so backtrack to last visited cell
            path.pop();
            current = path[path.length - 1];
            if(!current) return {
                path,
                visited: visitedArray,
                found: false
            }
        } else {
            // Choose closest unvisited neighbor as next cell in path
            let closest: [number, number] = neighbors[0];
            let closestDistance = distance(closest, end);
            for (let i = 1; i < neighbors.length; i++) {
                const neighbor = neighbors[i];
                const neighborDistance = distance(neighbor, end);
                if (neighborDistance < closestDistance) {
                    closest = neighbor;
                    closestDistance = neighborDistance;
                }
            }


            path.push(closest);
            current = closest;
            visited.add(`${current[0]},${current[1]}`);
            visitedArray.push(current);

        }

    }

    return {
        path,
        visited: visitedArray,
        found: true
    }
}

function distance(a: [number, number], b: [number, number][]): number {
    let min = Infinity;
    for (let i = 0; i < b.length; i++) {
        const [x, y] = b[i];
        const distance = Math.abs(a[0] - x) + Math.abs(a[1] - y);
        if (distance < min) {
            min = distance;
        }
    }
    return min;
}



export default execution;

const execution = (vals: boolean[][], start: [number, number], end: [number, number][]): 
{
    found: boolean,
    path: [number, number][],
    visited: [number, number][]
} => {
    const possibleEnds = end.map(([x, y]) => `${x},${y}`);
    const visited = new Set<string>();
    const visitedArray: [number, number][] = [];
    const stack = [start];
    const path = []
    let found    = false
    while (stack.length > 0) {
        const node = stack.shift()!;
        const [x, y] = node;
        const key = `${x},${y}`;

        if (possibleEnds.includes(key)) {
            path.push(node)
            found = true
            break;
        }

        if (vals[x][y] && !visited.has(key)) {
            path.push(node)
            visited.add(key);
            visitedArray.push(node)
            if (x > 0) {
                stack.push([x - 1, y]);
            }
            if (y > 0) {
                stack.push([x, y - 1]);
            }
            if (x < vals.length - 1) {
                stack.push([x + 1, y]);
            }
            if (y < vals[0].length - 1) {
                stack.push([x, y + 1]);
            }
        }
    }

    return { path, found, visited: visitedArray};
}





export default execution;
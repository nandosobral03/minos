import { Steps } from "@/models/Algorithm.model";

const execution = (vals: boolean[][], start: [number, number], end: [number, number][]): 
{
    steps: Steps[],
    found: boolean,
    path: [number, number][]
} => {
    const possibleEnds = end.map(([x, y]) => `${x},${y}`);
    const steps = [];
    const visited = new Set<string>();
    const stack = [start];
    const path = []
    let found    = false
    while (stack.length > 0) {
        const node = stack.shift()!;
        const [x, y] = node;
        const key = `${x},${y}`;

        if (possibleEnds.includes(key)) {
            steps.push({ node, visited: new Set(visited), step: steps.length });
            path.push(node)
            found = true
            break;
        }

        if (vals[x][y] && !visited.has(key)) {
            steps.push({ node, visited: new Set(visited), step: steps.length });
            path.push(node)
            visited.add(key);
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

    return {steps, path, found}
}





export default execution;
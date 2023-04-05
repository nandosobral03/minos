import { Steps } from "@/models/Algorithm.model";

const execution = (vals: boolean[][], start: [number, number], end: [number, number]): Steps[] => {
    const steps: Steps[] = [];
    const visited = new Set<string>();
    const stack: [number, number][] = [start];

    while (stack.length > 0) {
        const node = stack.pop()!;
        steps.push({ node, visited: new Set(visited), step: steps.length });
        const [x, y] = node;
        const key = `${x},${y}`;

        if (key === `${end[0]},${end[1]}`) {
            break;
        }

        if (vals[x][y] && !visited.has(key)) {
            visited.add(key);
            // Add unvisited adjacent nodes to the stack
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

    return steps
}






export default execution;
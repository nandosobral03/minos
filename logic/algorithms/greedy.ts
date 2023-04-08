import { Steps } from "@/models/Algorithm.model";
import Heap from "heap-js";


const execution = (vals: boolean[][], start: [number, number], end: [number, number][]): 
{
    steps: Steps[],
    found: boolean,
    path: [number, number][]
} => {
    const possibleEnds = end.map(([x, y]) => `${x},${y}`);
    const steps = [];
    const visited = new Set<string>();
    const comparator = (a: [number, number], b: [number, number]) => {
            let closestEndToA = Infinity
            let closestEndToB = Infinity
            for (let i = 0; i < end.length; i++) {
                const [x, y] = end[i]
                const distanceToA = manhattanDistance(a, [x, y])
                const distanceToB = manhattanDistance(b, [x, y])
                if (distanceToA < closestEndToA) {
                    closestEndToA = distanceToA
                }
                if (distanceToB < closestEndToB) {
                    closestEndToB = distanceToB
                }
            }
            return closestEndToA - closestEndToB
    }

    const prev = new Map<string, [number, number]>()

    const priorityQueue = new Heap<[number, number]>(comparator)
    let found = false;
    priorityQueue.push(start);


    while(priorityQueue.length > 0) {
        const node = priorityQueue.pop()!
        const [x, y] = node;
        const key = `${x},${y}`;
        if (possibleEnds.includes(key)) {
            steps.push({ node, visited: new Set(visited), step: steps.length });
            found = true;
            break;
        }

        if (vals[x][y]) {

            steps.push({ node, visited: new Set(visited), step: steps.length });
            visited.add(key);
            if (x > 0 && !visited.has(`${x - 1},${y}`)) {
                prev.set(`${x - 1},${y}`, [x, y])
                priorityQueue.push([x - 1, y]);
            }
            if (y > 0 && !visited.has(`${x},${y - 1}`)) {
                prev.set(`${x},${y - 1}`, [x, y])
                priorityQueue.push([x, y - 1]);
            }
            if (x < vals.length - 1 && !visited.has(`${x + 1},${y}`)) {
                prev.set(`${x + 1},${y}`, [x, y])
                priorityQueue.push([x + 1, y]);
            }
            if (y < vals[0].length - 1 && !visited.has(`${x},${y + 1}`)) {
                prev.set(`${x},${y + 1}`, [x, y])
                priorityQueue.push([x, y + 1]);
            }
        }
    }

    if(found) {
        const path = []
        let current = steps[steps.length - 1].node
        while (current[0] !== start[0] || current[1] !== start[1]) {
            path.push(current)
            current = prev.get(`${current[0]},${current[1]}`)!
        }
        return {
            steps,
            found: true,
            path
        }
    }
    else{
        return {
            steps,
            found: false,
            path: []
        }
    }
 
}

const manhattanDistance = (a: [number, number], b: [number, number]) => {
    return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1])
}





export default execution;
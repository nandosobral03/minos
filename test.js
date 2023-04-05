
const execution = (vals, start, end) => {
    const steps = [];
    const visited = new Set();
    const stack = [start];
    const path = []
    let found    = false
    while (stack.length > 0) {
        const node = stack.pop();
       
        const [x, y] = node;
        const key = `${x},${y}`;

        if (key === `${end[0]},${end[1]}`) {
            steps.push({ node, visited: new Set(visited), step: steps.length });
            path.push(node)
            found = true
            break;
        }

        if (vals[x][y] && !visited.has(key)) {
            steps.push({ node, visited: new Set(visited), step: steps.length });
            path.push(node)
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

    return {steps, path, found}
}



let matrix = [
    [true, true, true, false, true],
    [false, true, true, true, true],
    [true, true, true, true, true],
    [true, true, true, true, true], 
    [true, true, true, true, true]    
]

let  start = [0, 0]
let end = [0, 4]

console.log(execution(matrix, start, end))


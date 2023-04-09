import { Algorithm } from "@/models/Algorithm.model"

const algorithms: Algorithm[] = [
    {
        name: "DFS",
        description: "Depth First Search",
        code: "dfs",
        language: "typescript",
        execute: (input: boolean[][], start: [number, number], end: [number, number][]) => {
            return require("@/logic/algorithms/dfs").default(input, start, end)
        }
    },
    {
        name: "BFS",
        description: "Breadth First Search",
        code: "bfs",
        language: "typescript",
        execute: (input: boolean[][], start: [number, number], end: [number, number][]) => {
            return require("@/logic/algorithms/bfs").default(input, start, end)
        }
    },
    {
        name: "a-star",
        description: "A* Search",
        code: "a-star",
        language: "typescript",
        execute: (input: boolean[][], start: [number, number], end: [number, number][]) => {
            return require("@/logic/algorithms/a-star").default(input, start, end)
        }
    },
    {
        name: "dijkstra",
        description: "Dijkstra's Algorithm",
        code: "dijkstra",
        language: "typescript",
        execute: (input: boolean[][], start: [number, number], end: [number, number][]) => {
            return require("@/logic/algorithms/dijkstra").default(input, start, end)
        }
    },
    {
        name: "greedy",
        description: "Greedy Best First Search",
        code: "greedy",
        language: "typescript",
        execute: (input: boolean[][], start: [number, number], end: [number, number][]) => {
            return require("@/logic/algorithms/greedy").default(input, start, end)
        }
    }

]

export default algorithms
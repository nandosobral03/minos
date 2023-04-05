import { Algorithm } from "@/models/Algorithm.model"

const algorithms: Algorithm[] = [
    {
        name: "DFS",
        description: "Depth First Search",
        code: "dfs",
        language: "typescript",
        execute: (input: boolean[][], start: [number, number], end: [number, number]) => {
            return require("@/logic/algorithms/dfs").default(input)
        }
    }

]

export default algorithms
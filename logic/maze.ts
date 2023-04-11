 const mazePresets = [
    {
        id: "random",
        name: "Random",
        generate: (height: number, width: number): boolean[][] => {
            const initial = Array(height).fill(Array(width).fill(0));
            const maze = initial.map((row, x) => row.map(() => Math.random() > 0.5));
            return maze;
        }
    },
    {
        id: "kruskal",
        name: "Kruskal",
        generate: (height: number, width: number): boolean[][] => {
            return require("@/logic/mazes/kruskal").generate(width, height, [0, 0], [width - 1, height - 1]);
        }
    },
    {
        id: "recursive-division",
        name: "Recursive Division",
        generate: (height: number, width: number): boolean[][] => {
            return require("@/logic/mazes/recursive-division").generate(width, height, [0, 0], [width - 1, height - 1]);
        }
    }
]

export default mazePresets;
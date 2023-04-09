const mazePresets = [
    {
        id: "random",
        name: "Random",
        generate: (width: number, height: number): boolean[][] => {
            const initial = Array(width).fill(Array(height).fill(0));
            const maze = initial.map((row, x) => row.map(() => Math.random() > 0.5));
            return maze;
        }
    },
    {
        id: "kruskal",
        name: "Kruskal",
        generate: (width: number, height: number): boolean[][] => {
            return require("@/logic/mazes/kruskal").generate(height, width, [0, 0], [height - 1, width - 1]);
        }
    }
]

export default mazePresets;
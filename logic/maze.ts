const mazePresets = [
    {
        id: "random",
        name: "Random",
        generate: (width: number, height: number): boolean[][] => {
            const initial = Array(width).fill(Array(height).fill(0));
            const maze = initial.map((row, x) => row.map(() => Math.random() > 0.5));
            return maze;
        }
    }
]

export default mazePresets;
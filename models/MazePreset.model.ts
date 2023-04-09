export interface MazePreset {
    id: string,
    name: string,
    generate: (width: number, height: number) => boolean[][]
}
export interface Algorithm {
    name: string;
    description: string;
    code: string;
    language: string;
    execute: (vals:boolean[][], start: [number, number], end: [number, number][]) =>{
    found: boolean,
    path: [number, number][],
    visited: [number, number][]
}
}

export interface Steps {
    node: [number, number];
}
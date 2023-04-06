export interface Algorithm {
    name: string;
    description: string;
    code: string;
    language: string;
    execute: (vals:boolean[][], start: [number, number], end: [number, number][]) =>{steps: Steps[],
    found: boolean,
    path: [number, number][]}
}

export interface Steps {
    step: number;
    node: [number, number];
    visited: Set<string>;

    
}
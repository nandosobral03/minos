export interface Algorithm {
    name: string;
    description: string;
    code: string;
    language: string;
    execute: (vals:boolean[][], start: [number, number], end: [number, number]) => Steps[];
}

export interface Steps {
    step: number;
    node: [number, number];
    visited: Set<string>;

    
}
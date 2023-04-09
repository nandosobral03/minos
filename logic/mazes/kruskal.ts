
  function find(cell: [number,number], parent: Map<string, string>): [number,number] {
    let current = cell.join(",");
    while (parent.get(current) !== current) {
      current = parent.get(current)!;
    }
    return current.split(",").map((x) => parseInt(x)) as [number,number];
  }
  
  export function generate(width: number, height: number, start: [number,number], end: [number,number]): boolean[][] {
    const walls: boolean[][] = [];
    
    // Initialize the walls grid with all walls present
    for (let i = 0; i < height; i++) {
      walls[i] = [];
      for (let j = 0; j < width; j++) {
        walls[i][j] = true;
      }
    }
  
    const parent = new Map<string, string>();
  
    // Initialize each cell as its own parent
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        parent.set([i, j].join(","), [i, j].join(","));
      }
    }
  
    const edges: { a: [number,number]; b: [number,number] }[] = [];
  
    // Add all the vertical walls to the edges list
    for (let i = 0; i < height; i++) {
      for (let j = 1; j < width; j++) {
        edges.push({ a: [i, j - 1], b: [i, j] });
      }
    }
  
    // Add all the horizontal walls to the edges list
    for (let i = 1; i < height; i++) {
      for (let j = 0; j < width; j++) {
        edges.push({  a: [i - 1, j], b: [i, j] });
      }
    }
  
    // Shuffle the edges randomly
    edges.sort(() => Math.random() - 0.5);
  
    // For each edge, check if the cells it connects have the same parent
    // If they do not have the same parent, remove the wall and merge the sets
    for (let i = 0; i < edges.length; i++) {
      const { a, b } = edges[i];
      const parentA = find(a, parent).join(",");
      const parentB = find(b, parent).join(",");
      if (parentA !== parentB) {
        walls[a[0]][a[1]] = false;
        parent.set(parentA, parentB);
      }
    }

  
    // Set start and end points
    walls[start[0]][start[1]] = false;
    walls[end[1]][end[0]] = false;
  
    return walls;
  }

export const generate = (width: number, height: number, start:[number, number], end:[number, number]): boolean[][] => {
    // Create a two-dimensional array to represent the maze
    const maze: boolean[][] = [];
    for (let i = 0; i < height; i++) {
      maze[i] = new Array(width).fill(true);
    }
  
    // Define a recursive function to divide the maze
    const divide = (x1: number, y1: number, x2: number, y2: number) => {
      // Calculate the width and height of the current section
      const sectionWidth = x2 - x1 + 1;
      const sectionHeight = y2 - y1 + 1;
  
      // If the section is too small, stop dividing
      if (sectionWidth < 2 || sectionHeight < 2) {
        return;
      }
  
      // Choose a random orientation (horizontal or vertical)
      const horizontal = Math.random() < 0.5;
  
      // Choose a random position to create a passage
      const x = x1 + Math.round(Math.random() * (sectionWidth - 1));
      const y = y1 + Math.round(Math.random() * (sectionHeight - 1));
  
      // Carve the passage
      if (horizontal) {
        for (let i = x1; i <= x2; i++) {
          maze[y][i] = false;
        }
        divide(x1, y1, x2, y - 1);
        divide(x1, y + 1, x2, y2);
      } else {
        for (let i = y1; i <= y2; i++) {
          maze[i][x] = false;
        }
        divide(x1, y1, x - 1, y2);
        divide(x + 1, y1, x2, y2);
      }
    };
    // Start dividing the maze
    divide(0, 0, width - 1, height - 1);
  
    // Set the start and end positions
    maze[start[1]][start[0]] = false;
    maze[end[1]][end[0]] = false;
    //Make all direct neighbors of start and end positions open
    if (start[0] > 0) {
        maze[start[1]][start[0] - 1] = false;
    }
    if (start[0] < width - 1) {
        maze[start[1]][start[0] + 1] = false;
    }
    if (start[1] > 0) { 
        maze[start[1] - 1][start[0]] = false;
    }
    if (start[1] < height - 1) {
        maze[start[1] + 1][start[0]] = false;
    }
  
    return maze;
  };
  
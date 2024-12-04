export const GRID_SIZE = 5;
export const JEWEL_TYPES = ['red', 'blue', 'green', 'yellow', 'purple'];

export function generateRandomJewel() {
  return JEWEL_TYPES[Math.floor(Math.random() * JEWEL_TYPES.length)];
}

export function createInitialGrid() {
  return Array.from({ length: GRID_SIZE }, () =>
    Array.from({ length: GRID_SIZE }, generateRandomJewel)
  );
}

export function checkForMatches(grid: string[][]) {
  const matches: [number, number][] = [];

  // Check horizontal matches
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE - 2; j++) {
      if (grid[i][j] === grid[i][j + 1] && grid[i][j] === grid[i][j + 2]) {
        matches.push([i, j], [i, j + 1], [i, j + 2]);
      }
    }
  }

  // Check vertical matches
  for (let i = 0; i < GRID_SIZE - 2; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      if (grid[i][j] === grid[i + 1][j] && grid[i][j] === grid[i + 2][j]) {
        matches.push([i, j], [i + 1, j], [i + 2, j]);
      }
    }
  }

  return matches;
}


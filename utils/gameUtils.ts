export const GRID_SIZE = 5;
export const JEWEL_TYPES = ['red', 'blue', 'green', 'yellow', 'purple'];

export function generateRandomJewel(avoid1?: string, avoid2?: string) {
  const available = JEWEL_TYPES.filter(type => type !== avoid1 && type !== avoid2);
  return available[Math.floor(Math.random() * available.length)];
}

export function createInitialGrid() {
  const grid = Array.from({ length: GRID_SIZE }, () =>
    Array.from({ length: GRID_SIZE }, () => '')
  );

  // Fill grid avoiding three in a row
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      let attempts = 0;
      let jewel;
      
      do {
        // Get previous two horizontal and vertical jewels
        const h1 = j >= 2 ? grid[i][j - 2] : null;
        const h2 = j >= 1 ? grid[i][j - 1] : null;
        const v1 = i >= 2 ? grid[i - 2][j] : null;
        const v2 = i >= 1 ? grid[i - 1][j] : null;

        // Avoid creating matches
        const horizontalMatch = h1 && h2 && h1 === h2;
        const verticalMatch = v1 && v2 && v1 === v2;

        if (horizontalMatch) {
          jewel = generateRandomJewel(h1);
        } else if (verticalMatch) {
          jewel = generateRandomJewel(v1);
        } else {
          jewel = generateRandomJewel();
        }

        attempts++;
        // Prevent infinite loop
        if (attempts > 10) {
          jewel = JEWEL_TYPES[Math.floor(Math.random() * JEWEL_TYPES.length)];
          break;
        }
      } while (checkForMatches(grid).length > 0);

      grid[i][j] = jewel;
    }
  }

  return grid;
}

export function checkForMatches(grid: string[][]) {
  const matches: [number, number][] = [];

  // Check horizontal matches
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE - 2; j++) {
      const current = grid[i][j];
      const next1 = grid[i][j + 1];
      const next2 = grid[i][j + 2];

      if (current && current === next1 && current === next2) {
        matches.push([i, j], [i, j + 1], [i, j + 2]);
      }
    }
  }

  // Check vertical matches
  for (let i = 0; i < GRID_SIZE - 2; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      const current = grid[i][j];
      const next1 = grid[i + 1][j];
      const next2 = grid[i + 2][j];

      if (current && current === next1 && current === next2) {
        matches.push([i, j], [i + 1, j], [i + 2, j]);
      }
    }
  }

  // Remove duplicates
  return Array.from(new Set(matches.map(m => `${m[0]},${m[1]}`)))
    .map(str => {
      const [i, j] = str.split(',').map(Number);
      return [i, j] as [number, number];
    });
}

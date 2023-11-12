function getNeighbors(row, col, matrix) {
  let validNeighbors = [];

  let neigbors = [
    // Check top
    [row - 1, col],
    // Check top right
    [row - 1, col + 1],
    // Check right
    [row, col + 1],
    // Check bottom right
    [row + 1, col + 1],
    // Check bottom
    [row + 1, col],
    // Check bottom left
    [row + 1, col - 1],
    // Check left
    [row, col - 1],
    // Check top left
    [row - 1, col - 1],
  ];

  for (let neighbor of neigbors) {
    let [currRow, currCol] = neighbor;

    if (
      currRow >= 0 &&
      currRow <= matrix.length - 1 &&
      currCol >= 0 &&
      currCol <= matrix[row].length - 1
    ) {
      if (matrix[currRow][currCol] === 1) {
        validNeighbors.push(neighbor);
      }
    }
  }
  return validNeighbors;
}

function countIslands(matrix) {
  // Create a visited set to store visited nodes
  let visited = new Set();

  // Initialize count to 0
  let islandCount = 0;

  // Iterate through all indices in matrix
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[0].length; col++) {
      // If an index contains a 1 and has not been visited,
      if (matrix[row][col] === 1 && !visited.has([row, col].toString())) {
        // DO THE THING (increment island count by 1)
        islandCount++;

        // Initialize a stack with current index
        let stack = [[row, col]];
        // Add stringified version of current index to the visited set
        visited.add([row, col].toString());
        // While stack contains elements
        while (stack.length) {
          // Pop element from stack
          let node = stack.pop();

          let [newRow, newCol] = node;

          // Get valid neighbors of current element
          let newNeighbors = getNeighbors(newRow, newCol, matrix);

          newNeighbors.forEach((newNeighbor) => {
            if (!visited.has(newNeighbor.toString())) {
              stack.push(newNeighbor);
              visited.add(newNeighbor.toString());
            }
          });
        }
      }
    }
  }
  return islandCount;
}

// Uncomment the lines below for local testing
const matrix = [
  [1, 1, 1, 0, 0],
  [0, 1, 1, 0, 1],
  [0, 1, 1, 0, 1],
];

// console.log(getNeighbors(1, 1, matrix)); // [[0, 0], [0, 1], [0, 2], [1, 2], [2, 1], [2, 2]]
// console.log(getNeighbors(2,4, matrix)) // [[1,4]]

const matrix2 = [
  [1, 1, 1, 0, 1],
  [0, 0, 0, 0, 1],
  [1, 0, 0, 1, 0],
];

console.log(countIslands(matrix)); // 2
console.log(countIslands(matrix2)); // 3

module.exports = [countIslands, getNeighbors];

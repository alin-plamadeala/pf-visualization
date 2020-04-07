/**
 * Creating the 2D Array
 **/
function createGrid() {
  grid = [];

  for (var i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j);
    }
  }

  start = grid[START_COL][START_ROW];
  end = grid[END_COL][END_ROW];
}

/**
 * Reconstruct the path from the end cell according to cameFrom value.
 *  @param {Cell} cell end cell
 *  @return {Array<{Cell}>} the path
 */
function backtrace(cell) {
  var path = [cell];
  while (cell.cameFrom) {
    cell = cell.cameFrom;
    path.push(cell);
  }
  return path.reverse();
}

/**
 * Reconstruct the path from both start and end cells
 *  @param {Cell} nodeA
 *  @param {Cell} nodeB
 *  @return {Array<{Cell}>} the path
 */
function biBacktrace(nodeA, nodeB) {
  var pathA = backtrace(nodeA),
    pathB = backtrace(nodeB);

  console.log("pathA", pathA);
  console.log("pathB", pathB);

  return pathB.concat(pathA.reverse());
}

/**
 * Removes an element from array
 *  @param {Array<Cell>} arr The array
 *  @param {Cell} elt The element to be removed
 */
function removeFromArray(arr, elt) {
  for (var i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == elt) {
      arr.splice(i, 1);
    }
  }
}

/**
 * Resets the grid to the initial state
 */
function resetGrid() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].f = Infinity;
      grid[i][j].g = Infinity;
      grid[i][j].h = Infinity;
      grid[i][j].opened = undefined;
      grid[i][j].closed = undefined;
      grid[i][j].neighbours.length = 0;
      grid[i][j].cameFrom = undefined;
    }
  }
  steps = 0;
  path.length = 0;
  initialized = true;
  start.obstacle = false;
  end.obstacle = false;
}
/**
 * Sets the status of the Pathfinder to finished
 */
function setFinish() {
  running = false;
  initialized = false;
  finished = true;
  toggleControls();
  $controlButton.toggleClass("active");
}
/**
 * Calculate the length of the path.
 * @param {Array<{x: Number, y: Number}>} path The path containing Cell objects
 * @return {number} The length of the path
 */
function calcPathLength(path) {
  var sum = 0,
    a,
    b;
  for (i = 1; i < path.length; ++i) {
    a = path[i - 1];
    b = path[i];
    dx = a.x - b.x;
    dy = a.y - b.y;
    sum += Math.sqrt(dx * dx + dy * dy);
  }
  return sum;
}
/**
 * Calculate the stats required and call the drawStats() function
 */
function computeStats() {
  var algorithm = algorithmList[algorithmIndex].name;
  var heuristic = selectedHeuristic.name;
  var pathLength = calcPathLength(path);

  drawStats(algorithm, heuristic, pathLength, steps);
}

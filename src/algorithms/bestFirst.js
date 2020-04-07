var initialized = false;

/**
 * Best First path-finder used by p5js draw() method
 * Uses A*.
 */
function BestFirstFinder(grid, start, end, heuristics) {
  AStarFinder(grid, start, end, function (x, y) {
    return heuristics(x, y) * 1000000;
  });
}
/**
 * Best First path-finder
 * Uses A*.
 */
function BestFirstFinderFast(grid, start, end, heuristics) {
  AStarFinderFast(grid, start, end, function (x, y) {
    return heuristics(x, y) * 1000000;
  });
}

var initialized = false;
var DijkstraHeur = function (x, y) {
  return 0;
};
/**
 * Dijkstra path-finder used by p5js draw() method.
 * Uses A*
 */
function DijkstraFinder(grid, start, end, heuristics) {
  AStarFinder(grid, start, end, DijkstraHeur);
}
/**
 * Dijkstra path-finder.
 * Uses A*
 */
function DijkstraFinderFast(grid, start, end, heuristics) {
  AStarFinderFast(grid, start, end, DijkstraHeur);
}

var initialized = false;
var DijkstraHeur = function (x, y) {
  return 0;
};
/**
 * Bi-directional Dijkstra path-finder used by p5js draw() method.
 * Uses Bi-directional A*
 */
function BiDijkstraFinder(grid, start, end, heuristics) {
  BiAStarFinder(grid, start, end, DijkstraHeur);
}
/**
 * Bi-directional Dijkstra path-finder.
 * Uses Bi-directional A*
 */
function BiDijkstraFinderFast(grid, start, end, heuristics) {
  BiAstarFinderFast(grid, start, end, DijkstraHeur);
}

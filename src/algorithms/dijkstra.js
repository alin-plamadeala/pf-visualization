var initialized = false;
var DijkstraHeur = function (x, y) {
  return 0;
};

function DijkstraFinder(grid, start, end, heuristics) {
  AStarFinder(grid, start, end, DijkstraHeur);
}
function DijkstraFinderFast(grid, start, end, heuristics) {
  AStarFinderFast(grid, start, end, DijkstraHeur);
}

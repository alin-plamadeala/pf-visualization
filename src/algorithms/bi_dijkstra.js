var initialized = false;
var DijkstraHeur = function (x, y) {
  return 0;
};

function BiDijkstraFinder(grid, start, end, heuristics) {
  BiAStarFinder(grid, start, end, DijkstraHeur);
}
function BiDijkstraFinderFast(grid, start, end, heuristics) {
  BiAstarFinderFast(grid, start, end, DijkstraHeur);
}

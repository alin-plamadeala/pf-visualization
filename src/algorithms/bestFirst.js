var initialized = false;
function BestFirstFinder(grid, start, end, heuristics) {
  AStarFinder(grid, start, end, function(x, y) {
    return heuristics(x, y) * 1000000;
  });
}
function BestFirstFinderFast(grid, start, end, heuristics) {
  AStarFinderFast(grid, start, end, function(x, y) {
    return heuristics(x, y) * 1000000;
  });
}

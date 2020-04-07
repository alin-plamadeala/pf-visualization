var openList = []; //the list of nodes used by this algorithm
initialized = false;

function BreadthFirstFinder(grid, start, end) {
  // initialize the variables for the algorithm
  // this runs only the first time a frame is rendered.
  if (!initialized) {
    resetGrid();
    openList.length = 0;
    openList.push(start);
    start.opened = true;

    initialized = true;
  }

  if (openList.length) {
    steps++;
    console.log("running");
    node = openList.shift();
    node.closed = true;
    if (node === end) {
      path = backtrace(end);
      setFinish();
      computeStats();
      return;
    }

    node.findNeighbours(grid);
    neighbours = node.neighbours;
    for (i = 0, l = neighbours.length; i < l; ++i) {
      neighbour = neighbours[i];

      // skip this neighbor if it has been inspected before
      if (neighbour.closed || neighbour.opened || neighbour.obstacle) {
        continue;
      }

      openList.push(neighbour);
      neighbour.opened = true;
      neighbour.cameFrom = node;
    }
  } else {
    setFinish();
    computeStats();
    failSearch();
    return;
  }
}
function BreadthFirstFinderFast(grid, start, end) {
  // initialize the variables for the algorithm
  // this runs only the first time a frame is rendered.
  resetGrid();
  openList.length = 0;
  openList.push(start);
  start.opened = true;
  initialized = true;

  while (openList.length) {
    steps++;
    node = openList.shift();
    node.closed = true;
    if (node === end) {
      path = backtrace(end);
      computeStats();
      return;
    }

    node.findNeighbours(grid);
    neighbours = node.neighbours;
    for (i = 0, l = neighbours.length; i < l; ++i) {
      neighbour = neighbours[i];

      // skip this neighbor if it has been inspected before
      if (neighbour.closed || neighbour.opened || neighbour.obstacle) {
        continue;
      }

      openList.push(neighbour);
      neighbour.opened = true;
      neighbour.cameFrom = node;
    }
  }
  computeStats();
  return;
}

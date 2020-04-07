/**
 * A* path-finder.
 */
var openListHeap; //the list of nodes used by this algorithm

function AStarFinder(grid, start, end, heuristics) {
  // initialize the variables for the algorithm
  // this runs only the first time a frame is rendered.
  if (!initialized) {
    resetGrid();
    openListHeap = new Heap(function (nodeA, nodeB) {
      return nodeA.f - nodeB.f;
    });

    // set the `g` and `f` value of the start node to be 0
    start.g = 0;
    start.f = 0;

    // push the start node into the open list
    openListHeap.push(start);
    start.opened = true;

    initialized = true;
  }

  // if the open list is not empty
  // this if statement is passed each time a frame is rendered in the canvas
  if (!openListHeap.empty()) {
    steps++;
    // pop the position of node which has the minimum `f` value.
    node = openListHeap.pop();
    node.closed = true;

    // if reached the end position, construct the path and return it
    if (node === end) {
      setFinish();
      //compute path
      path = backtrace(end);
      computeStats();
    }

    // get neigbours of the current node
    node.findNeighbours(grid);
    neighbours = node.neighbours;
    for (var i = 0; i < neighbours.length; i++) {
      neighbour = neighbours[i];

      if (neighbour.closed) {
        continue;
      }

      // get the distance between current node and the neighbor
      // and calculate the next g score
      //ng = node.g + heur(node, neighbour);
      ng =
        node.g +
        (neighbour.x - node.x === 0 || neighbour.y - node.y === 0
          ? 1
          : Math.SQRT2);

      // check if the neighbor has not been inspected yet, or
      // can be reached with smaller cost from the current node
      if ((!neighbour.opened || ng < neighbour.g) && !neighbour.obstacle) {
        neighbour.g = ng;
        neighbour.h = heuristics(neighbour, end);
        neighbour.f = neighbour.g + neighbour.h;
        neighbour.cameFrom = node;

        if (!neighbour.opened) {
          openListHeap.push(neighbour);
          neighbour.opened = true;
        } else {
          // the neighbor can be reached with smaller cost.
          // Since its f value has been updated, we have to
          // update its position in the open list
          openListHeap.updateItem(neighbour);
        }
      }
    } // end for each neighbor
  } else {
    // fail to find the path
    setFinish();
    computeStats();
    failSearch();
    return;
  }
}
function AStarFinderFast(grid, start, end, heuristics) {
  // initialize the variables for the algorithm
  // this runs only the first time a frame is rendered.
  resetGrid();
  openListHeap = new Heap(function (nodeA, nodeB) {
    return nodeA.f - nodeB.f;
  });

  // set the `g` and `f` value of the start node to be 0
  start.g = 0;
  start.f = 0;

  // push the start node into the open list
  openListHeap.push(start);
  start.opened = true;

  // if the open list is not empty
  // this if statement is passed each time a frame is rendered in the canvas
  while (!openListHeap.empty()) {
    steps++;
    // pop the position of node which has the minimum `f` value.
    node = openListHeap.pop();
    node.closed = true;

    // if reached the end position, construct the path and return it
    if (node === end) {
      //compute path
      path = backtrace(end);
      computeStats();
      return;
    }

    // get neigbours of the current node
    node.findNeighbours(grid);
    neighbours = node.neighbours;
    for (var i = 0; i < neighbours.length; i++) {
      neighbour = neighbours[i];

      if (neighbour.closed) {
        continue;
      }

      // get the distance between current node and the neighbor
      // and calculate the next g score
      //ng = node.g + heur(node, neighbour);
      ng =
        node.g +
        (neighbour.x - node.x === 0 || neighbour.y - node.y === 0
          ? 1
          : Math.SQRT2);

      // check if the neighbor has not been inspected yet, or
      // can be reached with smaller cost from the current node
      if ((!neighbour.opened || ng < neighbour.g) && !neighbour.obstacle) {
        neighbour.g = ng;
        neighbour.h = heuristics(neighbour, end);
        neighbour.f = neighbour.g + neighbour.h;
        neighbour.cameFrom = node;

        if (!neighbour.opened) {
          openListHeap.push(neighbour);
          neighbour.opened = true;
        } else {
          // the neighbor can be reached with smaller cost.
          // Since its f value has been updated, we have to
          // update its position in the open list
          openListHeap.updateItem(neighbour);
        }
      }
    } // end for each neighbor
  }
  // fail to find the path
  computeStats();
  return;
}

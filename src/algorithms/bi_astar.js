var startOpenList, endOpenList;
const BY_START = 1;
const BY_END = 2;

/**
 * Bi-directional A* path-finder used by p5js draw() method.
 */
function BiAStarFinder(grid, start, end, heuristic) {
  // initialize the variables for the algorithm
  // this runs only the first time a frame is rendered.
  if (!initialized) {
    resetGrid();

    var cmp = (nodeA, nodeB) => nodeA.f - nodeB.f;

    startOpenList = new Heap(cmp);
    endOpenList = new Heap(cmp);

    // set the `g` and `f` value of the start node to be 0
    // and push it into the start open list
    startNode = start;
    startNode.g = 0;
    startNode.f = 0;
    startOpenList.push(startNode);
    startNode.opened = BY_START;

    // set the `g` and `f` value of the end node to be 0
    // and push it into the open open list
    endNode = end;
    endNode.g = 0;
    endNode.f = 0;
    endOpenList.push(endNode);
    endNode.opened = BY_END;
  }

  // while both the open lists are not empty
  if (!startOpenList.empty() && !endOpenList.empty()) {
    steps++;
    // pop the position of start node which has the minimum `f` value.
    node = startOpenList.pop();
    node.closed = true;

    // get neigbours of the current node
    node.findNeighbours(grid);
    neighbours = node.neighbours;

    for (i = 0, l = neighbours.length; i < l; ++i) {
      neighbour = neighbours[i];

      if (neighbour.closed) {
        continue;
      }

      if (neighbour.opened === BY_END) {
        console.log("1");
        setFinish();
        //path = biBacktrace(node, neighbour.cameFrom);
        path = biBacktrace(node, neighbour);
        computeStats();
        return;
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
        neighbour.h = heuristic(neighbour, end);
        neighbour.f = neighbour.g + neighbour.h;
        neighbour.cameFrom = node;

        if (!neighbour.opened) {
          startOpenList.push(neighbour);
          neighbour.opened = BY_START;
        } else {
          // the neighbor can be reached with smaller cost.
          // Since its f value has been updated, we have to
          // update its position in the open list
          startOpenList.updateItem(neighbour);
        }
      }
    } // end for each neighbor

    // pop the position of end node which has the minimum `f` value.
    node = endOpenList.pop();
    node.closed = true;

    // get neigbours of the current node
    node.findNeighbours(grid);
    neighbours = node.neighbours;

    for (i = 0, l = neighbours.length; i < l; ++i) {
      neighbour = neighbours[i];

      if (neighbour.closed) {
        continue;
      }
      if (neighbour.opened === BY_START) {
        console.log("2");
        setFinish();
        //path = biBacktrace(neighbour.cameFrom, node);
        path = biBacktrace(neighbour, node);
        computeStats();
        return;
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
        neighbour.h = heuristic(neighbour, start);
        neighbour.f = neighbour.g + neighbour.h;
        neighbour.cameFrom = node;

        if (!neighbour.opened) {
          endOpenList.push(neighbour);
          neighbour.opened = BY_END;
        } else {
          // the neighbor can be reached with smaller cost.
          // Since its f value has been updated, we have to
          // update its position in the open list
          endOpenList.updateItem(neighbour);
        }
      }
    } // end for each neighbor
  } else {
    // fail to find the path
    failSearch();
    computeStats();
    return;
  }
}

/**
 * Bi-directional A* path-finder.
 */
function BiAstarFinderFast(grid, start, end, heuristic) {
  resetGrid();

  var cmp = (nodeA, nodeB) => nodeA.f - nodeB.f;

  startOpenList = new Heap(cmp);
  endOpenList = new Heap(cmp);

  // set the `g` and `f` value of the start node to be 0
  // and push it into the start open list
  startNode = start;
  startNode.g = 0;
  startNode.f = 0;
  startOpenList.push(startNode);
  startNode.opened = BY_START;

  // set the `g` and `f` value of the end node to be 0
  // and push it into the open open list
  endNode = end;
  endNode.g = 0;
  endNode.f = 0;
  endOpenList.push(endNode);
  endNode.opened = BY_END;

  // while both the open lists are not empty
  while (!startOpenList.empty() && !endOpenList.empty()) {
    steps++;
    // pop the position of start node which has the minimum `f` value.
    node = startOpenList.pop();
    node.closed = true;

    // get neigbours of the current node
    node.findNeighbours(grid);
    neighbours = node.neighbours;

    for (i = 0, l = neighbours.length; i < l; ++i) {
      neighbour = neighbours[i];

      if (neighbour.closed) {
        continue;
      }

      if (neighbour.opened === BY_END) {
        //path = biBacktrace(node, neighbour.cameFrom);
        path = biBacktrace(node, neighbour);
        computeStats();
        return;
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
        neighbour.h = heuristic(neighbour, end);
        neighbour.f = neighbour.g + neighbour.h;
        neighbour.cameFrom = node;

        if (!neighbour.opened) {
          startOpenList.push(neighbour);
          neighbour.opened = BY_START;
        } else {
          // the neighbor can be reached with smaller cost.
          // Since its f value has been updated, we have to
          // update its position in the open list
          startOpenList.updateItem(neighbour);
        }
      }
    } // end for each neighbor

    // pop the position of end node which has the minimum `f` value.
    node = endOpenList.pop();
    node.closed = true;

    // get neigbours of the current node
    node.findNeighbours(grid);
    neighbours = node.neighbours;

    for (i = 0, l = neighbours.length; i < l; ++i) {
      neighbour = neighbours[i];

      if (neighbour.closed) {
        continue;
      }
      if (neighbour.opened === BY_START) {
        //path = biBacktrace(neighbour.cameFrom, node);
        path = biBacktrace(neighbour, node);
        computeStats();
        return;
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
        neighbour.h = heuristic(neighbour, start);
        neighbour.f = neighbour.g + neighbour.h;
        neighbour.cameFrom = node;

        if (!neighbour.opened) {
          endOpenList.push(neighbour);
          neighbour.opened = BY_END;
        } else {
          // the neighbor can be reached with smaller cost.
          // Since its f value has been updated, we have to
          // update its position in the open list
          endOpenList.updateItem(neighbour);
        }
      }
    } // end for each neighbor
  }
  computeStats();
  return;
}

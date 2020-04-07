const START_COL = 5;
const START_ROW = 9;
const END_COL = 44;
const END_ROW = 9;

var cols = 50;
var rows = 20;
var grid = new Array(cols);
var w, h;

var openSet = [];
var closedSet = [];
var endOpenSet = [];
var endClosedSet = [];

var start;
var end;

var path = [];
var pathLength;

var algorithmIndex;
var selectedHeuristic;
var diagonals = true;

/**
 * Draw the start cell
 **/
function drawStart() {
  if (draggingStart) {
    start.g = Infinity;
    var newX = parseInt(mouseX / w);
    var newY = parseInt(mouseY / h);
    if (newX < 0) {
      newX = 0;
    }
    if (newY < 0) {
      newY = 0;
    }
    if (newX > cols - 1) {
      newX = cols - 1;
    }
    if (newY > rows - 1) {
      newY = rows - 1;
    }
    if (newX == end.x && newY == end.y) {
      newX = newX + 1;
    }
    start = grid[newX][newY];

    stroke(0);
    strokeWeight(1);
    fill(0, 255, 140);
    ellipse(
      start.x * w + w / 2 + 0.5,
      start.y * h + h / 2 + 0.5,
      (w - 1) / 1.5,
      (h - 1) / 1.5
    );
    //redraw the path while moving START node
    if (finished) {
      algorithmList[algorithmIndex].algFast(selectedHeuristic.alg);
    }
  } else {
    stroke(0);
    strokeWeight(1);
    fill(0, 255, 140);
    ellipse(start.x * w + w / 2 + 0.5, start.y * h + h / 2 + 0.5, w - 1, h - 1);
  }
}
/**
 * Draw the end cell
 **/
function drawEnd() {
  if (draggingEnd) {
    var newX = parseInt(mouseX / w);
    var newY = parseInt(mouseY / h);
    if (newX < 0) {
      newX = 0;
    }
    if (newY < 0) {
      newY = 0;
    }
    if (newX > cols - 1) {
      newX = cols - 1;
    }
    if (newY > rows - 1) {
      newY = rows - 1;
    }
    if (newX == start.x && newY == start.y) {
      newX = newX + 1;
    }

    end = grid[newX][newY];

    noStroke();
    fill(255, 0, 0);
    ellipse(
      end.x * w + w / 2 + 0.5,
      end.y * h + h / 2 + 0.5,
      (w - 1) / 1.5,
      (h - 1) / 1.5
    );

    noStroke();
    fill(255);
    ellipse(
      end.x * w + w / 2 + 0.5,
      end.y * h + h / 2 + 0.5,
      w / 2.25,
      h / 2.25
    );

    noStroke();
    fill(255, 0, 0);
    ellipse(
      end.x * w + w / 2 + 0.5,
      end.y * h + h / 2 + 0.5,
      w / 3.75,
      h / 3.75
    );
    //redraw the path while moving END node
    if (finished) {
      algorithmList[algorithmIndex].algFast(selectedHeuristic.alg);
    }
  } else {
    noStroke();
    fill(255, 0, 0);
    ellipse(end.x * w + w / 2 + 0.5, end.y * h + h / 2 + 0.5, w - 1, h - 1);

    noStroke();
    fill(255);
    ellipse(end.x * w + w / 2 + 0.5, end.y * h + h / 2 + 0.5, w / 1.5, h / 1.5);

    noStroke();
    fill(255, 0, 0);
    ellipse(end.x * w + w / 2 + 0.5, end.y * h + h / 2 + 0.5, w / 2.5, h / 2.5);
  }
}
/**
 * Draw the path
 **/
function drawPath() {
  // for (var i = 0; i < path.length; i++) {
  //   path[i].show(color(255, 255, 0));
  // }
  // Drawing path as continuous line
  noFill();
  stroke(255, 255, 0);
  strokeWeight(w / 5);
  beginShape();
  for (var i = 0; i < path.length; i++) {
    vertex(path[i].x * w + w / 2, path[i].y * h + h / 2);
  }
  endShape();
}
/**
 * Draw the grid
 **/
function drawGrid() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      var cell = grid[i][j];
      if (cell.opened && !cell.closed) {
        cell.show(color(0, 255, 0, 90));
      } else if (cell.closed) {
        cell.show(color(255, 0, 0, 90));
      } else {
        cell.show(color(255));
      }
    }
  }
}
/**
 * Setup function for p5js
 **/
function setup() {
  createCanvas(1400, 560).id("grid").parent("sketch-holder");
  w = (width - 1) / cols;
  h = (height - 1) / rows;
  createGrid();
}
/**
 * Draw function for p5js
 **/
function draw() {
  background(255);
  if (running) {
    //BreadthFirstFinder(grid, start, end);
    algorithmList[algorithmIndex].alg(selectedHeuristic.alg);
  }
  drawGrid();
  drawPath();
  drawStart();
  drawEnd();
}

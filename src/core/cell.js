/**
 * The Cell class representing the elements of which the grid is made
 * @constructor
 * @param {number} x the horizontal coordonate of the cell
 * @param {number} y the vertical coordonate of the cell

 */
function Cell(x, y) {
  /**
   * x - the horizontal coordonate of the cell
   * @type {number}
   */
  this.x = x;
  /**
   * y - the vertical coordonate of the cell
   * @type {number}
   */
  this.y = y;

  /**
   * f - the vertical coordonate of the cell
   * @type {number}
   */
  this.f = Infinity;
  /**
   * g - the vertical coordonate of the cell
   * @type {number}
   */
  this.g = Infinity;
  /**
   * h - the vertical coordonate of the cell
   * @type {number}
   */
  this.h = Infinity;

  this.neighbours = [];
  this.cameFrom = undefined;

  this.obstacle = false;

  this.show = function (col) {
    if (this.obstacle) {
      stroke(0);
      fill(0);
      rect(this.x * w, this.y * h, w, h);
    } else if (col) {
      stroke(160, 160, 160);
      fill(col);
      rect(this.x * w, this.y * h, w, h);
    }
  };

  this.findNeighbours = function (grid) {
    var x = this.x;
    var y = this.y;

    //up
    if (y > 0) {
      this.neighbours.push(grid[x][y - 1]);
    }

    //right
    if (x < cols - 1) {
      this.neighbours.push(grid[x + 1][y]);
    }

    //down
    if (y < rows - 1) {
      this.neighbours.push(grid[x][y + 1]);
    }

    //left
    if (x > 0) {
      this.neighbours.push(grid[x - 1][y]);
    }
    if (diagonals) {
      //left-up
      if (x > 0 && y < rows - 1) {
        if (
          y > 0 &&
          grid[x - 1][y].obstacle == false &&
          grid[x][y - 1].obstacle == false
        ) {
          this.neighbours.push(grid[x - 1][y + 1]);
        }
      }
      //left-down
      if (x > 0 && y > 0) {
        if (
          y < rows - 1 &&
          grid[x - 1][y].obstacle == false &&
          grid[x][y + 1].obstacle == false
        ) {
          this.neighbours.push(grid[x - 1][y - 1]);
        }
      }
      //right-down
      if (x < cols - 1 && y > 0) {
        if (
          y < rows - 1 &&
          grid[x][y + 1].obstacle == false &&
          grid[x + 1][y].obstacle == false
        ) {
          this.neighbours.push(grid[x + 1][y - 1]);
        }
      }
      //up-right
      if (x < cols - 1 && y < rows - 1) {
        if (
          y > 0 &&
          grid[x][y - 1].obstacle == false &&
          grid[x + 1][y].obstacle == false
        ) {
          this.neighbours.push(grid[x + 1][y + 1]);
        }
      }
    }
  };
}

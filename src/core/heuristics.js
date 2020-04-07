heuristics = {
  /**
   * Manhattan distance.
   * @param {number} dx - Difference in x.
   * @param {number} dy - Difference in y.
   * @return {number} dx + dy
   */
  manhattan: {
    name: "Manhattan",
    alg: function (nodeA, nodeB) {
      dx = abs(nodeA.x - nodeB.x);
      dy = abs(nodeA.y - nodeB.y);
      return dx + dy;
    },
  },

  /**
   * Euclidean distance.
   * @param {number} dx - Difference in x.
   * @param {number} dy - Difference in y.
   * @return {number} sqrt(dx * dx + dy * dy)
   */
  euclidean: {
    name: "Euclidean",
    alg: function (nodeA, nodeB) {
      dx = abs(nodeA.x - nodeB.x);
      dy = abs(nodeA.y - nodeB.y);
      return Math.sqrt(dx * dx + dy * dy);
    },
  },

  /**
   * Octile distance.
   * @param {number} dx - Difference in x.
   * @param {number} dy - Difference in y.
   * @return {number} sqrt(dx * dx + dy * dy) for grids
   */
  octile: {
    name: "Octile",
    alg: function (nodeA, nodeB) {
      dx = abs(nodeA.x - nodeB.x);
      dy = abs(nodeA.y - nodeB.y);
      var F = Math.SQRT2 - 1;
      return dx < dy ? F * dx + dy : F * dy + dx;
    },
  },

  /**
   * Chebyshev distance.
   * @param {number} dx - Difference in x.
   * @param {number} dy - Difference in y.
   * @return {number} max(dx, dy)
   */
  chebyshev: {
    name: "Chebyshev",
    alg: function (nodeA, nodeB) {
      dx = abs(nodeA.x - nodeB.x);
      dy = abs(nodeA.y - nodeB.y);
      return Math.max(dx, dy);
    },
  },
};

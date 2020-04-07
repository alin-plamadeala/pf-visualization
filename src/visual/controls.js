var running = false;
var finished = false;

var draggingStart = false;
var draggingEnd = false;

var pencil = false;
var eraser = false;
var cursorX;
var cursorY;

var $selectAlgorithm = $("#selectAlgorithm");
var $selectHeuristics = $("#selectHeuristics");
var $diagonals = $("#diagonals");

var $selectObstacles = $("#selectObstacles");
var $clearCanvas = $("#clearCanvas");
var $pencil = $("#pencil");
var $eraser = $("#eraser");
var $controlButton = $("#controlButton");

var helpContent = [];

var $stats = $("#stats");
var steps;

function drawStats(algorithm, heuristic, pathLength, steps) {
  $stats.html(
    `<b>Stats</b> | 
  <b>algorithm</b>: <u>${algorithm}</u> | 
  <b>heuristic</b>: <u>${heuristic}</u> | 
  <b>path length</b>: <u>${pathLength.toFixed(4)}</u> | 
  <b>steps</b>: <u>${steps}</u>`
  );
}

function computeStats() {
  var algorithm = algorithmList[algorithmIndex].name;
  var heuristic = selectedHeuristic.name;
  var pathLength = calcPathLength(path);

  drawStats(algorithm, heuristic, pathLength, steps);
}

var algorithmList = [
  {
    name: "A*",
    alg: function (heuristics) {
      AStarFinder(grid, start, end, heuristics);
    },
    algFast: function (heuristics) {
      AStarFinderFast(grid, start, end, heuristics);
    },
  },
  {
    name: "Dijkstra",
    alg: function (heuristics) {
      DijkstraFinder(grid, start, end, heuristics);
    },
    algFast: function (heuristics) {
      DijkstraFinderFast(grid, start, end, heuristics);
    },
  },
  {
    name: "BestFirst",
    alg: function (heuristics) {
      BestFirstFinder(grid, start, end, heuristics);
    },
    algFast: function (heuristics) {
      BestFirstFinderFast(grid, start, end, heuristics);
    },
  },
  {
    name: "BreathFirst",
    alg: function () {
      console.log("active");
      BreadthFirstFinder(grid, start, end);
    },
    algFast: function () {
      BreadthFirstFinderFast(grid, start, end);
    },
  },
  {
    name: "Bi-directional A*",
    alg: function (heuristics) {
      BiAStarFinder(grid, start, end, heuristics);
    },
    algFast: function (heuristics) {
      BiAstarFinderFast(grid, start, end, heuristics);
    },
  },
  {
    name: "Bi-directional Dijkstra",
    alg: function (heuristics) {
      BiDijkstraFinder(grid, start, end, heuristics);
    },
    algFast: function (heuristics) {
      BiDijkstraFinderFast(grid, start, end, heuristics);
    },
  },
];

function toggleControls() {
  $("#selectAlgorithmDrop").prop("disabled", function (i, v) {
    return !v;
  });
  $("#selectHeuristicsDrop").prop("disabled", function (i, v) {
    return !v;
  });
  $("#selectObstaclesDrop").prop("disabled", function (i, v) {
    return !v;
  });
  $("#controlButton").prop("disabled", function (i, v) {
    return !v;
  });

  $("#clearCanvas").prop("disabled", function (i, v) {
    return !v;
  });
  $("#pencil").prop("disabled", function (i, v) {
    return !v;
  });
  $("#eraser").prop("disabled", function (i, v) {
    return !v;
  });
  $("#diagonals").prop("disabled", function (i, v) {
    return !v;
  });
}

$selectObstacles.on("click", "li", function () {
  $(this).addClass("selected");
  $(this).siblings().removeClass("selected");
  randomObstacles(grid, $(this).val() / 100);
  $(this)
    .parent()
    .prev()
    .text($(this).val() + "%");
});

$selectAlgorithm.on("click", "li", function () {
  $(this).addClass("selected");
  $(this).siblings().removeClass("selected");
  algorithmIndex = $(this).val();
  $(this).parent().prev().text(algorithmList[algorithmIndex].name);
});
$selectHeuristics.on("click", "li", function () {
  $(this).addClass("selected");
  $(this).siblings().removeClass("selected");

  heurName = $(this).text().toLowerCase();

  if (heurName == "manhattan") {
    $(this).parent().prev().text("Manhattan");
    selectedHeuristic = heuristics.manhattan;
  } else if (heurName == "euclidean") {
    $(this).parent().prev().text("Euclidean");
    selectedHeuristic = heuristics.euclidean;
  } else if (heurName == "octile") {
    $(this).parent().prev().text("Octile");
    selectedHeuristic = heuristics.octile;
  } else if (heurName == "chebyshev") {
    $(this).parent().prev().text("Chebyshev");
    selectedHeuristic = heuristics.chebyshev;
  }
});

function startVisualize() {
  if (selectedHeuristic == undefined && algorithmIndex == undefined) {
    showAlert("Please select an Algorithm and Heuristic function");
  } else if (selectedHeuristic == undefined) {
    showAlert("Please select Heuristic function");
  } else if (algorithmIndex == undefined) {
    showAlert("Please select an Algorithm");
  } else {
    $controlButton.toggleClass("active");
    finished = false;
    initialized = false;
    toggleControls();
    running = true;
  }
}

function jiggle(lim, i) {
  if (i >= lim) {
    $("#grid").css("top", 0).css("left", 0);
    return;
  }
  if (!i) i = 0;
  i++;
  $("#grid")
    .css("margin-top", Math.random() * 6)
    .css("margin-left", Math.random() * 6);
  setTimeout(function () {
    jiggle(lim, i);
  }, 5);
}

function failSearch() {
  jiggle(15);
  showAlert("Failed to find a path");
}

$controlButton.click(function () {
  startVisualize();
});

$diagonals.toggleClass("pressed", diagonals);
$diagonals.click(function () {
  diagonals = !diagonals;
  $diagonals.toggleClass("pressed", diagonals);
});
$pencil.click(function () {
  pencil = !pencil;
  eraser = false;
  $pencil.toggleClass("pressed", pencil);
  $eraser.toggleClass("pressed", eraser);
});

$eraser.click(function () {
  eraser = !eraser;
  pencil = false;
  $pencil.toggleClass("pressed", pencil);
  $eraser.toggleClass("pressed", eraser);
});

$clearCanvas.click(function () {
  clearObstacles(grid);
});
function showAlert(text) {
  $(".alert").text(text);
  $(".alert").append("<div class='alert-close'>✖</div>");
  $(".alert").css("visibility", "visible");
}

$(".alert").click(function () {
  $(".alert").css("visibility", "hidden");
});

function clearObstacles(grid) {
  if (!running) {
    for (var i = 0; i < grid.length; i++) {
      for (var j = 0; j < grid[i].length; j++) {
        grid[i][j].obstacle = false;
      }
    }
  }
}
function randomObstacles(grid, percentage) {
  clearObstacles(grid);
  if (!running) {
    for (var i = 0; i < grid.length; i++) {
      for (var j = 0; j < grid[i].length; j++) {
        if (random(1) < percentage) {
          grid[i][j].obstacle = true;
        }
      }
    }
    start.obstacle = false;
    end.obstacle = false;
  }
}

function mouseDragged() {
  if (!running) {
    var x = parseInt(mouseX / w);
    var y = parseInt(mouseY / h);
    if (pencil) {
      try {
        grid[x][y].obstacle = true;
        start.obstacle = false;
      } catch (error) {
        console.log("Click out of canvas");
      }
    } else if (eraser) {
      try {
        grid[x][y].obstacle = false;
      } catch (error) {
        console.log("Click out of canvas");
      }
    }

    if (cursorX !== x || cursorY !== y) {
      cursorX = x.valueOf();
      cursorY = y.valueOf();
    }
  }

  return false;
}

// function mouseClicked() {
//   if (!running) {
//     var x = parseInt(mouseX / w);
//     var y = parseInt(mouseY / h);

//     if (!(x == start.x && y == start.y) || !(x == end.x && y == end.y)) {
//       try {
//         grid[x][y].obstacle = !grid[x][y].obstacle;
//       } catch (error) {
//         console.log("Click out of canvas");
//       }
//     }
//   }
//   start.obstacle = false;
//   end.obstacle = false;
// }

function mousePressed() {
  if (!running) {
    cursorX = parseInt(mouseX / w);
    cursorY = parseInt(mouseY / h);

    if (cursorX == start.x && cursorY == start.y) {
      draggingStart = true;
    }
    if (cursorX == end.x && cursorY == end.y) {
      draggingEnd = true;
    }
  }
}

function mouseReleased() {
  if (!running) {
    // Quit dragging
    draggingStart = false;
    draggingEnd = false;
  }
}

helpContent[0] = `<h1>Pathfinding Visualization</h1>
<h2>Controls:</h2>
<p>
  <b>Clear Obstacles</b> - Pressing this button will clear all
  the obstacles on the grid.
</p>
<p>
  <b>Pencil</b> - Pressing this button will activate the Pen
  tool which allows drawing obstacles on the grid.
</p>
<p>
  <b>Obstacles</b> - Select the amount of random obstacles on
  the grid.
</p>
<p><b>Algorithm</b> - Select the pathfinding algorithm.</p>
<p><b>Heuristic</b> - Select the heuristic algorithm.</p>

<p>
  <b>Diagonals</b> - Pressing this button will toggle diagonal
  movement.
</p>
<p>
  <b>Start Pathfinder</b> - Start
  visualizing.
</p>`;
helpContent[1] = `<h1>Pathfinding Visualization</h1>
<h2>Legend:</h2>
<p><img style="vertical-align:middle" width = "40px" src="images/start.png" title="Starting Cell"><b> - The starting cell.</b></p>
<p><img style="vertical-align:middle" width = "40px" src="images/end.png" title="Destination Cell"><b>- The destination cell.</b></p>
<p><img style="vertical-align:middle" width = "40px" src="images/visited_nodes.png" title="Visited Cells"><b> - Visited cells.</b></p>
<p><img style="vertical-align:middle" width = "40px" src="images/path.png" title="Path"><b> - The path.</b></p>`;
helpContent[2] = `<h1>Pathfinding Visualization</h1>
<h2>More controls:</h2>
<p>You can visualize the new computed path by dragging the <b>Start</b> and <b>End</b> cells:</p>
<center><img width = "200px" src="images/moving_start.gif"></center>`;

var page = 0;

$("#helpContent").html(helpContent[page]);

$("#previous").click(function () {
  page--;
  page = max(page, 0);
  console.log(page);
  $("#helpContent").html(helpContent[page]);
});

$("#next").click(function () {
  page++;
  page = min(page, helpContent.length - 1);
  console.log(page);
  $("#helpContent").html(helpContent[page]);
});

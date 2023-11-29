// addEventListener is used to execute code after the whole page is loaded.
addEventListener("load", function () {
  const rotateButton = document.getElementById("rotate");
  const mirrorButton = document.getElementById("mirror");
  document.getElementById("saveButton").addEventListener("click", saveGame);
  document.getElementById("resetButton").addEventListener("click", resetGame);
  const loadButton = document.getElementById("loadButton");
  loadButton.addEventListener("click", loadGameProgress);

  rotateButton.addEventListener("click", () => rotateElement());
  mirrorButton.addEventListener("click", () => mirrorElement());

  const gridContainer = document.getElementById("grid-container");

  updateScreen();

  gridContainer.addEventListener("mouseover", highlightShape);

  gridContainer.addEventListener("click", placeShape);

  gridContainer.addEventListener("mouseout", function (event) {
    const target = event.target;
    if (target.tagName === "TD") {
      gridContainer.querySelectorAll("td").forEach(function (cell) {
        cell.classList.remove("highlight");
        cell.classList.remove("highlight_red");
      });
    }
  });
});

const landTypes = [
  { name: "empty", color: "Bisque", number: 0 },
  { name: "mountain", color: "SaddleBrown", number: -1 },
  { name: "water", color: "SkyBlue", number: 1 },
  { name: "forest", color: "SeaGreen", number: 2 },
  { name: "farm", color: "Gold", number: 3 },
  { name: "town", color: "FireBrick", number: 4 },
];

// Generates the game table with rows and columns and places mountains at specified indexes.
// function generateGameTable(rows, cols, mountainIndexes) {
//   const gameTable = [];

//   for (let i = 0; i < rows; i++) {
//     const row = [];
//     for (let j = 0; j < cols; j++) {
//       if (mountainIndexes.some((index) => index[0] === i && index[1] === j)) {
//         row.push("mountain");
//       } else {
//         row.push("empty");
//       }
//     }
//     gameTable.push(row);
//   }

//   return gameTable;
// }

// const numRows = 11;
// const numCols = 11;
// const mountainIndexes = [
//   [1, 2],
//   [3, 8],
//   [5, 3],
//   [8, 9],
//   [9, 5],
// ];

// const gameTable = generateGameTable(numRows, numCols, mountainIndexes);
////////////////////////////////////////////////////////////////////////////////////////////////
// Generates the game table with rows and columns and places mountains at random indexes.
function generateGameTable(rows, cols, numMountains) {
  const gameTable = [];
  const mountainIndexes = generateRandomMountainIndexes(
    rows,
    cols,
    numMountains
  );

  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      row.push(
        mountainIndexes.some((index) => index[0] === i && index[1] === j)
          ? "mountain"
          : "empty"
      );
    }
    gameTable.push(row);
  }

  return gameTable;
}

function generateRandomMountainIndexes(rows, cols, numMountains) {
  const indexes = new Set();

  while (indexes.size < numMountains) {
    const randomRow = Math.floor(Math.random() * rows);
    const randomCol = Math.floor(Math.random() * cols);
    indexes.add(JSON.stringify([randomRow, randomCol]));
  }

  return Array.from(indexes).map(JSON.parse);
}

// Example usage
const numRows = 11;
const numCols = 11;
const numMountains = 7; // Adjust the number of mountains as needed
const gameTable = generateGameTable(numRows, numCols, numMountains);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

let timer = 0;

let current_season = 0;

let mission_A_points = 0;
let mission_B_points = 0;
let mission_C_points = 0;
let mission_D_points = 0;

let springPoints = 0;
let summerPoints = 0;
let autumnPoints = 0;
let winterPoints = 0;

// Updates the game screen by refreshing the grid and other elements.
function updateScreen() {
  console.log("update");
  printTable();
  printCurrentElement();
  printTimers();
  printMissions();
  printMissionPoints();
  printSeasonPoints();
}

// Updates the display to show the current season and the time left in the season.
function printTimers() {
  const currentSeasonContainer = document.getElementById("current_season");
  const timerSeasonContainer = document.getElementById("timer_season");
  let text = "";
  const season_number = Math.floor(timer / 7);

  // Determine current season and set display text
  switch (season_number) {
    case 0:
      text = "Current season: Spring (AB)";
      break;
    case 1:
      text = "Current Season: Summer (BC)";
      break;
    case 2:
      text = "Current season: Autumn (CD)";
      break;
    case 3:
      text = "Current season: Winter (DA)";
      break;
    default:
      text = "Game over";
  }

  // Update season points and totals
  if (season_number !== current_season) {
    let points = [0, 0, 0, 0]; // Points for missions A, B, C, D

    switch (current_season) {
      case 0:
        points[0] = game.missionA.function();
        points[1] = game.missionB.function();
        springPoints = points[0] + points[1];
        break;
      case 1:
        points[1] = game.missionB.function();
        points[2] = game.missionC.function();
        summerPoints = points[1] + points[2];
        break;
      case 2:
        points[2] = game.missionC.function();
        points[3] = game.missionD.function();
        autumnPoints = points[2] + points[3];
        break;
      case 3:
        points[3] = game.missionD.function();
        points[0] = game.missionA.function();
        winterPoints = points[3] + points[0];
        break;
    }

    // Update mission points
    for (let i = 0; i < points.length; i++) {
      if (points[i] > 0) {
        switch (i) {
          case 0:
            mission_A_points += points[i];
            break;
          case 1:
            mission_B_points += points[i];
            break;
          case 2:
            mission_C_points += points[i];
            break;
          case 3:
            mission_D_points += points[i];
            break;
        }
      }
    }

    current_season = season_number;
  }

  // Update season display
  currentSeasonContainer.textContent = text;
  if (current_season != 4) {
    timerSeasonContainer.textContent = `Season remaining: ${7 - (timer % 7)}/7`;
  } else {
    timerSeasonContainer.textContent = "";
  }
}

// Renders the game grid in the DOM, with each cell corresponding to a terrain type.
function printTable() {
  const gridContainer = document.getElementById("grid-container");

  // Clear existing content in the grid container
  gridContainer.innerHTML = "";

  // Create and append table rows and cells based on gameTable data
  gameTable.forEach((rowData) => {
    const tr = document.createElement("tr");

    rowData.forEach((cellData) => {
      const td = document.createElement("td");
      td.style.backgroundImage = `url('assets/tiles/${cellData}.png')`;
      tr.appendChild(td);
    });

    gridContainer.appendChild(tr);
  });
}

// Displays the mission images on the screen.
function printMissions() {
  const missionAContainer = document.getElementById("mission_a_image");
  missionAContainer.src = `./assets/missions_eng/${game.missionA.title}.png`;

  const missionBContainer = document.getElementById("mission_b_image");
  missionBContainer.src = `./assets/missions_eng/${game.missionB.title}.png`;

  const missionCContainer = document.getElementById("mission_c_image");
  missionCContainer.src = `./assets/missions_eng/${game.missionC.title}.png`;

  const missionDContainer = document.getElementById("mission_d_image");
  missionDContainer.src = `./assets/missions_eng/${game.missionD.title}.png`;

  const totalPointsContainer = document.getElementById("total_points");
  totalPointsContainer.textContent = `Altogether: ${
    springPoints +
    summerPoints +
    autumnPoints +
    winterPoints +
    countSurroundedMountain()
  } point`;
}

// Updates the display of seasonal points based on the progress of the game.
function printSeasonPoints() {
  const springPointsContainer = document.getElementById("spring_points");
  springPointsContainer.textContent = springPoints;

  const summerPointsContainer = document.getElementById("summer_points");
  summerPointsContainer.textContent = summerPoints;

  const autumnPointsContainer = document.getElementById("autumn_points");
  autumnPointsContainer.textContent = autumnPoints;

  const winterPointsContainer = document.getElementById("winter_points");
  winterPointsContainer.textContent = winterPoints;
}

// Shows the points earned for each mission on the screen.
function printMissionPoints() {
  const missionAPointsContainer = document.getElementById("mission_a_points");
  missionAPointsContainer.textContent = `(${mission_A_points} point)`;
  const missionAActiveContainer = document.getElementById("mission_a_active");
  if (current_season == 0 || current_season == 3) {
    missionAActiveContainer.classList.remove("hide");
  } else {
    missionAActiveContainer.classList.add("hide");
  }

  const missionBPointsContainer = document.getElementById("mission_b_points");
  missionBPointsContainer.textContent = `(${mission_B_points} point)`;
  const missionBActiveContainer = document.getElementById("mission_b_active");
  if (current_season == 0 || current_season == 1) {
    missionBActiveContainer.classList.remove("hide");
  } else {
    missionBActiveContainer.classList.add("hide");
  }

  const missionCPointsContainer = document.getElementById("mission_c_points");
  missionCPointsContainer.textContent = `(${mission_C_points} point)`;
  const missionCActiveContainer = document.getElementById("mission_c_active");
  if (current_season == 1 || current_season == 2) {
    missionCActiveContainer.classList.remove("hide");
  } else {
    missionCActiveContainer.classList.add("hide");
  }

  const missionDPointsContainer = document.getElementById("mission_d_points");
  missionDPointsContainer.textContent = `(${mission_D_points} point)`;
  const missionDActiveContainer = document.getElementById("mission_d_active");
  if (current_season == 2 || current_season == 3) {
    missionDActiveContainer.classList.remove("hide");
  } else {
    missionDActiveContainer.classList.add("hide");
  }
}

// Renders the current element that the player can place on the grid.
function printCurrentElement() {
  const gridContainer = document.getElementById("current-element-container");

  const elementTime = document.getElementById("element_time");

  elementTime.textContent = game.currentElement.time + "🕐";

  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.firstChild);
  }

  const shape = game.currentElement.shape;

  for (let row = 0; row < 3; row++) {
    const tr = document.createElement("tr");
    for (let col = 0; col < 3; col++) {
      const td = document.createElement("td");

      let colorCode = "White";

      if (shape[row][col] === 1) {
        td.style.backgroundImage = `url('assets/tiles/${game.currentElement.type}.png')`;
      } else {
        td.style.backgroundImage = `url('assets/tiles/empty.png')`;
      }

      tr.appendChild(td);
    }

    gridContainer.appendChild(tr);
  }
}

// Helper function that converts a terrain type into its corresponding color.
function typeToColor(value) {
  for (let i = 0; i < landTypes.length; i++) {
    if (landTypes[i].name === value) {
      return landTypes[i].color;
    }
  }
}

// Highlights the cells on the grid where the current element can potentially be placed.
function highlightShape(event) {
  const gridContainer = document.getElementById("grid-container");
  const target = event.target;
  const row = target.parentElement.rowIndex;
  const col = target.cellIndex;
  const shape = game.currentElement.shape;
  isMatch = checkFitting(shape, row, col);

  xShift = findXShift(shape);
  yShift = findYShift(shape);

  if (target.tagName === "TD") {
    if (isMatch) {
      for (let i = 0; i < shape.length; i++) {
        for (let j = 0; j < shape[i].length; j++) {
          if (shape[i][j] === 1) {
            gridContainer.rows[row + i - yShift].cells[
              col + j - xShift
            ].classList.add("highlight");
          }
        }
      }
    } else {
      for (let i = 0; i < shape.length; i++) {
        for (let j = 0; j < shape[i].length; j++) {
          if (
            shape[i][j] === 1 &&
            row + i - yShift <= 10 &&
            row + i - yShift >= 0 &&
            col + j - xShift <= 10 &&
            col + j - xShift >= 0
          ) {
            gridContainer.rows[row + i - yShift].cells[
              col + j - xShift
            ].classList.add("highlight_red");
          }
        }
      }
    }
  }
}

// Places the current element onto the game grid if it fits.
function placeShape(event) {
  const gridContainer = document.getElementById("grid-container");
  const target = event.target;
  const row = target.parentElement.rowIndex;
  const col = target.cellIndex;
  const shape = game.currentElement.shape;
  isMatch = checkFitting(shape, row, col);

  xShift = findXShift(shape);
  yShift = findYShift(shape);

  if (target.tagName === "TD") {
    if (isMatch) {
      for (let i = 0; i < shape.length; i++) {
        for (let j = 0; j < shape[i].length; j++) {
          if (shape[i][j] === 1) {
            gameTable[row + i - yShift][col + j - xShift] =
              game.currentElement.type;
          }
        }
      }
      timer += game.currentElement.time;
      game.next();
      updateScreen();
    }
  }
}

// Checks if the current element can fit into the selected position on the grid.
function checkFitting(shape, row, col) {
  xShift = findXShift(shape);
  yShift = findYShift(shape);

  let isMatch = true;
  for (let i = 0; i < shape.length; i++) {
    for (let j = 0; j < shape[i].length; j++) {
      if (shape[i][j] === 1) {
        if (
          row + i - yShift > 10 ||
          row + i - yShift < 0 ||
          col + j - xShift > 10 ||
          col + j - xShift < 0 ||
          gameTable[row + i - yShift][col + j - xShift] !== "empty"
        ) {
          isMatch = false;
          break;
        }
      }
    }
    if (!isMatch) break;
  }

  return isMatch;
}

// Finds the horizontal shift needed to correctly place the current element on the grid.
function findXShift(matrix) {
  let xShift = null;

  for (let j = 0; j < matrix[0].length; j++) {
    const column = matrix.map((row) => row[j]);
    if (column.some((element) => element !== 0)) {
      xShift = j;
      break;
    }
  }

  return xShift;
}

// Finds the vertical shift needed to correctly place the current element on the grid.
function findYShift(matrix) {
  let yShift = null;

  for (let i = 0; i < matrix.length; i++) {
    if (matrix[i].some((element) => element !== 0)) {
      yShift = i;
      break;
    }
  }

  return yShift;
}

// Mirrors the current element horizontally.
function mirrorElement() {
  matrix = game.currentElement.shape;
  const mirroredMatrix = [];

  for (let row = 0; row < 3; row++) {
    mirroredMatrix.push([]);
    for (let col = 2; col >= 0; col--) {
      mirroredMatrix[row].push(matrix[row][col]);
    }
  }
  game.currentElement.shape = mirroredMatrix;

  printCurrentElement();
}

// Rotates the current element 90 degrees clockwise.
function rotateElement() {
  matrix = game.currentElement.shape;
  const rotatedMatrix = [];

  for (let i = 0; i < 3; i++) {
    rotatedMatrix.push([]);
    for (let j = 2; j >= 0; j--) {
      rotatedMatrix[i].push(matrix[j][i]);
    }
  }

  game.currentElement.shape = rotatedMatrix;

  printCurrentElement();
}

// Defines the GameElements class with properties and methods to handle game elements.
class GameElements {
  shapeElements = [
    {
      time: 2,
      type: "water",
      shape: [
        [1, 1, 1],
        [0, 0, 0],
        [0, 0, 0],
      ],
      rotation: 0,
      mirrored: false,
    },
    {
      time: 2,
      type: "town",
      shape: [
        [1, 1, 1],
        [0, 0, 0],
        [0, 0, 0],
      ],
      rotation: 0,
      mirrored: false,
    },
    {
      time: 1,
      type: "forest",
      shape: [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
      ],
      rotation: 0,
      mirrored: false,
    },
    {
      time: 2,
      type: "farm",
      shape: [
        [1, 1, 1],
        [0, 0, 1],
        [0, 0, 0],
      ],
      rotation: 0,
      mirrored: false,
    },
    {
      time: 2,
      type: "forest",
      shape: [
        [1, 1, 1],
        [0, 0, 1],
        [0, 0, 0],
      ],
      rotation: 0,
      mirrored: false,
    },
    {
      time: 2,
      type: "town",
      shape: [
        [1, 1, 1],
        [0, 1, 0],
        [0, 0, 0],
      ],
      rotation: 0,
      mirrored: false,
    },
    {
      time: 2,
      type: "farm",
      shape: [
        [1, 1, 1],
        [0, 1, 0],
        [0, 0, 0],
      ],
      rotation: 0,
      mirrored: false,
    },
    {
      time: 1,
      type: "town",
      shape: [
        [1, 1, 0],
        [1, 0, 0],
        [0, 0, 0],
      ],
      rotation: 0,
      mirrored: false,
    },
    {
      time: 1,
      type: "town",
      shape: [
        [1, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
      ],
      rotation: 0,
      mirrored: false,
    },
    {
      time: 1,
      type: "farm",
      shape: [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
      ],
      rotation: 0,
      mirrored: false,
    },
    {
      time: 1,
      type: "farm",
      shape: [
        [0, 1, 0],
        [1, 1, 1],
        [0, 1, 0],
      ],
      rotation: 0,
      mirrored: false,
    },
    {
      time: 2,
      type: "water",
      shape: [
        [1, 1, 1],
        [1, 0, 0],
        [1, 0, 0],
      ],
      rotation: 0,
      mirrored: false,
    },
    {
      time: 2,
      type: "water",
      shape: [
        [1, 0, 0],
        [1, 1, 1],
        [1, 0, 0],
      ],
      rotation: 0,
      mirrored: false,
    },
    {
      time: 2,
      type: "forest",
      shape: [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 1],
      ],
      rotation: 0,
      mirrored: false,
    },
    {
      time: 2,
      type: "forest",
      shape: [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
      ],
      rotation: 0,
      mirrored: false,
    },
    {
      time: 2,
      type: "water",
      shape: [
        [1, 1, 0],
        [1, 1, 0],
        [0, 0, 0],
      ],
      rotation: 0,
      mirrored: false,
    },
  ];

  missions = [
    //basic
    {
      title: "The edge of the forest",
      description:
        "You get one point for each of your forest fields adjacent to the edge of your map.",
      function: theEdgeOfTheForest,
    },
    {
      title: "Sleepy Valley",
      description:
        "For every row that contains three forest fields, you get four points each.",
      function: sleepyValley,
    },
    {
      title: "Potato irrigation",
      description:
        "You get two points each for water fields adjacent to your farm fields.",
      function: potatoIrrigation,
    },
    {
      title: "Borderlands",
      description: "You get 6 points for each full row or column.",
      function: borderlands,
    },

    //extra
    {
      title: "Row of Trees",
      description:
        "You get two points for each of the longest, vertically continuous forest fields. In the case of two of the same length, only for one.",
      function: rowOfTrees,
    },
    {
      title: "A rich city",
      description:
        "You get three points each for your neighboring village regions with at least three different terrain types.",
      function: aRichCity,
    },
    {
      title: "Irrigation channel",
      description:
        "For each of your columns in which the number of farms and water fields is the same, you get four points. There must be at least one square of both types of terrain in the column to get points for it.",
      function: irrigationChannel,
    },
    {
      title: "Valley of Mages",
      description:
        "You get three points each for water squares adjacent to your mountain squares.",
      function: valleyOfMages,
    },
    {
      title: "Vacant lot",
      description:
        "You get 2 points each for empty spaces adjacent to your city spaces.",
      function: vacantLot,
    },
    {
      title: "Terraced house",
      description:
        "You get two points for each of the longest, horizontally continuous village squares.",
      function: terracedHouse,
    },
    {
      title: "Unmatched silos",
      description: "You get 10 points for each odd-numbered full column.",
      function: unmatchedSilos,
    },
    {
      title: "Rich countryside",
      description:
        "You get four points for each line containing at least five different terrain types.",
      function: richCountryside,
    },
  ];
  constructor() {
    this.shuffle();
    this.currentIndex = 0;
  }

  shuffle() {
    for (let i = this.shapeElements.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.shapeElements[i], this.shapeElements[j]] = [
        this.shapeElements[j],
        this.shapeElements[i],
      ];
    }

    for (let i = this.missions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.missions[i], this.missions[j]] = [
        this.missions[j],
        this.missions[i],
      ];
    }
  }

  next() {
    if (this.currentIndex < this.shapeElements.length - 1) {
      this.currentIndex++;
    }
  }

  get currentElement() {
    if (
      this.currentIndex >= 0 &&
      this.currentIndex < this.shapeElements.length
    ) {
      return this.shapeElements[this.currentIndex];
    }

    return null;
  }

  get missionA() {
    return this.missions[0];
  }
  get missionB() {
    return this.missions[1];
  }
  get missionC() {
    return this.missions[2];
  }
  get missionD() {
    return this.missions[3];
  }
}

const game = new GameElements();

// Counts the points earned by placing forests adjacent to the edge of the map.
function theEdgeOfTheForest() {
  let points = 0;
  for (let i = 0; i < gameTable.length; i++) {
    for (let j = 0; j < gameTable.length; j++) {
      if (
        i === 0 ||
        i === gameTable.length - 1 ||
        j === 0 ||
        j === gameTable.length - 1
      ) {
        if (gameTable[i][j] === "forest") {
          points += 1;
        }
      }
    }
  }
  return points;
}

// Counts the points for rows that contain exactly three forest fields.
function sleepyValley() {
  let points = 0;
  for (let i = 0; i < gameTable.length; i++) {
    forestLine = 0;
    for (let j = 0; j < gameTable.length; j++) {
      if (gameTable[i][j] === "forest") {
        forestLine += 1;
      }
    }
    if (forestLine === 3) {
      points += 4;
    }
  }
  return points;
}

// Counts the points for water fields that are adjacent to farm fields.
function potatoIrrigation() {
  let points = 0;
  for (let i = 0; i < gameTable.length; i++) {
    for (let j = 0; j < gameTable.length; j++) {
      if (gameTable[i][j] === "water") {
        let farm = false;
        if (i - 1 >= 0) {
          if (gameTable[i - 1][j] === "farm") farm = true;
        }
        if (i + 1 < gameTable.length) {
          if (gameTable[i + 1][j] === "farm") farm = true;
        }
        if (j - 1 >= 0) {
          if (gameTable[i][j - 1] === "farm") farm = true;
        }
        if (j + 1 < gameTable.length) {
          if (gameTable[i][j + 1] === "farm") farm = true;
        }
        if (farm) {
          points += 2;
        }
      }
    }
  }
  return points;
}

// Counts the points for fully filled rows or columns on the grid.
function borderlands() {
  let points = 0;
  for (let i = 0; i < gameTable.length; i++) {
    fullRow = true;
    for (let j = 0; j < gameTable.length; j++) {
      if (gameTable[i][j] === "empty") {
        fullRow = false;
        break;
      }
    }
    if (fullRow) {
      points += 6;
    }
  }
  for (let i = 0; i < gameTable.length; i++) {
    fullColumn = true;
    for (let j = 0; j < gameTable.length; j++) {
      if (gameTable[j][i] === "empty") {
        fullColumn = false;
        break;
      }
    }
    if (fullColumn) {
      points += 6;
    }
  }
  return points;
}

// Counts the points for the longest continuous vertical forest fields.
function rowOfTrees() {
  let points = 0;
  let longest_forest = 0;
  for (let i = 0; i < gameTable.length; i++) {
    continous_forest = 0;
    for (let j = 0; j < gameTable.length; j++) {
      if (gameTable[j][i] === "forest") {
        continous_forest += 1;
      } else {
        continous_forest = 0;
      }
      if (continous_forest > longest_forest) {
        longest_forest = continous_forest;
      }
    }
  }
  points = longest_forest * 2;
  return points;
}

// Counts the points for town squares that are adjacent to at least three different terrain types.
function aRichCity() {
  let points = 0;
  for (let i = 0; i < gameTable.length; i++) {
    for (let j = 0; j < gameTable.length; j++) {
      if (gameTable[i][j] === "town") {
        const unique = new Set();
        if (i - 1 >= 0) {
          unique.add(gameTable[i - 1][j]);
        }
        if (i + 1 < gameTable.length) {
          unique.add(gameTable[i + 1][j]);
        }
        if (j - 1 >= 0) {
          unique.add(gameTable[i][j - 1]);
        }
        if (j + 1 < gameTable.length) {
          unique.add(gameTable[i][j + 1]);
        }

        if (unique.has("empty")) {
          unique.delete("empty");
        }

        if (unique.size >= 3) {
          points += 3;
        }
      }
    }
  }
  return points;
}

// Counts the points for columns with an equal number of water and farm fields.
function irrigationChannel() {
  let points = 0;
  for (let i = 0; i < gameTable.length; i++) {
    farm_count = 0;
    water_count = 0;
    for (let j = 0; j < gameTable.length; j++) {
      if (gameTable[j][i] === "farm") {
        farm_count += 1;
      } else if (gameTable[j][i] === "water") {
        water_count += 1;
      }
    }
    if (water_count != 0 && water_count === farm_count) {
      points += 4;
    }
  }
  return points;
}

// Counts the points for water squares adjacent to mountain squares.
function valleyOfMages() {
  let points = 0;
  for (let i = 0; i < gameTable.length; i++) {
    for (let j = 0; j < gameTable.length; j++) {
      if (gameTable[i][j] === "water") {
        let mountain = false;
        if (i - 1 >= 0) {
          if (gameTable[i - 1][j] === "mountain") mountain = true;
        }
        if (i + 1 < gameTable.length) {
          if (gameTable[i + 1][j] === "mountain") mountain = true;
        }
        if (j - 1 >= 0) {
          if (gameTable[i][j - 1] === "mountain") mountain = true;
        }
        if (j + 1 < gameTable.length) {
          if (gameTable[i][j + 1] === "mountain") mountain = true;
        }
        if (mountain) {
          points += 3;
        }
      }
    }
  }
  return points;
}

// Counts the points for empty squares adjacent to city squares.
function vacantLot() {
  let points = 0;
  for (let i = 0; i < gameTable.length; i++) {
    for (let j = 0; j < gameTable.length; j++) {
      if (gameTable[i][j] === "empty") {
        let town = false;
        if (i - 1 >= 0) {
          if (gameTable[i - 1][j] === "town") town = true;
        }
        if (i + 1 < gameTable.length) {
          if (gameTable[i + 1][j] === "town") town = true;
        }
        if (j - 1 >= 0) {
          if (gameTable[i][j - 1] === "town") town = true;
        }
        if (j + 1 < gameTable.length) {
          if (gameTable[i][j + 1] === "town") town = true;
        }
        if (town) {
          points += 2;
        }
      }
    }
  }
  return points;
}

// Counts the points for the longest horizontally continuous town squares.
function terracedHouse() {
  let points = 0;
  let longest_town = 0;
  for (let i = 0; i < gameTable.length; i++) {
    continous_town = 0;
    for (let j = 0; j < gameTable.length; j++) {
      if (gameTable[i][j] === "town") {
        continous_town += 1;
      } else {
        continous_town = 0;
      }
      if (continous_town > longest_town) {
        longest_town = continous_town;
      }
    }
  }
  points = longest_town * 2;
  return points;
}

// Counts the points for each odd-numbered full column.
function unmatchedSilos() {
  let points = 0;
  for (let i = 0; i < gameTable.length; i += 2) {
    full_column = true;
    for (let j = 0; j < gameTable.length; j++) {
      if (gameTable[j][i] === "empty") {
        full_column = false;
      }
    }
    if (full_column) {
      points += 10;
    }
  }
  return points;
}

// Counts the points for each line containing at least five different terrain types.
function richCountryside() {
  let points = 0;
  for (let i = 0; i < gameTable.length; i++) {
    let unique_line_elements = new Set();
    for (let j = 0; j < gameTable.length; j++) {
      if (gameTable[i][j] != "empty") {
        unique_line_elements.add(gameTable[i][j]);
      }
    }
    if (unique_line_elements.size >= 5) {
      points += 4;
    }
  }
  return points;
}

// Counts the additional points for mountains that are fully surrounded by other tiles.
function countSurroundedMountain() {
  let points = 0;
  for (let i = 0; i < gameTable.length; i++) {
    for (let j = 0; j < gameTable[i].length; j++) {
      if (gameTable[i][j] === "mountain") {
        let isSurrounded = true;
        // Check each adjacent cell, ensuring we don't go out of bounds
        if (i > 0 && gameTable[i - 1][j] === "empty") isSurrounded = false;
        if (i < gameTable.length - 1 && gameTable[i + 1][j] === "empty")
          isSurrounded = false;
        if (j > 0 && gameTable[i][j - 1] === "empty") isSurrounded = false;
        if (j < gameTable[i].length - 1 && gameTable[i][j + 1] === "empty")
          isSurrounded = false;

        if (isSurrounded) points += 1;
      }
    }
  }
  return points;
}

function loadGameProgress() {
  const savedData = localStorage.getItem("gameProgress");
  if (savedData) {
    const gameState = JSON.parse(savedData);

    // If gameTable is a const, clear its contents and repopulate it
    gameTable.length = 0;
    gameState.gameTable.forEach((row) => gameTable.push(row));

    // Restoring all the game state variables
    timer = gameState.timer;
    current_season = gameState.current_season;
    mission_A_points = gameState.mission_A_points;
    mission_B_points = gameState.mission_B_points;
    mission_C_points = gameState.mission_C_points;
    mission_D_points = gameState.mission_D_points;
    springPoints = gameState.springPoints;
    summerPoints = gameState.summerPoints;
    autumnPoints = gameState.autumnPoints;
    winterPoints = gameState.winterPoints;
    game.currentIndex = gameState.currentIndex;

    // Update the UI and game elements based on the loaded state
    updateScreen();
    // Additional UI updates as necessary
  }
  console.log("Loaded game state:", gameState);
}

function saveGame() {
  const gameState = {
    gameTable,
    timer,
    current_season,
    mission_A_points,
    mission_B_points,
    mission_C_points,
    mission_D_points,
    springPoints,
    summerPoints,
    autumnPoints,
    winterPoints,
    currentIndex: game.currentIndex, // Saving the current index of the game elements
  };
  localStorage.setItem("gameProgress", JSON.stringify(gameState));
  alert("Game progress saved successfully!");
  console.log("Saving game state:", gameState);
}
function resetGame() {
  // Clear and repopulate the gameTable
  gameTable.length = 0;
  let newTable = generateGameTable(numRows, numCols, numMountains);
  newTable.forEach((row) => gameTable.push(row));

  // Reset other game state variables
  timer = 0;
  current_season = 0;
  mission_A_points = 0;
  mission_B_points = 0;
  mission_C_points = 0;
  mission_D_points = 0;
  springPoints = 0;
  summerPoints = 0;
  autumnPoints = 0;
  winterPoints = 0;

  if (typeof game !== "undefined") {
    game.currentIndex = 0;
  }

  // Clear saved data
  localStorage.removeItem("gameProgress");

  // Update the game screen with reset data
  updateScreen();

  alert("Game progress has been reset!");
}

const ROWS = 81;
const COLS = 81;

let grid = [];

let reset = document.querySelector("#reset");
reset.addEventListener("click", () => {
  let bod = document.querySelector(".cntr");
  bod.innerHTML = "";
  grid = [];
  createGrid(ROWS, COLS);
});

function createGrid(rows, cols) {
  let bod = document.querySelector(".cntr");
  for (let i = 0; i < rows; i++) {
    let gcol = [];
    for (let j = 0; j < cols; j++) {
      let div = document.createElement("div");
      div.classList.add("empty");
      div.classList.add("cell");
      div.id = "cell" + i + "-" + j;
      div.dataset.row = i;
      div.dataset.col = j;
      //div.innerText = i + '.' + j;
      gcol.push('o');
      bod.appendChild(div);
    }
    grid.push(gcol);
  }
  addOuterWalls();
  let ent = addEntrance();
  addInnerWalls(true, 1, grid.length - 2, 1, grid.length - 2, ent);
  display();
}

createGrid(ROWS, COLS);

let container = document.querySelector(".cntr");
container.addEventListener("click", (event) => {
  let x = parseInt(event.target.dataset.row);
  let y = parseInt(event.target.dataset.col);
  wave(x, y);
});

function wave(x, y, depth = 0) {
  if (x < 0 || x >= ROWS || y < 0 || y >= COLS) {
    return;
  }
  if (grid[x][y]=='o') {
    grid[x][y] = 'f';
    let el = document.querySelector("#cell" + x + "-" + y);
    el.classList.toggle("filled");
    el.classList.toggle("empty");
    // get neighbors
    setTimeout(() => wave(x - 1, y, depth + 0.1), 40);
    setTimeout(() => wave(x + 1, y, depth + 0.1), 40);
    setTimeout(() => wave(x, y - 1, depth + 0.1), 40);
    setTimeout(() => wave(x, y + 1, depth + 0.1), 40);
  }
}

function addOuterWalls() {
    for (var i = 0; i < grid.length; i++) {
        if (i == 0 || i == (grid.length - 1)) {
            for (var j = 0; j < grid.length; j++) {
                grid[i][j] = "w";
            }
        } else {
            grid[i][0] = "w";
            grid[i][grid.length - 1] = "w";
        }
    }
}

function addEntrance() {
    var x = randomNumber(1, grid.length - 1);
    grid[grid.length - 1][x] = "o";
    return x;
}

function addInnerWalls(h, minX, maxX, minY, maxY, gate) {
    if (h) {

        if (maxX - minX < 2) {
            return;
        }

        var y = Math.floor(randomNumber(minY, maxY)/2)*2;
        addHWall(minX, maxX, y);

        addInnerWalls(!h, minX, maxX, minY, y-1, gate);
        addInnerWalls(!h, minX, maxX, y + 1, maxY, gate);
    } else {
        if (maxY - minY < 2) {
            return;
        }

        var x = Math.floor(randomNumber(minX, maxX)/2)*2;
        addVWall(minY, maxY, x);

        addInnerWalls(!h, minX, x-1, minY, maxY, gate);
        addInnerWalls(!h, x + 1, maxX, minY, maxY, gate);
    }
}

function addHWall(minX, maxX, y) {
    var hole = Math.floor(randomNumber(minX, maxX)/2)*2+1;

    for (var i = minX; i <= maxX; i++) {
        if (i == hole) grid[y][i] = "o";
        else grid[y][i] = "w";
    }
}

function addVWall(minY, maxY, x) {
    var hole = Math.floor(randomNumber(minY, maxY)/2)*2+1;

    for (var i = minY; i <= maxY; i++) {
        if (i == hole) grid[i][x] = "o";
        else grid[i][x] = "w";
    }
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function display() {
    for (var i = 0; i < ROWS; i++) {
        for (var j = 0; j < COLS; j++) {
            let el = document.querySelector("#cell" + i + "-" + j);
            if(grid[i][j]=='w') {
                el.classList.add("wall");
            }
        }
    }
}

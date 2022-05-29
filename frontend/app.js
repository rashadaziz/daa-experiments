const backgroundCanvas = document.getElementById("background");
backgroundCanvas.height = innerHeight;
backgroundCanvas.width = innerWidth;
const backgroundCtx = backgroundCanvas.getContext("2d");
const background = new Background(backgroundCtx, 8, 8);
const gridCanvas = document.getElementById("grid");
gridCanvas.height = innerHeight;
gridCanvas.width = innerWidth;
const gridCtx = gridCanvas.getContext("2d");
let animationController;
let currentFinder = "A STAR"

const SQ_HEIGHT = 8;
const SQ_WIDTH = 8;
const GRID_SIZE = {
  width: Math.ceil(1000 / SQ_WIDTH),
  height: Math.ceil(1000 / SQ_HEIGHT),
};
let mouseDown = false;
let mode = null;

const START_NODE = { x: 1, y: 1 };
const END_NODE = { x: 99, y: 49 };

const GRID = new Grid(GRID_SIZE.width, GRID_SIZE.height);
// GRID.generateRandomMaze()
let constructedPath;

function main() {
  gridCanvas.addEventListener("mousedown", (e) => {
    render();
    mouseDown = true;
    let x = Math.floor(e.clientX / SQ_WIDTH);
    let y = Math.floor(e.clientY / SQ_HEIGHT);
    const controlPanel = document.getElementsByName("type");
    for (let input of controlPanel) {
      if (input.checked) {
        if (input.value === "start") {
          START_NODE.x = x;
          START_NODE.y = y;
          mode = "start";
        } else if (input.value === "barrier") {
          if (constructedPath) {
            GRID.reset();
            constructedPath = null;
          }
          GRID.setWalkable(x, y, false);
          mode = "barrier";
        } else if (input.value === "end") {
          END_NODE.x = x;
          END_NODE.y = y;
          mode = "destination";
        }
      }
    }
  });

  gridCanvas.addEventListener("mousemove", (e) => {
    e.stopPropagation();
    e.stopImmediatePropagation();
    if (mouseDown) {
      let x = Math.floor(e.clientX / SQ_WIDTH);
      let y = Math.floor(e.clientY / SQ_HEIGHT);
      if (mode === "barrier") {
        GRID.setWalkable(x, y, false);
      }
    }
  });

  gridCanvas.addEventListener("mouseup", (e) => {
    mouseDown = false;
  });

  addEventListener("keypress", async (e) => {
    if (e.key === "c") {
      GRID.clearBarriers();
    }
    if (e.key === "r") {
      if (constructedPath) {
        GRID.reset();
        constructedPath = null;
        render();
      }
    }
    if (e.code === "Space") {
      if (constructedPath) {
        return
      }
      if (currentFinder === "A STAR") {
        constructedPath = await findPath(START_NODE.x, START_NODE.y, END_NODE.x, END_NODE.y, GRID)
      } else if (currentFinder === "L STAR") {
        const w = parseFloat(document.getElementById("coefficient").value)
      constructedPath = await findPathL(
        START_NODE.x,
        START_NODE.y,
        END_NODE.x,
        END_NODE.y,
        GRID,
        1,
        w
      );
      }
    }
  });
  addEventListener("mousemove", (e) => {});
  background.render();
  render();
}

function render() {
  gridCtx.clearRect(0, 0, innerWidth, innerHeight);
  renderGrid(GRID, gridCtx);
  const stopAnim = renderPath(constructedPath, gridCtx);
  renderStartEndNodes(gridCtx);
  if (!stopAnim) {
    animationController = requestAnimationFrame(render);
  } else {
    cancelAnimationFrame(animationController);
  }
}
function renderPath(constructedPath, ctx) {
  if (constructedPath) {
    for (let i = 0; i < constructedPath.length - 1; i++) {
      let currPoint = constructedPath[i];
      let nextPoint = constructedPath[i + 1];

      let xOffset = SQ_WIDTH * 0.5;
      let yOffset = SQ_HEIGHT * 0.5;

      ctx.beginPath();
      ctx.strokeStyle = "purple";
      ctx.lineWidth = 2.5;
      ctx.moveTo(
        currPoint[0] * SQ_WIDTH + xOffset,
        currPoint[1] * SQ_HEIGHT + yOffset
      );
      ctx.lineTo(
        nextPoint[0] * SQ_WIDTH + xOffset,
        nextPoint[1] * SQ_HEIGHT + yOffset
      );
      ctx.stroke();
      ctx.lineWidth = 1;
    }
    return true;
  }
}
function renderGrid(grid, ctx) {
  for (let nodeRow of grid.nodeMap) {
    for (let node of nodeRow) {
      if (!node.walkable) {
        ctx.fillStyle = "black";
        ctx.fillRect(
          node.x * SQ_WIDTH,
          node.y * SQ_HEIGHT,
          SQ_WIDTH,
          SQ_HEIGHT
        );
      }
      if (node.opened) {
        ctx.clearRect(
          node.x * SQ_WIDTH,
          node.y * SQ_HEIGHT,
          node.x * SQ_WIDTH + SQ_WIDTH,
          node.y * SQ_HEIGHT + SQ_HEIGHT
        );
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = "blue";
        ctx.fillRect(
          node.x * SQ_WIDTH,
          node.y * SQ_HEIGHT,
          SQ_WIDTH,
          SQ_HEIGHT
        );
        ctx.globalAlpha = 1;
      }
      if (node.closed) {
        ctx.clearRect(
          node.x * SQ_WIDTH,
          node.y * SQ_HEIGHT,
          node.x * SQ_WIDTH + SQ_WIDTH,
          node.y * SQ_HEIGHT + SQ_HEIGHT
        );
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = "orange";
        ctx.fillRect(
          node.x * SQ_WIDTH,
          node.y * SQ_HEIGHT,
          SQ_WIDTH,
          SQ_HEIGHT
        );
        ctx.globalAlpha = 1;
      }
    }
  }
}

function renderStartEndNodes(ctx) {
  if (START_NODE.x && START_NODE.y) {
    ctx.beginPath();
    ctx.arc(
      START_NODE.x * SQ_WIDTH + SQ_WIDTH * 0.5,
      START_NODE.y * SQ_HEIGHT + SQ_WIDTH * 0.5,
      SQ_WIDTH * 0.5,
      0,
      2 * Math.PI
    );
    ctx.fillStyle = "lime";
    ctx.fill();
  }
  if (END_NODE.x && END_NODE.y) {
    ctx.beginPath();
    ctx.arc(
      END_NODE.x * SQ_WIDTH + SQ_WIDTH * 0.5,
      END_NODE.y * SQ_HEIGHT + SQ_WIDTH * 0.5,
      SQ_WIDTH * 0.5,
      0,
      2 * Math.PI
    );
    ctx.fillStyle = "red";
    ctx.fill();
  }
}

addEventListener("load", main);

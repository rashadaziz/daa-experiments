
class Grid {
  constructor(width, height, matrix) {
    if (typeof width !== "object") {
      this.width = width;
      this.height = height;
      this.matrix = matrix;
    } else {
      this.height = width.length;
      this.width = width[0].length;
      this.matrix = width;
    }
    if (!matrix) {
        this.matrix = this.generateMatrix(this.width, this.height);
    }
    this.nodeMap = this.generateNodeMap(this.width, this.height, this.matrix);
  }
  generateMatrix(width, height) {
      let matrix = new Array(height)
      for (let i = 0; i < height; i++) {
        matrix[i] = new Array(width);
        for (let j = 0; j < width; j++) {
            matrix[i][j] = 0;
        }
      }
      return matrix
  }
  generateNodeMap(width, height, matrix) {
    let nodes = new Array(height);

    for (let i = 0; i < height; i++) {
      nodes[i] = new Array(width);
      for (let j = 0; j < width; j++) {
        nodes[i][j] = new Node(j, i, matrix[i][j] ? false : true);
      }
    }

    if (matrix.length !== height || matrix[0].length !== width) {
      throw new Error("Invalid Matrix Size");
    }

    return nodes;
  }
  getNode(x, y) {
    return this.nodeMap[y][x];
  }
  isWalkable(x, y) {
    return this.isInside(x, y) && this.nodeMap[y][x].walkable;
  }
  isInside(x, y) {
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  }
  setWalkable(x, y, walkable) {
    this.nodeMap[y][x].walkable = walkable;
  }
  getNodeNeighbors(node) {
    let neighbors = [],
      nodes = this.nodeMap,
      x = node.x,
      y = node.y;

    let validRight = this.isWalkable(x + 1, y);
    let validLeft = this.isWalkable(x - 1, y);
    let validDown = this.isWalkable(x, y + 1);
    let validUp = this.isWalkable(x, y - 1);

    if (validUp) {
      // UP
      neighbors.push(nodes[y - 1][x]);
    }
    if (validDown) {
      // DOWN
      neighbors.push(nodes[y + 1][x]);
    }
    if (validLeft) {
      // LEFT
      neighbors.push(nodes[y][x - 1]);
    }
    if (validRight) {
      // RIGHT
      neighbors.push(nodes[y][x + 1]);
    }
    // DIAGONAL MOVEMENT
    if (validRight && this.isWalkable(x + 1, y - 1)) {
      // RIGHT UP
      neighbors.push(nodes[y - 1][x + 1]);
    }
    if (validLeft && this.isWalkable(x - 1, y - 1)) {
      // LEFT UP
      neighbors.push(nodes[y - 1][x - 1]);
    }
    if (validRight && this.isWalkable(x + 1, y + 1)) {
      // RIGHT DOWN
      neighbors.push(nodes[y + 1][x + 1]);
    }
    if (validLeft && this.isWalkable(x - 1, y + 1)) {
      // LEFT DOWN
      neighbors.push(nodes[y + 1][x - 1]);
    }
    return neighbors;
  }
  generateRandomMaze() {
    for (let row of this.nodeMap) {
      for (let node of row) {
        const rand = Math.random();
        if (rand > 0.7) {
          this.setWalkable(node.x, node.y, false) 
        }
      }
    }
  }
  reset() {
    for (let row of this.nodeMap) {
      for (let node of row) {
        if (node.walkable) {
          this.nodeMap[node.y][node.x] = new Node(node.x, node.y)
        }
      }
    }
  }
  clearBarriers() {
    for (let row of this.nodeMap) {
      for (let node of row) {
        if (!node.walkable) {
          this.nodeMap[node.y][node.x] = new Node(node.x, node.y)
        }
      }
    }
  }
}

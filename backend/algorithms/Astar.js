

function findPath(sx, sy, dx, dy, grid) {
  let numberOfNodesOpened = 1;
  let openNodesUpdated = 0;

  let start = performance.now();
  let openList = new Heap(function (nodeA, nodeB) {
    return nodeA.f - nodeB.f;
  });
  let src = grid.getNode(sx, sy);
  let dest = grid.getNode(dx, dy);
  src.f = euclidean(src, dest);
  src.g = 0;
  src.opened = true;
  openList.push(src);

  while (!openList.empty()) {
    let current = openList.pop();
    current.closed = true;

    if (current === dest) {
      console.log("========================================");
      console.log("A* algorithm", performance.now() - start);
      console.log(`number of nodes opened: ${numberOfNodesOpened}`);
      console.log(`number of nodes updated: ${openNodesUpdated}`);
      console.log(`total g cost: ${current.g}`);
      console.log("========================================");
      return reconstructPath(dest);
      // const compTime = performance.now() - start;
      // return {compTime: compTime, nodesOpened: numberOfNodesOpened, nodesUpdated: openNodesUpdated}
    }

    for (let neighbor of grid.getNodeNeighbors(current)) {
      if (neighbor.closed) {
        continue;
      }
      let cost =
        neighbor.x - current.x === 0 || neighbor.y - current.y === 0
          ? 1
          : Math.SQRT2;

      let gCost = current.g + cost;

      if (!neighbor.opened || gCost < neighbor.g) {
        neighbor.g = gCost;
        neighbor.h = neighbor.h || euclidean(neighbor, dest);
        neighbor.f = neighbor.g + neighbor.h;
        neighbor.parent = current;

        if (!neighbor.opened) {
          openList.push(neighbor);
          numberOfNodesOpened++;
          neighbor.opened = true;
        } else {
          openNodesUpdated++;
          openList.updateItem(neighbor);
        }
      }
    }
  }
  return [];
}



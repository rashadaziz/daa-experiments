function manhattan(nodeA, nodeB) {
  return Math.abs(nodeA.x - nodeB.x) + Math.abs(nodeA.y - nodeB.y);
}
function euclidean(nodeA, nodeB) {
  return Math.sqrt(
    Math.pow(nodeA.x - nodeB.x, 2) + Math.pow(nodeA.y - nodeB.y, 2)
  );
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function reconstructPath(current) {
  let path = [[current.x, current.y]];
  while (current.parent) {
    current = current.parent;
    path.push([current.x, current.y]);
  }
  return path.reverse();
}


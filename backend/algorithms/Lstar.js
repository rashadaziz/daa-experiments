const deque = require("../core/deque");
const BucketElement = deque.BucketElement;
const Bucket = deque.Bucket;
const OpenList = require("../core/openList").OpenList;
const euclidean = require("../core/util").euclidean;

function findPathL(sx, sy, dx, dy, grid, dgmin, w) {
  let numberOfNodesOpened = 1
  let openNodesUpdated = 0

    let start = performance.now();
  const src = grid.getNode(sx, sy);
  const dest = grid.getNode(dx, dy);

  const f0 = w * euclidean(src, dest);
  const df = (1 - w) * dgmin;

  const openList = new OpenList([]);
  src.f = f0;
  src.g = 0;
  src.opened = true;
  const firstBucket = new Bucket();
  const firstBucketElement = new BucketElement(src);
  firstBucket.insertFront(firstBucketElement);
  openList.incSize();

  openList.array.push(firstBucket);

  let pathExist = false;
  let currentBucketReadIdx = 1;
  let counter = 0
  while (!openList.empty() && counter < 8) {
    let currentBucket = openList.get(currentBucketReadIdx - 1);

    while (currentBucket && !currentBucket.isEmpty()) {
      let firstNode = currentBucket.popFront().node;
      firstNode.closed = true;
      openList.decSize();

      if (firstNode === dest) {
        // console.log("========================================")
        // console.log("L* algorithm", performance.now() - start);
        // console.log(`number of nodes opened: ${numberOfNodesOpened}`)
        // console.log(`number of nodes updated: ${openNodesUpdated}`)
        // console.log(`total g cost: ${firstNode.g}`)
        // console.log("========================================")

        // pathExist = true;
        // return reconstructPath(firstNode);

        const compTime = performance.now() - start;
        return {compTime: compTime, nodesOpened: numberOfNodesOpened, nodesUpdated: openNodesUpdated}
      }


      for (let adjacent of grid.getNodeNeighbors(firstNode)) {
        let cost =
        ((adjacent.x - firstNode.x === 0 || adjacent.y - firstNode.y === 0)
          ? 1
          : Math.SQRT2);
        if (adjacent.closed) {
              continue
          }
        if (!adjacent.opened) {
          adjacent.parent = firstNode;
          const fNadjacent = firstNode.g + cost + w * euclidean(adjacent, dest);
          adjacent.f = fNadjacent;
          adjacent.g = firstNode.g + cost;

          const SL = Math.floor((adjacent.f-f0)/df) + 1;

          if (!openList.get(SL-1)) {
              // fill empty index with a new bucket (infinite bucket)
              openList.array[SL-1] = new Bucket();
          }

          const bucket = openList.get(SL-1);
          bucket.insertFront(new BucketElement(adjacent))
          adjacent.opened = true;
          adjacent.bucketIndex = SL-1;
          openList.incSize();
          numberOfNodesOpened++
        } else {
            
            if ((firstNode.g + cost) < adjacent.g) {
                adjacent.parent = firstNode
                const fNadjacent = firstNode.g + cost + w * euclidean(adjacent, dest);
                adjacent.f = fNadjacent
                adjacent.g = firstNode.g + cost
                const SL = Math.floor((adjacent.f-f0)/df) + 1;

                const previousBucket = openList.get(adjacent.bucketIndex);
                const element = previousBucket.find(adjacent)
                previousBucket.pop(element)

                if (!openList.get(SL-1)) {
                    // fill empty index with a new bucket (infinite bucket)
                    openList.array[SL-1] = new Bucket();
                }

                const bucket = openList.get(SL-1);
                bucket.insertFront(element)
                adjacent.opened = true;
                adjacent.bucketIndex = SL-1;

                openNodesUpdated++;
            }
        }
      }
    }
    
    currentBucketReadIdx++;
  }
}


exports.findPath = findPathL
let gridSize = 50 

const fs = require("fs")
const Grid = require("../backend/core/grid").Grid
const lstar = require("../backend/algorithms/Lstar");
const astar = require("../backend/algorithms/Astar");

let content = `lstar5,lstar9,astar,width,height\n`
let contentOpenNodes = `lstar5,lstar9,astar,width,height\n`
let contentUpdatedNodes = `lstar5,lstar9,astar,width,height\n`

while (gridSize <= 2500) {
    const height = gridSize - (gridSize*0.5)
   
    let GRID = new Grid(gridSize, height);
    const zeropointfiveL = lstar.findPath(0, 0, gridSize-1, height-1, GRID, 1, 0.5)
    GRID = new Grid(gridSize, gridSize);
    const zeropointnineL = lstar.findPath(0, 0, gridSize-1, height-1, GRID, 1, 0.9)
    GRID = new Grid(gridSize, gridSize);
    const A = astar.findPath(0, 0, gridSize-1, height-1, GRID)

    content += `${zeropointfiveL.compTime},`
    content += `${zeropointnineL.compTime},`
    content += `${A.compTime},`
    content += `${gridSize},`
    content += `${height}\n`

    contentOpenNodes += `${zeropointfiveL.nodesOpened},`
    contentOpenNodes += `${zeropointnineL.nodesOpened},`
    contentOpenNodes += `${A.nodesOpened},`
    contentOpenNodes += `${gridSize},`
    contentOpenNodes += `${height}\n`

    contentUpdatedNodes += `${zeropointfiveL.nodesUpdated},`
    contentUpdatedNodes += `${zeropointnineL.nodesUpdated},`
    contentUpdatedNodes += `${A.nodesUpdated},`
    contentUpdatedNodes += `${gridSize},`
    contentUpdatedNodes += `${height}\n`
    try {
        fs.appendFileSync("./asymmetric_grid_time.txt", content)
        fs.appendFileSync("./asymmetric_grid_nodes_opened.txt", contentOpenNodes)
        fs.appendFileSync("./asymmetric_grid_nodes_updated.txt", contentUpdatedNodes)
        content = ""
        contentOpenNodes = ""
        contentUpdatedNodes = ""
    } catch (err) {
        console.log(err)
    }

    gridSize += 50
}





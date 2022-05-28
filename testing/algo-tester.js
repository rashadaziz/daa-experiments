let gridSize = 50 

const fs = require("fs")
const Grid = require("../backend/core/grid").Grid
const lstar = require("../backend/algorithms/Lstar");
const astar = require("../backend/algorithms/Astar");

let content = `lstar5,lstar9,astar,dimension\n`

while (gridSize <= 2500) {
    const height = gridSize
    const numIters = 5;
    let sumCompLFive = 0;
    let sumCompLNine = 0;
    let sumCompA = 0;

    for (let i = 0; i < numIters; i++) {
        let GRID = new Grid(gridSize, height);
        const zeropointfiveL = lstar.findPath(0, 0, gridSize-1, height-1, GRID, 1, 0.5)
        sumCompLFive += zeropointfiveL.compTime

        GRID = new Grid(gridSize, gridSize);
        const zeropointnineL = lstar.findPath(0, 0, gridSize-1, height-1, GRID, 1, 0.9)
        sumCompLNine += zeropointnineL.compTime

        GRID = new Grid(gridSize, gridSize);
        const A = astar.findPath(0, 0, gridSize-1, height-1, GRID)
        sumCompA += A.compTime
    }

    content += `${sumCompLFive/numIters},`
    content += `${sumCompLNine/numIters},`
    content += `${sumCompA/numIters},`
    content += `${gridSize}x${height}\n`

    try {
        fs.appendFileSync("./symmetric_grid_time_average5.csv", content)
        content = ""
    } catch (err) {
        console.log(err)
    }

    gridSize += 50
}





const GridUtils = require('../utils/gridUtils');

module.exports = class GridGeneratorService {

  static newGrid(width, height) {
    const rows = new Array(height);
    rows[0] = GridGeneratorService.getHorizontalWall(width);
    for (let i = 1; i < height - 1; i++) {
      rows[i] = GridGeneratorService.getInnerRow(width);
    }
    rows[height - 1] = GridGeneratorService.getHorizontalWall(width);
    const grid = {rows, width, height};
    GridGeneratorService.setCharacterPosition(grid);
    return grid;
  }

  static getHorizontalWall(width) {
    return (new Array(width)).fill(GridUtils.WALL);
  }

  static getInnerRow(width) {
    const row = new Array(width);
    row[0] = GridUtils.WALL;
    for (let i = 1; i < width - 1; i++) {
      const chance = Math.random();
      row[i] = chance < .8 ? GridUtils.FREE : GridUtils.WALL;
    }
    row[width - 1] = GridUtils.WALL;
    return row;
  }

  static setCharacterPosition(grid) {
    let i = 0;
    do {
      const row = GridGeneratorService.randomIntFromInterval(0, grid.height);
      const col = GridGeneratorService.randomIntFromInterval(0, grid.width);
      if (grid.rows[row][col] === GridUtils.FREE) {
        console.log('Setting character at position: ', row, col);
        grid.rows[row][col] = GridUtils.CHARACTER;
        break;
      }
    }while(i++ < grid.width * grid.height);
  }

  static randomIntFromInterval(min,max) {// min and max included 
    return Math.floor(Math.random()*(max-min+1)+min);
  }
};

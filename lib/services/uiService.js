const CLI = require('clui');
const clear = CLI.Clear;
const clc = require('cli-color');
const GridUtils = require('../utils/gridUtils');
const Line = CLI.Line;
const LineBuffer = CLI.LineBuffer;

const renderMapping = {
  [GridUtils.FREE]: l => l.column(GridUtils.FREE, 1),
  [GridUtils.WALL]: l => l.column(GridUtils.WALL, 1, [clc.black]),
  [GridUtils.SEEN]: l => l.column(GridUtils.SEEN, 1, [clc.black]),
  [GridUtils.CHARACTER]: l => l.column(GridUtils.CHARACTER, 1)
}

module.exports = class UIService {

  constructor(grid) {
    this.grid = grid;
  }

  render() {
    clear();

    const outputBuffer = new LineBuffer({
      x: 0,
      y: 0,
      width: this.grid.width,
      height: this.grid.height
    });

    for (let row of this.grid.rows) {
      let line = new Line(outputBuffer);
      for (let cell of row) {
        line = renderMapping[cell](line);
      }
      line = line.fill().store();
    }
    outputBuffer.output();
  }
};

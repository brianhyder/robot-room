const GridImportService = require('./lib/services/gridImportService');
const GridGeneratorService = require('./lib/services/gridGeneratorService');
const GridUtils = require('./lib/utils/gridUtils');
const NavigationService = require('./lib/services/navigationService');
const UIService = require('./lib/services/uiService');

//const grid = GridImportService.importSync('./examples/basic.txt');
//const grid = GridImportService.importSync('./examples/killbox.txt');
const grid = GridGeneratorService.newGrid(50, 20);
const uiService = new UIService(grid);
const navService = new NavigationService(grid);
uiService.render();

const q = [navService.getCurrentPosition()];
const qNodes = node => {
  [NavigationService.N, NavigationService.W, NavigationService.S, NavigationService.E].forEach(d => {
    if (navService.peek(d) === GridUtils.FREE) {
      q.unshift(navService.getPosition(d));
    }
  });
};
const _run = () => {
  if (q.length === 0) {
    process.exit(0);
  }
  const node = q.shift();
  navService.moveTo(node);
  qNodes(node);
};
const run = () => {
  _run();
  uiService.render();
};
setInterval(run, 100);

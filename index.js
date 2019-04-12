const GridImportService = require('./lib/services/gridImportService');
const GridUtils = require('./lib/utils/gridUtils');
const NavigationService = require('./lib/services/navigationService');
const UIService = require('./lib/services/uiService');

const grid = GridImportService.importSync('./examples/basic.txt');
const uiService = new UIService(grid);
const navService = new NavigationService(grid);
uiService.render();

const _run = () => {
  const priorities = [GridUtils.FREE, GridUtils.SEEN];
  for (let priority of priorities) {
    if (navService.peekForward() === priority) {
      return navService.moveForward();
    }
    if (navService.peekLeft() === priority) {
      return navService.moveLeft();
    }
    if (navService.peekBack() === priority) {
      return navService.moveBack();
    }
    if (navService.peekRight === priority) {
      return navService.moveRight();
    }
  }
  return navService.moveBack();
};
const run = () => {
  _run();
  uiService.render();
};
setInterval(run, 100);

const GridUtils = require('../utils/gridUtils');

module.exports = class NavigationService {

  static get N () {
    return 'N';
  }

  static get S () {
    return 'S';
  }

  static get E () {
    return 'E';
  }

  static get W () {
    return 'W';
  }

  static get LEFT_MAP () {
    return {
      [NavigationService.N]: NavigationService.W,
      [NavigationService.S]: NavigationService.E,
      [NavigationService.E]: NavigationService.N,
      [NavigationService.W]: NavigationService.S,
    };
  }

  static get RIGHT_MAP () {
    return {
      [NavigationService.N]: NavigationService.E,
      [NavigationService.S]: NavigationService.W,
      [NavigationService.E]: NavigationService.S,
      [NavigationService.W]: NavigationService.N,
    };
  }

  static get BACK_MAP () {
    return {
      [NavigationService.N]: NavigationService.S,
      [NavigationService.S]: NavigationService.N,
      [NavigationService.E]: NavigationService.W,
      [NavigationService.W]: NavigationService.E,
    };
  }

  constructor(grid) {
    this.grid = grid;
    this.position = this.findPosition();
    this.direction = NavigationService.N;
  }

  peek(direction) {
    const map = {
      [NavigationService.N]: () => this.grid.rows[this.position.row - 1][this.position.col],
      [NavigationService.S]: () => this.grid.rows[this.position.row + 1][this.position.col],
      [NavigationService.E]: () => this.grid.rows[this.position.row][this.position.col + 1],
      [NavigationService.W]: () => this.grid.rows[this.position.row][this.position.col - 1],
    };
    return map[direction]();
  }

  move(direction) {
    this.setPositionAs(GridUtils.SEEN);
    const map = {
      [NavigationService.N]: () => this.position.row -= 1,
      [NavigationService.S]: () => this.position.row += 1,
      [NavigationService.E]: () => this.position.col += 1,
      [NavigationService.W]: () => this.position.col -= 1,
    };
    const result = map[this.direction = direction]();
    this.setPositionAs(GridUtils.CHARACTER);
    return result;
  }

  moveTo(position) {
    this.setPositionAs(GridUtils.SEEN);
    this.position = position;
    this.setPositionAs(GridUtils.CHARACTER);
  }

  peekAt(position) {
    return this.grid.rows[this.position.row][this.position.col];
  }

  peekForward() {
    return this.peek(this.direction);
  }

  peekLeft() {
    const map = NavigationService.LEFT_MAP;
    return this.peek(map[this.direction]);
  }

  peekRight() {
    const map = NavigationService.RIGHT_MAP;
    return this.peek(map[this.direction]);
  }

  peekBack() {
    const map = NavigationService.BACK_MAP;
    return this.peek(map[this.direction]);
  }

  moveForward() {
    this.move(this.direction);
  }

  moveLeft() {
    const map = NavigationService.LEFT_MAP;
    this.move(map[this.direction]);
  }

  moveRight() {
    const map = NavigationService.RIGHT_MAP;
    this.move(map[this.direction]);
  }

  moveBack() {
    const map = NavigationService.BACK_MAP;
    this.move(map[this.direction]);
  }

  turnLeft() {
    this.direction = NavigationService.LEFT_MAP[this.direction];
  }

  setPositionAs(type) {
    this.grid.rows[this.position.row][this.position.col] = type;
  }

  getCurrentPosition() {
    return this.position;
  }

  getPosition(direction) {
    const map = {
      [NavigationService.N]: () => {return {row: this.position.row - 1, col: this.position.col}},
      [NavigationService.S]: () => {return {row: this.position.row + 1, col: this.position.col}},
      [NavigationService.E]: () => {return {row: this.position.row, col: this.position.col + 1}},
      [NavigationService.W]: () => {return {row: this.position.row, col: this.position.col - 1}},
    };
    return map[direction]();
  }

  findPosition() {
    for (let row = 0; row < this.grid.rows.length; row++) {
      for (let col = 0; col < this.grid.rows[row].length; col++) {
        if (this.grid.rows[row][col] === GridUtils.CHARACTER) {
          return {row, col};
        }
      }
    }
    return null;
  }
}
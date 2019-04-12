const fs = require('fs');

module.exports = class GridImportService {

  static importSync(filename) {
    const rawData = fs.readFileSync(filename);
    const rows = rawData.toString().split('\n').map(row => [...row]);
    return {
      rows,
      width: rows[0].length,
      height: rows.length
    };
  }
};

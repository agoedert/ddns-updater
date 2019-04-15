const expect = require('chai').expect;
const task = require('../task.js');

describe('updateRecord', function() {
  it('should handle errors', function () {
    expect(task.updateRecord()).to.be.ok;
  });
});

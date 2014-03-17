'use strict';

var _ = require('highland');
var Board = require('../../../server/knightstour/board')();
var Knight = require('../../../server/knightstour/knight')();


describe('Board', function() {
  var boardSize = 3;

  it('should take a board size and a Knight', function() {
    var b = new Board(boardSize, new Knight(boardSize));
    expect(b.size).toBe(boardSize);
    expect(_.isStream(b.out)).toBe(true);
  });

  it('should fail if the knight and board do not agree on size', function() {
    expect(function() { new Board(2); }).toThrow('Board size must be greater than 2');
  });

  it('should output the initial board', function(done) {
    var b = new Board(boardSize, new Knight(boardSize));
    b.out.take(1).each(function (o) {
      expect(o).toEqual(
        '+-----+-----+-----+\n' +
        '+  1  +     +     +\n' +
        '+-----+-----+-----+\n' +
        '+     +     +     +\n' +
        '+-----+-----+-----+\n' +
        '+     +     +     +\n' +
        '+-----+-----+-----+\n');
      done();
    });
  });

  it('should output the full knight tour', function(done) {
    var b = new Board(boardSize, new Knight(boardSize));
    b.out.last().each(function (o) {
      expect(o).toEqual(
        '+-----+-----+-----+\n' +
        '+  1  +  6  +  3  +\n' +
        '+-----+-----+-----+\n' +
        '+  4  +     +  8  +\n' +
        '+-----+-----+-----+\n' +
        '+  7  +  2  +  5  +\n' +
        '+-----+-----+-----+\n');
      done();
    });
  });

});
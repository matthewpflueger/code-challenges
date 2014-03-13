'use strict';

var _ = require('highland');
var Board = require('../../server/board')();
var Knight = require('../../server/knight')();


describe('Board', function() {
  var boardSize = 3;

  it('should take a board size and a Knight', function() {
    var b = new Board(boardSize, new Knight(boardSize));
    expect(b.size).toBe(boardSize);
    expect(_.isStream(b.out)).toBe(true);
  });

  it('should fail if the knight and board do not agree on size', function() {
    expect(function() { new Board(2); }).toThrow('Board size must be greater than 2');
    //expect(function() { new Board(boardSize, new Knight(5)); }).toThrow('Knight has board size of 5 but this board is 3');
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

  // it('should fail if the board is too small', function() {
  //   expect(function() { new Knight(2); }).toThrow('Board size must be greater than 2');
  // });

  // it('should take a board size and have a default start location of { x: 0, y: 0 }', function(done) {
  //   var knight = new Knight(3);
  //   expect(knight.board).toBe(3);
  //   expect(knight.start).toEqual({ x: 0, y: 0});
  //   expect(_.isStream(knight.moves)).toBe(true);
  //   done();
  // });

  // it('should fail if there are no moves', function(done) {
  //   var knight = new Knight(3, { x: 1, y: 1});
  //   expect(knight.start).toEqual({ x: 1, y: 1});
  //   knight.moves
  //       .errors(function(err, push) {
  //         expect(err).toEqual('No moves possible');
  //         push(null, { error: err });
  //       }).take(1).toArray(function(ma) {
  //         expect(ma.length).toBe(1);
  //         expect(ma[0].error).toEqual('No moves possible');
  //         done();
  //       });
  // });

  // it('should return a stream of moves from a given location', function(done) {
  //   var knight = new Knight(3);
  //   knight.moves.take(8).toArray(function(ma) {
  //     console.log('ma ', ma);
  //     expect(ma.length).toBe(7);

  //     expect(ma[0].x).toBe(2);
  //     expect(ma[0].y).toBe(1);

  //     expect(ma[1].x).toBe(0);
  //     expect(ma[1].y).toBe(2);

  //     expect(ma[2].x).toBe(1);
  //     expect(ma[2].y).toBe(0);

  //     expect(ma[3].x).toBe(2);
  //     expect(ma[3].y).toBe(2);

  //     expect(ma[4].x).toBe(0);
  //     expect(ma[4].y).toBe(1);

  //     expect(ma[5].x).toBe(2);
  //     expect(ma[5].y).toBe(0);

  //     expect(ma[6].x).toBe(1);
  //     expect(ma[6].y).toBe(2);

  //     done();
  //   });
  // });

});
'use strict';

var _ = require('highland');
var Knight = require('../../server/knight')();


describe('Knight', function() {

  it('should fail if the board is too small', function() {
    expect(function() { new Knight(2); }).toThrow('Board size must be greater than 2');
  });

  it('should fail if invalid start position', function() {
    expect(function() { new Knight(3, { x: 3, y: 3}); }).toThrow('Invalid start position');
  });

  it('should take a board size and have a default start location of { x: 0, y: 0 }', function(done) {
    var knight = new Knight(3);
    expect(knight.boardSize).toBe(3);
    expect(knight.start).toEqual({ x: 0, y: 0});
    expect(_.isStream(knight.moves)).toBe(true);
    done();
  });

  it('should fail if there are no moves', function() {
    expect(function() { new Knight(3, { x: 1, y: 1}); }).toThrow('No moves possible');
  });

  xit('should fail if there are no moves', function(done) {
    var knight = new Knight(3, { x: 1, y: 1});
    expect(knight.start).toEqual({ x: 1, y: 1});
    knight.moves
        .errors(function(err, push) {
          expect(err).toEqual('No moves possible');
          push(null, { error: err });
        }).take(1).toArray(function(ma) {
          expect(ma.length).toBe(1);
          expect(ma[0].error).toEqual('No moves possible');
          done();
        });
  });

  it('should return a stream of moves from a given location', function(done) {
    var knight = new Knight(3);
    knight.moves.take(8).toArray(function(ma) {
      console.log('ma ', ma);
      expect(ma.length).toBe(8);

      var i = -1;

      ++i;
      expect(ma[i].x).toBe(0);
      expect(ma[i].y).toBe(0);

      ++i;
      expect(ma[i].x).toBe(2);
      expect(ma[i].y).toBe(1);

      ++i;
      expect(ma[i].x).toBe(0);
      expect(ma[i].y).toBe(2);

      ++i;
      expect(ma[i].x).toBe(1);
      expect(ma[i].y).toBe(0);

      ++i;
      expect(ma[i].x).toBe(2);
      expect(ma[i].y).toBe(2);

      ++i;
      expect(ma[i].x).toBe(0);
      expect(ma[i].y).toBe(1);

      ++i;
      expect(ma[i].x).toBe(2);
      expect(ma[i].y).toBe(0);

      ++i;
      expect(ma[i].x).toBe(1);
      expect(ma[i].y).toBe(2);

      done();
    });
  });

});
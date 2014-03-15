'use strict';

var bm = require('../../../server/boatmoorings/boatmoorings');


describe('boatmoorings', function() {

  it('should throw an error for invalid data', function() {
    expect(function() { bm([], 2, 16); }).toThrow('Invalid data');
    expect(function() { bm([0], 2, 16); }).toThrow('Invalid data');
    expect(function() { bm([1, 0], 2, 16); }).toThrow('Invalid data');
    expect(function() { bm([1], 0, 16); }).toThrow('Invalid data');
    expect(function() { bm([1], 1, 0); }).toThrow('Invalid data');
  });

  it('should return -1 if it cannot moor all boats', function() {
    expect(bm([1], 2, 3)).toBe(-1);
    expect(bm([1], 6, 10)).toBe(-1);
    expect(bm([1, 3, 3, 3, 14], 2, 16)).toBe(-1);
  });

  it('should return the length of rope required to moor all boats', function() {
    expect(bm([1, 3, 14], 2, 16)).toBe(3);
    expect(bm([14], 2, 16)).toBe(0);
    expect(bm([15], 2, 16)).toBe(1);
    expect(bm([16], 2, 16)).toBe(2);
    expect(bm([16, 16, 16, 16], 2, 16)).toBe(14);
    expect(bm([1, 1, 1, 1], 2, 16)).toBe(13);
    expect(bm([2, 6, 10, 14])).toBe(0);
    expect(bm([1, 3, 16, 16], 2, 16)).toBe(6);
  });

});
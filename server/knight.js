'use strict';

module.exports = function(_) {
  _ = _ || require('highland');

  var movements = [[2, 1], [-2, 1], [1, -2], [1, 2], [-2, -1], [2, -1], [-1, 2], [-1, -2]];

  function Knight(boardSize, start) {
    var self = this;

    if (boardSize < 3) {
      throw new Error('Board size must be greater than 2');
    }

    self.boardSize = boardSize;
    self.start = start || { x: 0, y: 0 };

    function valid(m) {
      return (m.x >= 0 && m.y >= 0 && m.x < self.boardSize && m.y < self.boardSize);
    }

    if (!valid(self.start)) {
      throw new Error('Invalid start position');
    }

    function findMoves(current, moves) {
      var nmvs = [];
      movements.forEach(function (mv) {
        var m = { x: current.x + mv[0], y: current.y + mv[1] };
        var mj = JSON.stringify(m);
        if (valid(m) && moves.lastIndexOf(mj) < 0) {
          nmvs.push(m);
        }
      });
      return nmvs;
    }

    function tour(moves) {
      var current = JSON.parse(moves[moves.length - 1]);
      var nmvs = findMoves(current, moves);
      if (nmvs.length === 0) {
        return moves;
      }

      var nextNmvs = [];
      nmvs.forEach(function(mv) {
        nextNmvs.push(findMoves(mv, moves));
      });

      var least = 0;
      for(var i = 1; i < nextNmvs.length; i++) {
        if (nextNmvs[least].length > nextNmvs[i].length) {
          least = i;
        }
      }

      moves.push(JSON.stringify(nmvs[least]));
      return tour(moves);
    }

    var allMoves = tour([JSON.stringify(self.start)]);
    if (allMoves.length === 1) {
      throw new Error('No moves possible');
    }

    self.moves = _(allMoves).map(function(m) { return JSON.parse(m); });

    Object.freeze(this);
  }

  return Knight;
};

module.exports.$inject = ['highland'];

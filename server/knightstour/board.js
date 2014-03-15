'use strict';

module.exports = function(_) {
  _ = _ || require('highland');

  function Board(size, piece) {
    var self = this;
    self.size = size;

    if (self.size < 3) {
      throw new Error('Board size must be greater than 2');
    }

    if (self.size !== piece.boardSize) {
      throw new Error(
        piece.constructor.name +
        ' has board size of ' +
        piece.boardSize +
        ' but this board is ' +
        self.size);
    }

    var count = -1;
    var board = [];
    for (var i = 0; i < self.size; i++) {
      var ib = [];
      for (var x = 0; x < self.size; x++) {
        ib.push(undefined);
      }
      board.push(ib);
    }

    board[piece.start.x][piece.start.y] = ++count;

    function makeBoard() {
      var seg = '+-----';
      var s = '';

      function makeWall() {
        for (var i = 0; i < self.size; i++) {
          s = s + seg;
        }
        s = s + '+' + '\n';
      }

      function makeRow(row) {
        for (var i = 0; i < self.size; i++) {
          s = s + '+';
          makeCol(board[row][i]);
        }
        s = s + '+\n';
      }

      function makeCol(val) {
        if (val < 10) {
          s = s + '  ' + val + '  ';
        } else if (val < 100) {
          s = s + '  ' + val + ' ';
        } else if (val < 1000) {
          s = s + ' ' + val + ' ';
        } else {
          s = s + '     ';
        }
      }

      for (var i = 0; i < self.size; i++) {
        makeWall(s);
        makeRow(i);
      }

      makeWall();
      return s;
    }

    self.out = _(function(push, next) {
      piece.moves.pull(function(err, m) {
        if (err) {
          push(err);
          next();
        } else if (m === _.nil) {
          push(null, _.nil);
        } else {
          board[m.x][m.y] = ++count;
          push(null, makeBoard());
          next();
        }
      });
    });

    Object.freeze(this);
  }

  return Board;
};

module.exports.$inject = ['highland'];

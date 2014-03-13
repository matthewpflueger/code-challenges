'use strict';

var readline = require('readline');
var _ = require('highland');

var Board = require('./board')();
var Knight = require('./knight')();


var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function nextBoard(rl, board) {
  rl.question('Hit Enter to see next board ', function() {
    board.out.pull(function(err, b) {
      if (err) {
        rl.write('ERROR: ', err);
        rl.close();
        process.exit(1);
      }
      if (b === _.nil) {
        rl.write('No more boards.  Goodbye!\n');
        rl.close();
        process.exit(0);
      }

      rl.write(b);
      nextBoard(rl, board);
    });
  });
}

rl.question('Enter board size: ', function(boardSize) {
  var board = new Board(boardSize, new Knight(boardSize));
  nextBoard(rl, board);
});
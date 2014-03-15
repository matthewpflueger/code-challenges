'use strict';

var readline = require('readline'),
    boatmoorings = require('./boatmoorings'),
    moorings = [],
    boatHalfWidth = 0,
    wharfLength = 0;


var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function inputMoorings() {
  rl.question('Enter next mooring position or nothing to end: ', function(m) {
    var maxRopeLength = 0,
        output = '';

    if (m !== '') {
      moorings.push(parseInt(m, 10));
      inputMoorings();
      return;
    }

    maxRopeLength = boatmoorings(moorings, boatHalfWidth, wharfLength);
    output = 'moor ' +
        moorings.length +
        ' boat(s) on a wharf of length ' +
        wharfLength +
        ' at mooring positions\n' +
        moorings;

    if (maxRopeLength < 0) {
      rl.write('Could not ' + output);
    } else {
      rl.write(
        'Maximum length of rope needed to ' +
        output +
        '\nis: ' +
        maxRopeLength +
        '\n');
    }

    rl.close();
  });
}

rl.write('Welcome to the Boat Moorings rope calculator\n\n');

rl.question('Enter boat half width: ', function(width) {
  boatHalfWidth = parseInt(width, 10);

  rl.question('Enter wharf length: ', function(length) {
    wharfLength = parseInt(length, 10);
    inputMoorings();
  });
});
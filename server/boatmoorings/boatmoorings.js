'use strict';

module.exports = function(moorings, boatHalfWidth, wharfLength) {
  var maxLength = 0,
      boatPos = boatHalfWidth,
      dis = 0,
      i = 0,
      previousMooringPos = 1,
      num = moorings.length,
      boatWidth = boatHalfWidth * 2;

  if (num < 1 || boatWidth < 2 || wharfLength < 1) {
    throw new Error('Invalid data');
  }

  //calculate if it is possible to get all boats
  //moored without extending beyond the wharf
  if (num * boatWidth > wharfLength) {
    return -1;
  }

  for (; i < num; i++) {
    dis = 0;

    //make sure the list of moorings makes sense
    if (previousMooringPos > moorings[i]) {
      throw new Error('Invalid data');
    } else {
      previousMooringPos = moorings[i];
    }

    //the next boat position is ahead of the mooring
    if (moorings[i] < boatPos) {
      dis = boatPos - moorings[i];
      //if out boat position is beyond the wharf make
      //sure we take in to account half boat overage
      if (boatPos > wharfLength) {
        dis = dis + boatHalfWidth;
      }
      boatPos = boatPos + boatWidth;
    } else if (boatPos <= moorings[i]) {
      //take into account the overage beyond the wharf
      if (moorings[i] + boatHalfWidth > wharfLength) {
        dis = moorings[i] + boatHalfWidth - wharfLength;
      }
      boatPos = moorings[i] + boatWidth;
    }

    if (dis > maxLength) {
      maxLength = dis;
    }
  }

  return maxLength;
};


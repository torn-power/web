export const mergeEqual = (arr) => {
  var map = {},
    dest = [];
  for (var i = 0; i < arr.length; i++) {
    var ai = arr[i];
    if (!map[ai.receiverAddress]) {
      dest.push({ ...ai });
      map[ai.receiverAddress] = ai;
    } else {
      for (var j = 0; j < dest.length; j++) {
        var dj = dest[j];
        if (dj.receiverAddress === ai.receiverAddress) {
          dj.resourceValue = (parseFloat(dj.resourceValue) + parseFloat(ai.resourceValue)).toString();
          dj.frozenBalance = (parseFloat(dj.frozenBalance) + parseFloat(ai.frozenBalance)).toString();
          // dj.expireTime = 
          break;
        }
      }
    }
  }

  return dest
};

function sumLength (a, b) {
  var length = 0;
  for (var j = 0; j < a.length; j++) {
    length += (a[j]*b[j]);
  }
  return length;
}

function getMessage(a, b) {
  var sum = 0;

  switch(typeof(a)) {
    case 'boolean':
      if (a) {
        return('Я попал в ' + b);
      }
      else {
        return('Я никуда не попал');
      }
      break;
    case 'number':
      return('Я прыгнул на ' + a*100 + ' сантиметров');
      break;
    case 'object':
      if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length > b.length) {
          return ('Я прошёл ' + sumLength(b, a) + ' метров');
        } else {
          return ('Я прошёл ' + sumLength(a, b) + ' метров');
        }
      }
      else if (Array.isArray(a)) {
        for (var i = 0; i < a.length; i++) {
          sum += a[i];
        }
        return('Я прошёл ' + sum + ' шагов');
      }
      break;
  }
}

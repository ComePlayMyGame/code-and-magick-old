var a;
var b;
var sum;
var length;
var summaryLenght

function sumLenght (a1, b1) {
  for (i = 0; i < a1.lenght; i++) {
    summaryLenght += a1[i]*b1[i];
  }
  return summaryLenght;
}

function getMessage(a, b) {
  a = prompt('Введите значение переменной a', a);
  b = prompt('Введите значение переменной b', b);

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
    case 'array':
      if (typeof(b) == 'array') {
        if (a.lenght > b.lenght) {
          return sumLenght (b, a);
        } else if (a.lenght <= b.lenght) {
          return sumLenght (a, b);
        }
      }
      else {
        for (i = 0; i < a.lenght; i++) {
          sum += a[i];
        }
        return(sum);
      }
      break;
}

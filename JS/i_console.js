var result = [];
var a = 3;
var total = 0;
function foo(a) {
  console.log(a)
  var i = 0;
  for (; i < 3; i++) {
    result[i] = function () {
      total += i*a
      console.log(i, total);
    }
  }
}

foo(1);
result[0]();
result[1]();
result[2]();

// 1
// for (let i = 0; i < 3; i++) {

// 2
// result[i] = ((j) => {
//   return function () {
//     total += j*a
//     console.log(j, total);
//   }
// })(i)

// 3
// for (; i < 3; i++) {
//   let j = i
//   result[i] = function () {
//     total += j*a
//     console.log(i, total);
//   }
// }

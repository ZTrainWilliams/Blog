// 获取两个数组的交集，id作为唯一比对值
const list1 = [
  {id: 1, name: '1'},
  {id: 2, name: '2'},
  {id: 3, name: '3'},
  {id: 4, name: '4'}
]
const list2 = [
  {id: 6, name: '6'},
  {id: 2, name: '2'},
  {id: 3, name: '3'},
  {id: 2, name: '21'}
]

// function compare(arr1, arr2) {
//   let result = new Map();
//   arr1.forEach((item) => {
//     let cur = arr2.find(v => {return v.id === item.id})
//     if(cur){
//       result.set(cur.id, cur)
//     }
//   })
//   return [...result.values()];
// }

function compare(arr1, arr2) {
  let result = new Map();
  let map2 = new Map();
  // 可包装id以后面进入最优
  arr2.forEach((item) => {
    map2.set(item.id, item)
  })
  arr1.forEach((item) => {
    if(map2.has(item.id)){
      result.set(item.id, map2.get(item.id))
    }
  })
  return [...result.values()];
}

console.log(compare(list1, list2))
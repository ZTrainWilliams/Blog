// 基数排序（Radix Sort）
// 基数排序是按照低位先排序，然后收集；再按照高位排序，然后再收集；依次类推，直到最高位。有时候有些属性是有优先级顺序的，先按低优先级排序，再按高优先级排序。
// 最后的次序就是高优先级高的在前，高优先级相同的低优先级高的在前。
// 时间复杂度将是O(d*2n) ,空间复杂度为O(n+k)

// 算法描述：
// 1、取得数组中的最大数，并取得位数；
// 2、arr为原始数组，从最低位开始取每个位组成radix数组；
// 3、对radix进行计数排序（利用计数排序适用于小范围数的特点）；

function radixSort(arr, maxDigit) {
  let len = arr.length;
  if (len === 0) return arr;

  let counter = [];
  let mod = 10;
  let dev = 1;

  for (let i = 0; i < maxDigit; i++, dev *= 10, mod *= 10) {
    for (let j = 0; j < arr.length; j++) {
      let bucket = parseInt((arr[j] % mod) / dev);
      if (counter[bucket] === null) {
        counter[bucket] = [];
      }
      counter[bucket]?.push(arr[j]);
    }

    let pos = 0;
    for (let j = 0; j < counter.length; j++) {
      let value = null;
      if (counter[j] !== null) {
        while ((value = counter[j].shift()) != null) {
          arr[pos++] = value;
        }
      }
    }
  }

  return arr;
}

// 希尔排序（Shell Sort）
// 1959年Shell发明，第一个突破O(n2)的排序算法，是简单插入排序的改进版。它与插入排序的不同之处在于，它会优先比较距离较远的元素。
// 希尔排序又叫缩小增量排序。
// 属于比较类排序-插入排序；时间复杂度O(n^1.3),空间复杂度O(1),稳定性-不稳定。

// 先将整个待排序的记录序列分割成为若干子序列分别进行直接插入排序，算法描述：
// 1、选择一个增量序列t1，t2，…，tk，其中ti>tj，tk=1；
// 2、按增量序列个数k，对序列进行k 趟排序；
// 3、每趟排序，根据对应的增量ti，将待排序列分割成若干长度为m 的子序列，分别对各子表进行直接插入排序。仅增量因子为1 时，整个序列作为一个表来处理，表长度即为整个序列的长度。

function shellSort(arr) {
  let len = arr.length;
  for (let gap = Math.floor(len / 2); gap > 0; gap = Math.floor(gap / 2)) {
    // 分块，直至间隔变为1
    for (let i = gap; i < len; i++) {
      let j = i;
      let current = arr[i];
      while (j - gap >= 0 && arr[j - gap] > current) { // 插入判断替换
        arr[j] = arr[j - gap];
        j = j - gap;
      }
      arr[j] = current;
    }
  }
  return arr;
}

console.log(shellSort([2, 8, 6, 5, 4, 7, 9, 10, 1, 3]));

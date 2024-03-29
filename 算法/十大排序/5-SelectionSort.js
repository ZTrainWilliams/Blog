// 选择排序(Selection-sort)
// 是一种简单直观的排序算法。它的工作原理：首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置，然后
// 再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。以此类推，直到所有元素均排序完毕。
// 属于比较类排序-选择排序；时间复杂度O(n^2),空间复杂度O(1),稳定性-不稳定。

// 描述:
// 初始状态：无序区为R[1..n]，有序区为空；
// 第i趟排序(i=1,2,3…n-1)开始时，当前有序区和无序区分别为R[1..i-1]和R(i..n）。该趟排序从当前无序区中-选出关键字最小的记录 R[k]，
// 将它与无序区的第1个记录R交换，使R[1..i]和R[i+1..n)分别变为记录个数增加1个的新有序区和记录个数减少1个的新无序区；
// n-1趟结束，数组有序化了。

function selectionSort(arr) {
  let len = arr.length;
  let min, temp;
  for (let i = 0; i < len - 1; i++) {
    min = i;
    for (let j = i + 1; j < len; j++) {
      if (arr[min] > arr[j]) {
        min = j;
      }
    }
    temp = arr[i];
    arr[i] = arr[min];
    arr[min] = temp;
  }
  return arr;
}

console.log(selectionSort([2, 8, 6, 5, 4, 7, 9, 10, 1, 3]));

// 堆排序（Heap Sort）
// 堆排序是指利用堆这种数据结构所设计的一种排序算法。
// 堆积是一个近似完全二叉树的结构，并同时满足堆积的性质：即子结点的键值或索引总是小于（或者大于）它的父节点。
// 属于比较类排序-选择排序；时间复杂度O(nlog2n),空间复杂度O(1),稳定性-不稳定。

// 算法描述：
// 1、将初始待排序关键字序列(R1,R2….Rn)构建成大顶堆，此堆为初始的无序区；
// 2、将堆顶元素R[1]与最后一个元素R[n]交换，此时得到新的无序区(R1,R2,……Rn-1)和新的有序区(Rn),且满足R[1,2…n-1]<=R[n]；
// 3、由于交换后新的堆顶R[1]可能违反堆的性质，因此需要对当前无序区(R1,R2,……Rn-1)调整为新堆，然后再次将R[1]与无序区最后一个元素交换，得到新的无序区(R1,R2….Rn-2)和新的有序区(Rn-1,Rn)。
//    不断重复此过程直到有序区的元素个数为n-1，则整个排序过程完成。

let len;
function buildMaxHeap(arr) {
  // 建立最大堆顶
  len = arr.length;
  for (let i = Math.floor(len / 2) - 1; i >= 0; i--) { // i 为结点数,0为顶点
    heapify(arr, i);
  }
}

function heapify(arr, i) {
  let left = 2 * i + 1; // 右子树
  let right = 2 * i + 2; // 左子树
  let largest = i;

  if (left < len && arr[left] > arr[largest]) {
    largest = left;
  }

  if (right < len && arr[right] > arr[largest]) {
    largest = right;
  }

  if (largest != i) {
    swap(arr, i, largest);
    heapify(arr, largest);
  }
}

function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function heapSort(arr) {
  buildMaxHeap(arr); // 确认最大堆顶

  for (let i = len - 1; i > 0; i--) {
    swap(arr, 0, i); // 确定最大值
    len--; // 冻结已排序、缩减未排序
    heapify(arr, 0); // 堆顶再确认
  }
  return arr;
}

console.log(heapSort([2, 8, 6, 5, 4, 7, 9, 10, 1, 3]));

// console.log(heapSort([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));


// 根据数组转成二叉树object
var Array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var Tree = createTree(Array);
console.log(Tree);
// 构造一个节点
function Node(nodeData, leftData, rightData) {
  this.nodeData = nodeData;
  this.leftData = leftData;
  this.rightData = rightData;
}

function createTree(arr) {
  if (arr.length === 0) {
    return null
  } else {
    // 先取中间值
    let mid = parseInt(arr.length/2)
    // 确认当前节点
    let node = new Node(arr[mid], null, null);
    // 获取中间值左边数组
    let leftArray = arr.slice(0, mid - 1);
    // 获取中间值右边数组
    let rightArray = arr.slice(mid + 1, arr.length)
    // 左右值递归确认
    node.leftData = createTree(leftArray)
    node.rightData = createTree(rightArray)
    return node
  }
}

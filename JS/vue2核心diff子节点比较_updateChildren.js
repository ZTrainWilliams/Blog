// vue2核心diff子节点比较算法函数 updateChildren
function updateChildren(
  parentElm, // 父级节点
  oldCh, // 旧子节点
  newCh, // 新子节点
  insertedVnodeQueue,
  removeOnly
) {
  let oldStartIdx = 0; // 旧头索引
  let newStartIdx = 0; // 新头索引
  let oldEndIdx = oldCh.length - 1; // 旧尾索引
  let newEndIdx = newCh.length - 1; // 新尾索引
  let oldStartVnode = oldCh[0]; // oldVnode的第一个child
  let oldEndVnode = oldCh[oldEndIdx]; // oldVnode的最后一个child
  let newStartVnode = newCh[0]; // newVnode的第一个child
  let newEndVnode = newCh[newEndIdx]; // newVnode的最后一个child
  let oldKeyToIdx, idxInOld, vnodeToMove, refElm;

  // removeOnly is a special flag used only by <transition-group>
  // to ensure removed elements stay in correct relative positions
  // during leaving transitions

  // removeOnly是一个特殊标志，仅由<transition group>
  // 确保拆下的元件保持在正确的相对位置
  // 在离职过渡期间
  const canMove = !removeOnly;

  // 如果oldStartVnode和oldEndVnode重合，并且新的也都重合了，证明diff完了，循环结束
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    // 如果oldVnode的第一个child不存在
    if (isUndef(oldStartVnode)) {
      // oldStart索引右移
      oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left

      // 如果oldVnode的最后一个child不存在
    } else if (isUndef(oldEndVnode)) {
      // oldEnd索引左移
      oldEndVnode = oldCh[--oldEndIdx];

      // oldStartVnode和newStartVnode是同一个节点；旧头对新头
    } else if (sameVnode(oldStartVnode, newStartVnode)) {
      // patch oldStartVnode和newStartVnode， 索引左移，继续循环
      patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
      oldStartVnode = oldCh[++oldStartIdx];
      newStartVnode = newCh[++newStartIdx];

      // oldEndVnode和newEndVnode是同一个节点；旧尾対新尾
    } else if (sameVnode(oldEndVnode, newEndVnode)) {
      // patch oldEndVnode和newEndVnode，索引右移，继续循环
      patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
      oldEndVnode = oldCh[--oldEndIdx];
      newEndVnode = newCh[--newEndIdx];

      // oldStartVnode和newEndVnode是同一个节点；旧头对新尾
    } else if (sameVnode(oldStartVnode, newEndVnode)) {
      // Vnode moved right
      // patch oldStartVnode和newEndVnode
      patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
      // 如果removeOnly是false，则将oldStartVnode.eml移动到oldEndVnode.elm之后
      canMove &&
        nodeOps.insertBefore(
          parentElm,
          oldStartVnode.elm,
          nodeOps.nextSibling(oldEndVnode.elm)
        );
      // oldStart索引右移，newEnd索引左移
      oldStartVnode = oldCh[++oldStartIdx];
      newEndVnode = newCh[--newEndIdx];

      // 如果oldEndVnode和newStartVnode是同一个节点；旧尾对新头
    } else if (sameVnode(oldEndVnode, newStartVnode)) {
      // Vnode moved left
      // patch oldEndVnode和newStartVnode
      patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
      // 如果removeOnly是false，则将oldEndVnode.elm移动到oldStartVnode.elm之前
      canMove &&
        nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
      // oldEnd索引左移，newStart索引右移
      oldEndVnode = oldCh[--oldEndIdx];
      newStartVnode = newCh[++newStartIdx];

      // 如果都不匹配
    } else {
      if (isUndef(oldKeyToIdx))
        oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);

      // 尝试在oldChildren中寻找和newStartVnode的具有相同的key的Vnode
      idxInOld = isDef(newStartVnode.key)
        ? oldKeyToIdx[newStartVnode.key]
        : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);

      // 如果未找到，说明newStartVnode是一个新的节点
      if (isUndef(idxInOld)) {
        // New element
        // 创建一个新Vnode
        createElm(
          newStartVnode,
          insertedVnodeQueue,
          parentElm,
          oldStartVnode.elm
        );

        // 如果找到了和newStartVnodej具有相同的key的Vnode，叫vnodeToMove
      } else {
        vnodeToMove = oldCh[idxInOld];
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== "production" && !vnodeToMove) {
          warn(
            "It seems there are duplicate keys that is causing an update error. " +
              "Make sure each v-for item has a unique key."
          );
        }

        // 比较两个具有相同的key的新节点是否是同一个节点
        // 不设key，newCh和oldCh只会进行头尾两端的相互比较，设key后，
        // 除了头尾两端的比较外，还会从用key生成的对象oldKeyToIdx中查找匹配的节点，所以为节点设置key可以更高效的利用dom。
        if (sameVnode(vnodeToMove, newStartVnode)) {
          // patch vnodeToMove和newStartVnode
          patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue);
          // 清除
          oldCh[idxInOld] = undefined;
          // 如果removeOnly是false，则将找到的和newStartVnodej具有相同的key的Vnode，叫vnodeToMove.elm
          // 移动到oldStartVnode.elm之前
          canMove &&
            nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);

          // 如果key相同，但是节点不相同，则创建一个新的节点
        } else {
          // same key but different element. treat as new element
          createElm(
            newStartVnode,
            insertedVnodeQueue,
            parentElm,
            oldStartVnode.elm
          );
        }
      }

      // 右移
      newStartVnode = newCh[++newStartIdx];
    }
  }
}

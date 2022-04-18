_updateChildren: function(nextNestedChildrenElements, transaction, context) {
    var prevChildren = this._renderedChildren;
    var nextChildren = this._reconcilerUpdateChildren(
      prevChildren, nextNestedChildrenElements, transaction, context
    );
    if (!nextChildren && !prevChildren) {
      return;
    }
    var name;
    var lastIndex = 0;
    var nextIndex = 0;
    for (name in nextChildren) {
      if (!nextChildren.hasOwnProperty(name)) {
        continue;
      }
      var prevChild = prevChildren && prevChildren[name];
      var nextChild = nextChildren[name];
      if (prevChild === nextChild) {
        // 移动节点
        this.moveChild(prevChild, nextIndex, lastIndex);
        lastIndex = Math.max(prevChild._mountIndex, lastIndex);
        prevChild._mountIndex = nextIndex;
      } else {
        if (prevChild) {
          lastIndex = Math.max(prevChild._mountIndex, lastIndex);
          // 删除节点
          this._unmountChild(prevChild);
        }
        // 初始化并创建节点
        this._mountChildAtIndex(
          nextChild, nextIndex, transaction, context
        );
      }
      nextIndex++;
    }
    for (name in prevChildren) {
      if (prevChildren.hasOwnProperty(name) &&
          !(nextChildren && nextChildren.hasOwnProperty(name))) {
        this._unmountChild(prevChildren[name]);
      }
    }
    this._renderedChildren = nextChildren;
  },
  // 移动节点
  moveChild: function(child, toIndex, lastIndex) {
    if (child._mountIndex < lastIndex) {
      this.prepareToManageChildren();
      enqueueMove(this, child._mountIndex, toIndex);
    }
  },
  // 创建节点
  createChild: function(child, mountImage) {
    this.prepareToManageChildren();
    enqueueInsertMarkup(this, mountImage, child._mountIndex);
  },
  // 删除节点
  removeChild: function(child) {
    this.prepareToManageChildren();
    enqueueRemove(this, child._mountIndex);
  },
  
  _unmountChild: function(child) {
    this.removeChild(child);
    child._mountIndex = null;
  },
  
  _mountChildAtIndex: function(
    child,
    index,
    transaction,
    context) {
    var mountImage = ReactReconciler.mountComponent(
      child,
      transaction,
      this,
      this._nativeContainerInfo,
      context
    );
    child._mountIndex = index;
    this.createChild(child, mountImage);
  }
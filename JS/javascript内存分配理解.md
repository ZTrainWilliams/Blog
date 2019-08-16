堆(heap)，栈(stack)与队列(queue)

## 栈(stack)
    1. 先进后出，后进先出
    2. 用于存储javascript基本数据类型（Null,Undifined,Number,String,Boolean,Symbol）

## 堆(heap)
    1. 堆数据结构是一种树状结构。犹如书架一样，key-value形式，关注key。
    2. 存储javascript的引用类型，大小是不固定的
    3. 访问形式，引用类型的值都是按引用访问的（地址指针）

## 队列(queue)
    1. 先进先出

### JavaScript的内存生命周期
    1. 分配需要的内存空间
    2. 使用分配到的内存空间（读、写）
    3. 不需要时释放、归还内存空间

    ## javaScript有自动垃圾收集机制，常用标记清除。（IE）使用引用计数

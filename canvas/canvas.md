# canvas
canvas即画布，MDN解释：
<canvas> 是 HTML5 新增的元素，可用于通过使用 JavaScript 中的脚本来绘制图形。例如，它可以用于绘制图形、制作照片、创建动画，甚至可以进行实时视频处理或渲染。

## 渲染上下文（The rendering context）
<canvas> 元素创造了一个固定大小的画布，它公开了一个或多个渲染上下文，其可以用来绘制和处理要展示的内容。
getContext用来获得渲染上下文和它的绘画功能。
``` javascript
var canvas = document.getElementById('tutorial');
var ctx = canvas.getContext('2d');
```

### 绘制矩形
canvas提供了三种方法绘制矩形：

fillRect(x, y, width, height)
绘制一个填充的矩形
strokeRect(x, y, width, height)
绘制一个矩形的边框
clearRect(x, y, width, height)
清除指定矩形区域，让清除部分完全透明。

### 绘制路径
beginPath()
新建一条路径，生成之后，图形绘制命令被指向到路径上生成路径。
closePath()
闭合路径之后图形绘制命令又重新指向到上下文中。
stroke()
通过线条来绘制图形轮廓。
fill()
通过填充路径的内容区域生成实心的图形。

moveTo(x, y)
将笔触移动到指定的坐标x以及y上。
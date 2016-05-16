# Load

## Usage

Load 接收以下 `props` 属性：

```bash
status          # [Number]   状态：0 隐藏，1 加载中，2 失败
z-index         # [Number]   CSS z-index 属性，默认 8888
method          # [Function] 回调函数：重新加载，默认刷新页面
```

由于 Load 的通用性较强，所以内部不会修改 `status` 属性，而是完全依靠外部去控制。  

在展现时，Load 会阻止 `touchmove` 事件的默认行为和传播。

[查看 Load 与 Lazy 如何配合使用](https://github.com/banricho/Element/issues/2)

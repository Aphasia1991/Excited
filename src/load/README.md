# Load

## Usage

Lazy 接收以下 props 属性：

```bash
status          # [Number]   状态：0 隐藏，1 加载中，2 失败
method          # [Function] 回调函数：重新加载，默认刷新页面
```

由于 Lazy 的通用性较强，所以内部不会修改 `status` 属性，而是完全依靠外部去控制。  

Lazy 的 `z-index` 值为 `8888`。在展现时，Lazy 会阻止 `touchmove` 事件的默认行为和传播。

[查看 Load 与 Lazy 如何配合使用](https://github.com/banricho/Element/issues/2)

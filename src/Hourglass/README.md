# Hourglass

> 倒计时组件

## Usage

Hourglass 接收以下 `props` 属性：

```bash
countdown       # [Number]   起始秒数
method          # [Function] 回调函数
```

Hourglass 不会直接修改 `countdown` 的值，而是在内部使用镜像的私有变量进行计算。  

在任何时候，你都可以修改 `countdown` 的值，Hourglass 将响应变化。如果目标值为 `0`，则会立即触发 `method`。

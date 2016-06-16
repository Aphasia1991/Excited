# Hourglass

> 倒计时组件

## Usage

Hourglass 接收以下 `props` 属性：

```bash
countdown       # [Number]   起始秒数
start           # [Number]   起始位置，默认 1
end             # [Number]   中止位置，默认 3
fill            # [Boolean]  是否补零，默认 true
method          # [Function] 回调函数
```

计时器位置从 `0` 到 `3`，分别对应『天』、『小时』、『分钟』和『秒』，如设置 `0, 1`，将会显示『x 天 x 小时』。

## Tips

Hourglass 不会直接修改 `countdown` 的值，而是在内部使用镜像的私有变量进行计算。  

在任何时候，你都可以修改 `countdown` 的值，Hourglass 将响应变化。如果目标值为 `0`，则会立即触发 `method`。

在初始化时，建议将 `countdown` 设置为 `undefined`。

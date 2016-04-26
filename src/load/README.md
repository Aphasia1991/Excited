# Load

## Usage

props

```JS
props: {
  status: {
    type: Number,
    default: 0 // 0 不显示，1 加载中，2 失败
  },
  method: {
    type: Function,
    default () {
      window.location.reload(true);
    }
  }
}
```

> Load 本身不会直接修改 `status` 的状态。

[查看 Load 与 Lazy 如何配合使用](https://github.com/banricho/Element/issues/2)

# Load

## Usage

props

```JS
props: {
  status: {
    type: Number,
    default: 0 // 0 不显示，1 加载中，2 失败
  },
  reload: {
    type: Function,
    default () {
      window.location.reload(true);
    }
  }
}
```

Load 本身不会直接修改 `status` 的状态，需要自行在 `reload` 函数中控制。

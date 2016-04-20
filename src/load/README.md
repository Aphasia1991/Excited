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

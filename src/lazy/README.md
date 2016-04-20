# Lazy

## Usage

props

```JS
props: {
  status: {
    type: Number,
    default: 3 // 3 空闲，4 加载中，5 失败
  },
  load: {
    type: Function
  }
}
```
Lazy 能够很好的和 Load 配合使用，两者共用一个父组件的 `status`。整个流程看起来就像这样：  

初始时 0  
首屏加载中 1  
失败 2 / 成功 3  
分段加载中 4  
成功 3 / 失败 5  
最终完成 6

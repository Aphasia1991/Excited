# Lazy

## Intro

Lazy 包含以下功能：

- 触底加载
- 处理异常
- 智能锁定请求

## Usage

Lazy 接收以下 `props` 属性：

```bash
offset          # [Number]   当前页码
limit           # [Number]   查询数，默认 10
bottom          # [Number]   触发时距底边高度，默认 200
method          # [Function] 回调函数：加载更多
```

`method` 中的回调函数必须返回一个 `Promise`，你**无需**使用 `catch` 处理异常。

Lazy 默认对 `window` 对象绑定 `scroll` 事件，但你也可以给目标元素添加 `lazy-flag` 属性，来指定这一行为：

```HTML
<!-- 为 #wrap 元素绑定滚动事件 -->

<div id="wrap" lazy-flag>
  <ul>
    <li></li>
  </ul>
  <lazy></lazy>
</div>
```

## Example

```JS
const $fetch = url => fetch(url)
  .then(res => {
    const json = res.json();
    if (res.status >= 200 && res.status < 300) return json;
    return json.then(Promise.reject.bind(Promise));
  });

new Vue({
  el: 'body',

  components: {
    'lazy': require('../src/Lazy/lazy.vue')
  },

  data: () => ({
    limit: 10,
    store: []
  }),

  computed: {
    offset() {
      return this.store.length;
    }
  },

  methods: {
    getData() {
      return $fetch('./data.json')
        .then(json => {
          this.store = this.store.concat(json);
        });
    }
  }
});
```

```HTML
<lazy :method="getData" :offset="offset" :limit="limit" :bottom="100"></lazy>
```

## Tips

使用 Lazy 后，你所要做的就只是将数据写入 VM 中。其它繁琐的事情，Lazy 都会帮你完成。  

由于首次加载一般会有更多的逻辑，所以 Lazy 会等待它完成后才绑定事件。你可以对例子中的 `getData()` 进一步包装，并在首次主动执行它。

[查看 Lazy 与 Load 如何配合使用](https://github.com/banricho/Element/issues/2)

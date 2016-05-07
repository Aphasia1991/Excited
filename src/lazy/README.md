# Lazy

## Intro

Lazy 包含以下功能：

- 触底加载
- 处理异常
- 智能锁定请求

## Usage

Lazy 接收以下 props 属性：

```bash
offset          # [Number]   当前页码
limit           # [Number]   查询数，默认 0
bottom          # [Number]   触发时距底边高度，默认 100
method          # [Function] 回调函数：加载更多
```

`method` 中的回调函数必须返回一个 `Promise`，你**无需**使用 `catch` 处理异常。

## Example

```JS
const resPurify = (res) => {
  const json = res.json();
  if (res.status >= 200 && res.status < 300) return json;
  return json.then(Promise.reject.bind(Promise));
};

new Vue({
  el: 'body',

  components: {
    'lazy': require('../src/Lazy/lazy.vue')
  },

  data: () => ({
    limit: 0,
    store: []
  }),

  computed: {
    offset() {
      return this.store.length;
    }
  },

  methods: {
    getData() {
      return fetch('./data.json')
        .then(res => resPurify(res))
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

使用 Lazy 后，你所要做的就只是将数据写入 VM 中。其它繁琐的事情，Lazy 都会帮你完成。

[查看 Lazy 与 Load 如何配合使用](https://github.com/banricho/Element/issues/2)

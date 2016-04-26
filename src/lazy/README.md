# Lazy

## Usage

props

```JS
props: {
  // 回调函数 [必须返回 Promise]
  method: {
    type: Function
  },

  // 起始值
  offset: {
    type: Number,
    default: 0
  },

  // 查询数
  limit: {
    type: Number,
    default: 10
  }
}
```

`method` 必须传入一个返回 `Promise` 的函数，你无需自己处理异常。

简单的例子：

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
    offset: 0,
    limit: 0,
    store: []
  }),

  methods: {
    getData() {
      return fetch('./data.json')
        .then(res => resPurify(res))
        .then(json => {
          this.store = this.store.concat(json);
          this.offset += json.length;
        });
    }
  }
});
```
```HTML
<lazy :method="getData" :offset="offset" :limit="limit"></lazy>
```

你需要做的只是：

1. 将获取成功的数据写入 VM 中
2. 正确的改写 `offset`

> 回调函数只会在出现滚动条，且距离底部 100px  以下时才会触发。Lazy 在首次加载时不会启动。

[查看 Lazy 与 Load 如何配合使用](https://github.com/banricho/Element/issues/2)

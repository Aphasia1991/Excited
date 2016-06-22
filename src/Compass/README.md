# Compass

## Intro

Compass 是饿了么业务中常用的定位组件，该组件较为特殊，它依赖：

- fetch API
- Hybrid API
- geohash.js

## Usage

Compass 接收以下 `props` 属性：

```bash
timeout       # [Number]   超时设置（默认 5000 毫秒）
apihost       # [String]   restAPI 前缀
display       # [Boolean]  是否显示界面，关闭时不再请求地址名
tips          # [Object]   loading / failed / fallback 提示文案
reslove       # [Function] 成功获取 geohash 时执行，并代入参数 geohash
reject        # [Function] 超出 timeout 设置的时间依旧未执行
```

Compass 使用了自定义事件，在内部提供了初始化的 `initCompass` 方法。它接收一个参数 `geohash`，当代入 `geohash` 时初始化，将直接用此 `geohash` 请求地址名并执行 `reslove` 方法。当没有代入 `geohash` 时，将使用内部的逻辑获取 `geohash`。

## tips

取地址规则：

1. timeout 时间内循环向 Hybrid API 获取地址，一旦取得立即中止并执行 reslove
2. 首次获取失败以后，同时向浏览器和 restAPI 请求地址
3. timeout 时间到时，按照 Hybrid API > Navigator > restAPI 优先级展示地址

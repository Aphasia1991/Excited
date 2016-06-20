# Compass

## Intro

Compass 是饿了么业务中常用的定位组件，该组件较为特殊，它依赖：

- fetch API
- Hybrid API
- geohash.js
- uparams.js

## Usage

Compass 接收以下 `props` 属性：

```bash
timeout       # [Number]   超时设置
apihost       # [String]   restAPI 前缀
redirect      # [String]   当无地址传参、非 App UA、非 debug 模式时，跳转至此地址
method        # [Function] 成功获取 geohash 时执行，并代入参数 geohash
```

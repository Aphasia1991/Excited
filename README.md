# Element

面向业务的移动端组件。  

支持 Vue 2 的版本：https://github.com/banricho/Horizon

## Intro

- 基于 Vue 1.x 开发，使用 webpack 遵循 UMD 规范打包
- 单项数据流，仅允许 `props` 传参，禁止通过自定义事件通信
- 允许传入 callback 修改父组件数据，但不允许使用双向绑定直接修改
- 目标为最低级零件，避免依赖其它组件
- 项目内为不稳定版本，稳定后将转移至 eleme/component

## Usage

`src/{{Project}}/README.md`

## Contribution

```bash
fork + clone
npm run dev
npm run build
```

目录名即为模块名，也是打包后全局变量的名称。

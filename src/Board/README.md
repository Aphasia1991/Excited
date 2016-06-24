# Board

## Intro

并没有什么卵用的东西，配合 Crayfish 可以给运营写废话~

## Usage

Board 接收以下 `props` 属性：

```bash
title       # [String]         标题
content     # [String / Array] 内容
```

内容为 Array 时将以列表展现，否则为紧跟标题后的文字。需要配合 `v-for` 来循环组件。

## Example

```HTML
<board
  v-for="board in boards"
  :title="board.title"
  :content="board.content"></board>
```

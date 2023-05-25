# 加载 Loading ^[Since v1.1.0](!s)

通常用于反馈一些全局的加载状态，如页面路由切换、全局请求等。

## 代码示例

:::demo loading/basis

### 基础用法

最简单的用法，传入一个 `0` ~ `100` 的数字可以刷新当前的进度，直到传入 `100` 则认为本次加载完成。

:::

:::demo loading/height

### 进度条纵宽

设置 `strokeWidth` 选项可以改变进度条的纵宽，一轮加载中需要保持该参数一致。

:::

:::demo loading/max

### 中间值

通过 `maxPercent` 选项可以设置本次调用的最大进度，达到最大后进度条会处于暂停状态等待下一次的调用。

:::

:::demo loading/state

### 加载状态

设置 `state` 选项可以改变进度条的状态。

同时，这个例子展示了如何在组合式 Api 中使用 Loading 组件。

:::

## API

### Loading 选项

| 名称        | 类型                                             | 说明                                                                                             | 默认值      | 始于 |
| ----------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ----------- | ---- |
| percent     | `number`                                         | 设置进度条的当前进度，取值范围为 `0` ~ `100`                                                     | `0`         | -    |
| strokeWidth | `number`                                         | 设置进度条的纵宽（高度）`px`，在一轮的加载中需要每次调用 `open` 方法时都传入一样的值保持纵宽一致 | `2`         | -    |
| state       | `'default' \| 'success' \| 'error' \| 'warning'` | 设置进度条的状态                                                                                 | `'default'` | -    |
| position    | `'top' \| 'bottom'`                              | 设置进度条的位置                                                                                 | `'top'`     | -    |
| maxPercent  | `number`                                         | 设置进度条本次加载的中间值，进度到达该值后会等待下一次调用                                       | `95`        | -    |
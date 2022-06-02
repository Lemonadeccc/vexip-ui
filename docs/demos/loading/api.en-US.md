### Loading Options

| Name        | Type   | Description                                                                                         | Default    | Since |
| ----------- | ------ | -------------------------------------------------------------------------------------------- | --------- | --- |
| percent     | `number` | 设置进度条的当前进度，取值范围为 `0` ~ `100`                                                     | `0`         | - |
| strokeWidth | `number` | 设置进度条的纵宽（高度）`px`，在一轮的加载中需要每次调用 `open` 方法时都传入一样的值保持纵宽一致 | `2`         | - |
| state       | `'default' \| 'success' \| 'error' \| 'warning'` | 设置进度条的状态                         | `'default'` | - |
| position    | `'top' \| 'bottom'` | 设置进度条的位置                                                | `'top'`     | - |
| maxPercent  | `number` | 设置进度条本次加载的中间值，进度到达该值后会等待下一次调用                                   | `95`        | - |
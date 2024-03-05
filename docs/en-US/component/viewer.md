# Viewer

It can be used to easily view some things, such as pictures, etc.

## Demos

:::demo viewer/basis

### Basis Usage

Simplest usage.

:::

:::demo viewer/modal

### With Modal

Sometimes will be used with modal.

:::

:::demo viewer/switch

### Switch Content

This example demonstrates how to toggle the content of the viewer.

:::

:::demo viewer/toolbar

### Toolbar Placement

Toolbars can be placed in an appropriate position via the `toolbar-placement` prop.

:::

:::demo viewer/center-scale

### Center Scale

Add the `center-scale` prop so that scaling is always centered on the content.

:::

:::demo viewer/static

### No Transition

Sometimes you may want the change to be more immediate, so you can disable the transition effect.

:::

:::demo viewer/actions

### Custom Actions

Custom actions can be add via the `actions` prop.

The layout of action buttons cn be modified via the `action-layout` prop.

:::

## API

### Preset Types

```ts
type ViewerToolbarPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end'
type ViewerPresetAction =
  | 'rotate-right'
  | 'rotate-left'
  | 'flip-x'
  | 'flip-y'
  | 'zoom-in'
  | 'zoom-out'
  | 'full-screen'
  | 'reset'
type ViewerActionName = ViewerPresetAction | (string & {})
type ViewerActionLayout = ViewerActionName[][]

interface ViewerState {
  x: number,
  y: number,
  zoom: number,
  rotate: number,
  flipX: boolean,
  flipY: boolean,
  full: boolean,
  moving: boolean,
  [custom: string]: unknown
}

interface ViewerToolbarAction {
  name: string,
  process: (state: ViewerState) => void,
  icon?: Record<string, any> | (() => any),
  iconRenderer?: (data: { state: ViewerState }) => any,
  class?: ClassType | ((state: ViewerState) => string),
  title?: string | ((state: ViewerState) => string),
  iconScale?: number | ((state: ViewerState) => number),
  iconStyle?: StyleType | ((state: ViewerState) => StyleType),
  /** @deprecated */
  divided?: boolean | ((state: ViewerState) => boolean),
  hidden?: boolean | ((state: ViewerState) => boolean),
  disabled?: boolean | ((state: ViewerState) => boolean)
}
```

### Viewer Props

| Name              | Type                     | Description                                                                                                                                    | Default    | Since   |
| ----------------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------- |
| move-disabled     | `boolean`                | Whether to disable the move function                                                                                                           | `false`    | -       |
| zoom-disabled     | `boolean`                | Whether to disable the zoom function                                                                                                           | `false`    | -       |
| zoom-delta        | `number`                 | Set the amount of change for each zoom                                                                                                         | `0.15`     | -       |
| zoom-min          | `number`                 | Minimum zoom ratio                                                                                                                             | `0.1`      | -       |
| zoom-max          | `number`                 | Maximum zoom ratio                                                                                                                             | `Infinity` | -       |
| flip-disabled     | `boolean`                | Whether to disable the mirror flip function                                                                                                    | `false`    | -       |
| rotate-disabled   | `boolean`                | Whether to disable the rotation function                                                                                                       | `false`    | -       |
| rotate-delta      | `number`                 | Set the amount of change for each rotation                                                                                                     | `90`       | -       |
| full-disabled     | `boolean`                | Whether to disable the full screen function                                                                                                    | `false`    | -       |
| toolbar-placement | `ToolbarPlacement`       | Set the position of the toolbar                                                                                                                | `'bottom'` | -       |
| actions           | `ToolbarAction[]`        | Add custom action buttons                                                                                                                      | `[]`       | -       |
| toolbar-fade      | `boolean \| number`      | Set whether the toolbar is fading, when passing in a number, you can set the delay for the fading                                              | `false`    | -       |
| locale            | `LocaleConfig['viewer']` | Set the locale config                                                                                                                          | `null`     | `2.1.0` |
| no-transition     | `boolean`                | Whether to disable transition effects                                                                                                          | `false`    | -       |
| center-scale      | `boolean`                | Whether to use the center point of the content as the center of scaling                                                                        | `false`    | `2.3.2` |
| action-layout     | `ViewerActionLayout`     | Configure the layout of the action buttons, when empty, the default layout will be used and the buttons of `actions` will be placed at the end | `[]`       | `2.3.2` |

### Viewer Events

| Name       | Description                                                                                   | Parameters                              | Since |
| ---------- | --------------------------------------------------------------------------------------------- | --------------------------------------- | ----- |
| move-start | Emitted when a move starts, returns the state of the viewer                                   | `(state: ViewerState)`                  | -     |
| move       | Emitted when moving, returns the state of the viewer                                          | `(state: ViewerState)`                  | -     |
| move-end   | Emitted when the move ends, returns the state of the viewer                                   | `(state: ViewerState)`                  | -     |
| wheel      | Emitted when scrolling, returns the direction sign and viewer state                           | `(sign: -1 \| 1, state: ViewerState)`   | -     |
| rotate     | Emitted when rotated, returns delta and viewer state                                          | `(delta: number, state: ViewerState)`   | -     |
| zoom       | Emitted when zooming, returns delta and viewer state                                          | `(delta: number, state: ViewerState)`   | -     |
| full       | Emitted when switching to full screen, returns the current full screen state and viewer state | `(active: boolean, state: ViewerState)` | -     |
| reset      | Emitted when reset, returns to the viewer state                                               | `(state: ViewerState)`                  | -     |

### Viewer Slots

| Name    | Description                                  | Parameters | Since |
| ------- | -------------------------------------------- | ---------- | ----- |
| default | The slot of content which needs to be viewed | -          | -     |

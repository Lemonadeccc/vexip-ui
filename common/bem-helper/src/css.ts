import { ensureArray, isClient, noop, toKebabCase } from '@vexip-ui/utils'

import type * as CSS from 'csstype'

export interface CSSProperties
  extends CSS.Properties<string | number>,
  CSS.PropertiesHyphen<string | number> {
  [x: `--${string}`]: string | number | undefined
}

export interface RenderOptions {
  refresh?: boolean,
  minify?: boolean
}

interface Context {
  style: HTMLStyleElement,
  sheet: CSSStyleSheet
}

type Key = string | number | symbol

type MaybeArray<T> = T | T[]

export type StyleConfig = Record<string, CSSProperties>

export type AtRuleConfig = {
  [x: `@${string}`]: MaybeArray<StyleConfig>
}

export type CSSConfig = MaybeArray<StyleConfig | AtRuleConfig>

const styleSheets = new Map<Key, Context>()

/**
 * Create a style tag and push the rendering result into it
 *
 * @param key the unique key
 * @param css the CSS config
 * @param options the extra options
 *
 * @returns a function to remove the style tag
 */
export function useCSS(key: Key, css: CSSConfig, options: RenderOptions = {}): () => void {
  if (!isClient) return noop

  let context = styleSheets.get(key)

  if (context) {
    if (options.refresh) {
      document.head.removeChild(context.style)
      context.style = document.createElement('style')
      context.style.textContent = render(css, options.minify)
      document.head.appendChild(context.style)
      context.sheet = document.styleSheets[document.styleSheets.length - 1]
    } else {
      console.warn(`[@vexip-ui/bem-helper] CSS with '${String(key)}' key has been mounted`)
    }
  } else {
    const style = document.createElement('style')

    style.textContent = render(css, options.minify)
    document.head.appendChild(style)

    context = {
      style,
      sheet: document.styleSheets[document.styleSheets.length - 1]
    }

    styleSheets.set(key, context)
  }

  return () => {
    document.head.removeChild(context!.style)
    styleSheets.delete(key)
  }
}

export function render(styles: MaybeArray<StyleConfig | AtRuleConfig>, minify = false) {
  const configs = Array.isArray(styles) ? styles : [styles]
  const space = minify ? '' : ' '
  const newLine = minify ? '' : '\n'

  let result = ''

  function createStyle(config: StyleConfig, inner = false) {
    const selectors = Object.keys(config)
    const indent = minify ? '' : '  '
    const prefix = inner ? indent : ''

    selectors.forEach(selector => {
      const properties = config[selector]
      const names = Object.keys(properties) as Array<keyof CSSProperties>

      result += `${prefix}${selector}${space}{${newLine}`
      names.forEach(name => {
        result += `${prefix}${indent}${toKebabCase(name)}:${space}${properties[name]};${newLine}`
      })

      if (minify) {
        result = result.substring(0, result.length - 1)
      }

      result += `${prefix}}${newLine}`
    })
  }

  configs.forEach(config => {
    const selectors = Object.keys(config)

    if (!selectors.length) return

    if (selectors[0].startsWith('@')) {
      ;(selectors as `@${string}`[]).forEach(selector => {
        result += `${selector}${space}{${newLine}`
        ensureArray((config as AtRuleConfig)[selector]).forEach(config => createStyle(config, true))
        result += `}${newLine}`
      })
    } else {
      createStyle(config as StyleConfig)
    }
  })

  return minify ? result : result.substring(0, result.length - 1)
}

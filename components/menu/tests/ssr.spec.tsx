/**
 * @vitest-environment node
 */

import { describe, it, expect } from 'vitest'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { Menu } from '..'
import { MenuItem } from '@/components/menu-item'
import { MenuGroup } from '@/components/menu-group'

describe('SSR for Menu', () => {
  it('render', async () => {
    try {
      await renderToString(
        createSSRApp(() => (
          <Menu>
            <MenuGroup label={'group'}>
              <MenuItem>{'1'}</MenuItem>
            </MenuGroup>
            <MenuItem>{'2'}</MenuItem>
          </Menu>
        ))
      )
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})

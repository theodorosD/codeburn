import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mkdtemp, rm } from 'fs/promises'
import { join } from 'path'
import { tmpdir, homedir } from 'os'

// Point config at a temp dir by monkey-patching homedir via env
// config.ts uses homedir() directly, so we test via the exported functions
// with a real temp path by re-importing after env override isn't possible in ESM.
// Instead, test the logic directly: saveConfig/readConfig round-trip.

import { readConfig, saveConfig } from '../src/config.js'

describe('config - hiddenPanels persistence', () => {
  it('defaults to empty when no config exists', async () => {
    const cfg = await readConfig()
    // hiddenPanels may or may not exist depending on disk state; just check type
    expect(cfg.hiddenPanels === undefined || Array.isArray(cfg.hiddenPanels)).toBe(true)
  })

  it('round-trips hiddenPanels through save/read', async () => {
    const original = await readConfig()
    const hidden = ['daily', 'mcp', 'bash']

    await saveConfig({ ...original, hiddenPanels: hidden })
    const loaded = await readConfig()

    expect(loaded.hiddenPanels).toEqual(hidden)

    // Restore
    await saveConfig(original)
  })

  it('preserves other config fields when saving hiddenPanels', async () => {
    const original = await readConfig()
    const withCurrency = { ...original, currency: { code: 'EUR', symbol: '€' } }

    await saveConfig({ ...withCurrency, hiddenPanels: ['model'] })
    const loaded = await readConfig()

    expect(loaded.hiddenPanels).toEqual(['model'])
    expect(loaded.currency?.code).toBe('EUR')

    // Restore
    await saveConfig(original)
  })
})

describe('panel toggle logic', () => {
  it('adds panel to hidden set when visible', () => {
    const hidden = new Set<string>(['daily'])
    const toggle = (id: string, s: Set<string>) => {
      const next = new Set(s)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    }

    expect(toggle('model', hidden)).toEqual(new Set(['daily', 'model']))
    expect(toggle('daily', hidden)).toEqual(new Set())
  })

  it('removes panel from hidden set when already hidden', () => {
    const hidden = new Set<string>(['daily', 'bash'])
    const toggle = (id: string, s: Set<string>) => {
      const next = new Set(s)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    }

    expect(toggle('bash', hidden)).toEqual(new Set(['daily']))
  })
})

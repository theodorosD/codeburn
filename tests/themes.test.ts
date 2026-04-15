import { describe, it, expect } from 'vitest'
import { getTheme, nextTheme, THEME_NAMES, DEFAULT_THEME } from '../src/themes.js'

describe('themes', () => {
  it('getTheme returns the correct theme by name', () => {
    for (const name of THEME_NAMES) {
      const theme = getTheme(name)
      expect(theme.name).toBe(name)
      expect(typeof theme.accent).toBe('string')
      expect(typeof theme.gradientFn).toBe('function')
    }
  })

  it('getTheme falls back to default for unknown name', () => {
    const theme = getTheme('nonexistent')
    expect(theme.name).toBe(DEFAULT_THEME)
  })

  it('nextTheme cycles through all themes', () => {
    let current = DEFAULT_THEME
    const visited = new Set<string>()
    for (let i = 0; i < THEME_NAMES.length; i++) {
      visited.add(current)
      current = nextTheme(current)
    }
    expect(visited.size).toBe(THEME_NAMES.length)
    expect(current).toBe(DEFAULT_THEME) // full cycle
  })

  it('gradientFn returns a hex color string', () => {
    for (const name of THEME_NAMES) {
      const { gradientFn } = getTheme(name)
      expect(gradientFn(0)).toMatch(/^#[0-9a-f]{6}$/)
      expect(gradientFn(0.5)).toMatch(/^#[0-9a-f]{6}$/)
      expect(gradientFn(1)).toMatch(/^#[0-9a-f]{6}$/)
    }
  })
})

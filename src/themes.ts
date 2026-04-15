export type Theme = {
  name: string
  accent: string       // primary accent (panel titles, active tab)
  gold: string         // cost/value highlight
  dim: string          // dimmed text
  border: string       // inactive borders
  panelColors: {
    overview: string
    daily: string
    project: string
    model: string
    activity: string
    tools: string
    mcp: string
    bash: string
  }
  gradientFn: (pct: number) => string
}

function toHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(v => Math.round(v).toString(16).padStart(2, '0')).join('')
}

function lerp(a: number, b: number, t: number): number {
  return a + t * (b - a)
}

function makeGradient(
  from: [number, number, number],
  mid: [number, number, number],
  to: [number, number, number],
): (pct: number) => string {
  return (pct: number) => {
    if (pct <= 0.5) {
      const t = pct / 0.5
      return toHex(lerp(from[0], mid[0], t), lerp(from[1], mid[1], t), lerp(from[2], mid[2], t))
    }
    const t = (pct - 0.5) / 0.5
    return toHex(lerp(mid[0], to[0], t), lerp(mid[1], to[1], t), lerp(mid[2], to[2], t))
  }
}

export const THEMES: Record<string, Theme> = {
  flame: {
    name: 'flame',
    accent: '#FF8C42',
    gold: '#FFD700',
    dim: '#555555',
    border: '#555555',
    panelColors: {
      overview: '#FF8C42',
      daily: '#5B9EF5',
      project: '#5BF5A0',
      model: '#E05BF5',
      activity: '#F5C85B',
      tools: '#5BF5E0',
      mcp: '#F55BE0',
      bash: '#F5A05B',
    },
    gradientFn: makeGradient([91, 158, 245], [245, 200, 91], [245, 91, 91]),
  },
  ocean: {
    name: 'ocean',
    accent: '#00B4D8',
    gold: '#90E0EF',
    dim: '#4a6274',
    border: '#4a6274',
    panelColors: {
      overview: '#00B4D8',
      daily: '#0077B6',
      project: '#48CAE4',
      model: '#ADE8F4',
      activity: '#023E8A',
      tools: '#00B4D8',
      mcp: '#0096C7',
      bash: '#48CAE4',
    },
    gradientFn: makeGradient([0, 119, 182], [0, 180, 216], [144, 224, 239]),
  },
  matrix: {
    name: 'matrix',
    accent: '#00FF41',
    gold: '#00FF41',
    dim: '#003B00',
    border: '#005200',
    panelColors: {
      overview: '#00FF41',
      daily: '#00CC33',
      project: '#00FF41',
      model: '#00CC33',
      activity: '#00FF41',
      tools: '#00CC33',
      mcp: '#00FF41',
      bash: '#00CC33',
    },
    gradientFn: makeGradient([0, 80, 0], [0, 200, 50], [0, 255, 65]),
  },
  mono: {
    name: 'mono',
    accent: '#FFFFFF',
    gold: '#CCCCCC',
    dim: '#555555',
    border: '#444444',
    panelColors: {
      overview: '#FFFFFF',
      daily: '#AAAAAA',
      project: '#CCCCCC',
      model: '#BBBBBB',
      activity: '#DDDDDD',
      tools: '#AAAAAA',
      mcp: '#999999',
      bash: '#BBBBBB',
    },
    gradientFn: makeGradient([80, 80, 80], [160, 160, 160], [220, 220, 220]),
  },
  rose: {
    name: 'rose',
    accent: '#FF6B9D',
    gold: '#FFB3C6',
    dim: '#5a3a45',
    border: '#5a3a45',
    panelColors: {
      overview: '#FF6B9D',
      daily: '#C77DFF',
      project: '#FF9EBB',
      model: '#E040FB',
      activity: '#FF6B9D',
      tools: '#C77DFF',
      mcp: '#FF9EBB',
      bash: '#E040FB',
    },
    gradientFn: makeGradient([199, 125, 255], [255, 107, 157], [255, 179, 198]),
  },
  solarized: {
    name: 'solarized',
    accent: '#268BD2',
    gold: '#B58900',
    dim: '#586E75',
    border: '#073642',
    panelColors: {
      overview: '#268BD2',
      daily: '#2AA198',
      project: '#859900',
      model: '#6C71C4',
      activity: '#CB4B16',
      tools: '#2AA198',
      mcp: '#D33682',
      bash: '#859900',
    },
    gradientFn: makeGradient([38, 139, 210], [42, 161, 152], [133, 153, 0]),
  },
  monokai: {
    name: 'monokai',
    accent: '#F92672',
    gold: '#E6DB74',
    dim: '#75715E',
    border: '#49483E',
    panelColors: {
      overview: '#F92672',
      daily: '#66D9E8',
      project: '#A6E22E',
      model: '#AE81FF',
      activity: '#FD971F',
      tools: '#66D9E8',
      mcp: '#F92672',
      bash: '#A6E22E',
    },
    gradientFn: makeGradient([102, 217, 232], [166, 226, 46], [249, 38, 114]),
  },
  'monokai-dark': {
    name: 'monokai-dark',
    accent: '#AE81FF',
    gold: '#E6DB74',
    dim: '#5C5C5C',
    border: '#3E3D32',
    panelColors: {
      overview: '#AE81FF',
      daily: '#66D9E8',
      project: '#A6E22E',
      model: '#F92672',
      activity: '#FD971F',
      tools: '#66D9E8',
      mcp: '#AE81FF',
      bash: '#A6E22E',
    },
    gradientFn: makeGradient([174, 129, 255], [102, 217, 232], [166, 226, 46]),
  },
}

export const THEME_NAMES = Object.keys(THEMES) as string[]
export const DEFAULT_THEME = 'flame'

export function getTheme(name: string): Theme {
  return THEMES[name] ?? THEMES[DEFAULT_THEME]!
}

export function nextTheme(current: string): string {
  const idx = THEME_NAMES.indexOf(current)
  return THEME_NAMES[(idx + 1) % THEME_NAMES.length]!
}

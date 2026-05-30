import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{vue,ts}',
  ],
  theme: {
    extend: {
      // Dark Japandi palette — 60/30/10 (see SPRINTS PLAN.md → Design System).
      // Consume these tokens in components; never hardcode hex.
      colors: {
        ink: '#191A18',        // 60% — page background, dominant field
        stone: {
          DEFAULT: '#262825',  // 30% — cards, panels, skeletons
          light: '#2F312D',    //       elevated surfaces
        },
        sage: {
          DEFAULT: '#8A9A82',  // 10% — links, focus rings, accents (used sparingly)
          light: '#9DAE94',    //       hover / interaction states
        },
        bone: '#E6E6E1',       // text primary
        muted: '#A6A69E',      // text secondary / captions
        line: '#34362F',       // 1px hairline dividers & borders
      },
    },
  },
} satisfies Config

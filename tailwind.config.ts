import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--bg)',
        foreground: 'var(--text)',
        muted: 'var(--muted)',
        'muted-foreground': 'var(--muted)',
        border: 'rgba(255,255,255,0.12)'
      },
    },
  },
  plugins: [],
}

export default config


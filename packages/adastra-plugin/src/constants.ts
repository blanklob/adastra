export const KNOWN_CSS_EXTENSIONS = [
  'css',
  'less',
  'sass',
  'scss',
  'styl',
  'stylus',
  'pcss',
  'postcss'
]

export const KNOWN_JSX_EXTENSIONS = ['jsx', 'tsx']

export const CSS_EXTENSIONS_REGEX = new RegExp(
  `\\.(${KNOWN_CSS_EXTENSIONS.join('|')})(\\?.+)?$`
)

export const CLIENT_SCRIPT_PATH = '@vite/client'
export const CLIENT_REACT_REFRESH_PATH = '@react-refresh'

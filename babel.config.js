const presets = [
  [
    '@babel/preset-env',
    {
      useBuiltIns: 'usage',
      corejs: {
        version: 3,
        proposal: true
      }
    }
  ],
  '@babel/preset-react'
]

const plugins = ['@babel/plugin-proposal-class-properties']

module.exports = {
  presets,
  plugins
}

const presets = [
  [
    '@babel/preset-env',
    {
      useBuiltIns: 'usage',
      corejs: '3.6',
    },
  ],
  '@babel/preset-react',
]

const plugins = ['@babel/plugin-proposal-class-properties']

module.exports = {
  presets,
  plugins,
}

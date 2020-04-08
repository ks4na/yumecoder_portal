const presets = [
  [
    '@babel/preset-env',
    {
      useBuiltIns: 'usage',
      corejs: '3.6',
    },
  ],
  // 支持 react jsx
  '@babel/preset-react',
  // 添加 preset-typescirpt, 并配置以支持 jsx 语法
  [
    '@babel/preset-typescript',
    {
      isTSX: true,
      allExtensions: true,
    },
  ],
]

const plugins = ['@babel/plugin-proposal-class-properties']

module.exports = {
  presets,
  plugins,
}

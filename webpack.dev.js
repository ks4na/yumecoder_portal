const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Webpack = require('webpack')
const autoPrefixer = require('autoprefixer')
const ObsoleteWebpackPlugin = require('obsolete-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, './src/index.tsx'),
  output: {
    // 如果不指定，默认为 '', 此时所有的引用路径都将是相对路径(例如：index.html 中引用的 bundle.js 的路径为：
    // src="bundle.js")，指定为 '/'之后，webpack 会将这些引用前面添加上 '/'。
    // 指定 publicPath 对于 BrowserRouter 模式非常重要， BrowserRouter 模式下不指定该属性，那么多层路由情况下
    // (如: localhost:3000/user/3/topics)刷新页面，这些引用路径都将是错误的(localhost:3000/user/3/bundle.js)
    publicPath: '/',
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js',
  },
  devServer: {
    host: '0.0.0.0', // 允许以非localhost方式访问，方便手机，其他机器访问本地项目
    historyApiFallback: {
      disableDotRule: true,
    }, // browserRouter本地测试需要开启
    disableHostCheck: true, // 本地hosts劫持测试时需要开启

    // 关闭 WDS 在控制台的 log
    clientLogLevel: 'none',
    // 启动 gzip 压缩
    // compress: true,
    // 开启https(自签名)
    https: true,
    proxy: {
      '/api': 'http://49.235.176.149:7001',
    },
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'),
      filename: 'index.html',
      favicon: './favicon.ico',
    }),
    // 定义 webpack 全局变量，可从代码中获取该值
    new Webpack.DefinePlugin({
      __WEBPACK_ENV_BASENAME__: JSON.stringify('/'),
    }),
    // 配置选项参考 https://github.com/ElemeFE/obsolete-webpack-plugin#options
    new ObsoleteWebpackPlugin({
      template:
        '<div>The browser you are using is too old. For a better experience, ' +
        'please <a href="https://browsehappy.com/">upgrade</a> your browser first.' +
        '<button id="obsoleteClose">&times;</button></div>',
    }),
  ],
  module: {
    rules: [
      // css/scss (custom stylesheet)
      {
        test: /\.(css|sass|scss)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              // css modules, React requires
              modules: {
                mode: 'local',
                localIdentName: '[name]__[local]_[hash:8]', // custom className, format: filename__classname_hash:8
              },
            },
          },
          // 注意： postcss-loader 放在 css-loader 之后，sass-loader 之前
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoPrefixer], // 配置 postcss 插件
            },
          },
          'sass-loader',
        ],
        exclude: /node_modules/,
      },
      // css/scss (stylesheet from lib)
      {
        test: /\.(css|sass|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        include: /node_modules/,
      },
      // img
      {
        test: /\.(jpg|jpeg|gif|bmp|png|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 5120, // size less than 5k will use base64_encode
            name: '[name]_[hash:8].[ext]',
          },
        },
        exclude: /assets[\\/]fonts/,
      },
      // fonts
      {
        test: /\.(ttf|eot|woff|woff2|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name]_[hash:4].[ext]',
          },
        },
        exclude: /assets[\\/]imgs/,
      },
      // es6+
      {
        test: /\.(j|t)sx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      // es6+ (transform es6+ files in directory node_modules/** )
      {
        test: /\.(j|t)sx?$/,
        use: 'babel-loader',
        include: [/node_modules[\\/]react-intl/],
      },
    ],
  },
  resolve: {
    // 在默认数组的基础上添加解析 jsx 和 ts, tsx 后缀，
    // 作用是让webpack识别这些后缀名，从而在 import这些后缀名的模块时可以省略后缀名
    extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx', '.ts', '.tsx'],
  },
}

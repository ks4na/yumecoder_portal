const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Webpack = require('webpack')

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, './src/index.js'),
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
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'),
      filename: 'index.html',
    }),
    // 定义 webpack 全局变量，可从代码中获取该值
    new Webpack.DefinePlugin({
      __WEBPACK_ENV_BASENAME__: JSON.stringify('/'),
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
        exclude: /src[\\/]fonts/,
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
        exclude: /src[\\/]imgs/,
      },
      // es6+
      {
        test: /\.jsx?/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      // es6+ (transform es6+ files in directory node_modules/** )
      {
        test: /\.jsx?/,
        use: 'babel-loader',
        include: [/node_modules[\\/]react-intl/],
      },
    ],
  },
}

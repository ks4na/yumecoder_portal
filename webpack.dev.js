const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, './src/index.js'),
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js',
  },
  devServer: {
    host: '0.0.0.0', // 允许以非localhost方式访问，方便手机，其他机器访问本地项目
    historyApiFallback: true, // browserRouter本地测试需要开启
    disableHostCheck: true, // 本地hosts劫持测试时需要开启
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'),
      filename: 'index.html',
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

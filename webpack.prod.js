const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: path.join(__dirname, './src/index.js'),
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'js/bundle.js',
    chunkFilename: 'js/[name].bundle.js', // 输出到dist文件的chunk文件的名称
  },
  devtool: 'source-map',
  optimization: {
    // 指定js/css压缩器
    minimizer: [
      new OptimizeCSSAssetsPlugin({}), // 压缩 提取出来的css文件
      new TerserJSPlugin({
        parallel: true, // 多核运行
        sourceMap: true, // 允许输出 sourcemap
      }), // 压缩js文件
    ],
    // 分离第三方包
    splitChunks: {
      chunks: 'all',
      // cacheGroups: {
      //   // 自定义一个 commons 组，分离 react|react-dom|react-router-dom 包为 react-dom-router.bundle.js
      //   // 注意设置 priority 高于 vendors 组才能生成该文件，且此时 vendors 组不再包含 react,react-dom,react-router-dom
      //   commons: {
      //     test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
      //     name: 'react-dom-router',
      //     chunks: 'all',
      //     priority: 10
      //   }
      // }
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'),
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:8].css',
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static', // 设置生成方式为 html文件
    }), // bundle分析插件
    new CleanWebpackPlugin(), // 清理dist文件夹
  ],
  module: {
    rules: [
      // css/scss (custom stylesheet)
      {
        test: /\.(css|sass|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
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
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          'css-loader',
          'sass-loader',
        ],
        include: /node_modules/,
      },
      // img
      {
        test: /\.(jpg|jpeg|gif|bmp|png|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 5120, // size less than 5k will use base64_encode
            context: 'src',
            name: '[path][name]_[hash:8].[ext]',
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
            name: 'fonts/[name]_[hash:4].[ext]',
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
      // html files
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            minimize: true, // 启用html压缩
          },
        },
      },
    ],
  },
}

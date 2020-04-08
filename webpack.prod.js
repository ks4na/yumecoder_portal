const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { getServedPath, ensureSlash } = require('./pathUtil')
const Webpack = require('webpack')
const autoPrefixer = require('autoprefixer')
const ObsoleteWebpackPlugin = require('obsolete-webpack-plugin')

// 根据 package.json 中的 config.basename 字段设置 publicPath， 默认为 '/'
const publicPath = getServedPath('./package.json')
const basename = ensureSlash(publicPath, false) // basename 后面不需要 '/'

module.exports = {
  mode: 'production',
  entry: path.join(__dirname, './src/index.tsx'),
  output: {
    // 如果不指定，默认为 '', 此时所有的引用路径都将是相对路径(例如：index.html 中引用的 bundle.js 的路径为：
    // src="bundle.js")，指定为 '/'之后，webpack 会将这些引用前面添加上 '/'。
    // 指定 publicPath 对于 BrowserRouter 模式非常重要， BrowserRouter 模式下不指定该属性，那么多层路由情况下
    // (如: localhost:3000/user/3/topics)刷新页面，这些引用路径都将是错误的(localhost:3000/user/3/bundle.js)
    publicPath,
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
      favicon: './favicon.ico',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:8].css',
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static', // 设置生成方式为 html文件
      openAnalyzer: false, // 不自动打开报告文件
    }), // bundle分析插件
    new CleanWebpackPlugin(), // 清理dist文件夹
    // 定义 webpack 全局变量，可从代码中获取该值
    new Webpack.DefinePlugin({
      __WEBPACK_ENV_BASENAME__: JSON.stringify(basename),
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
        exclude: /assets[\\/]fonts/,
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
  resolve: {
    // 在默认数组的基础上添加解析 jsx 和 ts, tsx 后缀，
    // 作用是让webpack识别这些后缀名，从而在 import这些后缀名的模块时可以省略后缀名
    extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx', '.ts', '.tsx'],
  },
}

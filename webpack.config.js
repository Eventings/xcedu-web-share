var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
const NODE_ENV = process.env.NODE_ENV

module.exports = {
  entry: NODE_ENV == 'development' ? './src/main.js' : './index.js',
  output: NODE_ENV == 'development' ? {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
  } : {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: 'xcedu-share.js',
    library: 'XcShare', // 指定的就是你使用require时的模块名称
    libraryTarget: 'umd', //指定输出格式
    umdNamedDefine: true, //会对UMD 的构建过程中的AMD 模块进行命名，否则就使用匿名的 define
    libraryExport: 'default'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: [/node_module/],
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        loader: 'sass-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve('src')
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  externals: {
  },
  devServer: {
    historyApiFallback: true,
    noInfo: false,
    overlay: true
  },
  performance: {
    hints: false
  }
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}else{
  module.exports.devtool = "#eval-source-map"
  module.exports.devServer = {
    host: 'gtyz.xiaochuang.com',
    port: 9001,
    compress: true,
    open: true,
    hot: true,
    proxy: {
      ['/api/v1']: {
        target: 'http://118.178.125.132:7200',
        changeOrigin: true
        // pathRewrite: {
        //   [`^${[devEnvConfig.WEB_REQUEST_BASE_URL]}`] : '/'
        // }
      }
    },
    overlay: true,
    historyApiFallback: {
      htmlAcceptHeaders: ['text/html', 'application/xhtml+xml']
    }
  }
  module.exports.plugins = (module.exports.plugins || []).concat([
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
      templateParameters: {
        MODULE_COMMON_BASE_URL: 'http://gtyz.xiaochuang.com:8490',
        MODULE_FTP_BASE_URL: 'http://gtyz.xiaochuang.com:8499'
      }
    })
  ])
}

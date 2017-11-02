const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
  //entry: './src/app.js',
  entry: {
    index: './src/index.js',
    about: './src/about.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: '[name].bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    historyApiFallback: true,
    hot: true,
    inline: true,
    port: 8000 //默认端口8080
  },
  module: {
    rules: [
      /*{
          test: require.resolve('jquery'),
          use: [{
            loader: 'expose-loader',
            options: '$'
          }]
      },*/
      {
        test: /\.(js|jsx)?$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              minimize: true //css压缩
            }
          }],
          publicPath: '/dist/'
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              minimize: true
            }
          }, {
            loader: 'sass-loader',
            options: {
              minimize: true
            }
          }],
          publicPath: '/dist/'
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              minimize: true
            }
          }, {
            loader: 'less-loader',
            options: {
              minimize: true
            }
          }],
          publicPath: '/dist/'
        })
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          'url-loader?limit=8192&name=images/[name].[ext]',
          //'image-webpack-loader'
        ]
      },
      {
        test: /\.(ttf|eot|woff|woff2|svg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]'
          }
        }]
      }
    ]
  },
  plugins: [
    new OpenBrowserPlugin({
      url: 'http://localhost:8000/',
      browser: 'chrome'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      chunks: ['index', 'about'],
      minChunks: 2
    }),
    new HtmlWebpackPlugin({
      favicon: './src/images/favicon.ico',
      title: 'Bobby',
      filename: './index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      hash: true,
      template: './src/index.html',
      chunks: ['vendors', 'index']
    }),
    new HtmlWebpackPlugin({
      favicon: './src/images/favicon.ico',
      title: 'About',
      filename: './about.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      hash: true,
      template: './src/about.html',
      chunks: ['vendors', 'about']
    }),
    new ExtractTextPlugin({
      filename: 'styles/[name].css',
      disable: false,
      allChunks: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false,
      },
      compress: {
        warnings: false,
        drop_console: false
      },
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};

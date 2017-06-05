var path = require('path');
var webpack = require('webpack');

// const precss = require('precss');
const cssImport = require('postcss-import');
const autoprefixer = require('autoprefixer');




module.exports = {
  entry: './src/index.js',

  output: {
    filename: 'static/bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: process.env.STATIC_PATH || '/'
  },

  devtool: 'source-map',

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['src', 'node_modules']
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          'babel-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: 'inline',
              plugins: [
                cssImport,
                autoprefixer({
                  browsers: ['last 4 versions']
                })
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|svg)$/,
        use: [ 'file-loader' ],
        exclude: /node_modules/
      }
    ]
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      comments: false
    }),

    new webpack.DefinePlugin({
      ENV: {
        DEBUG: false
      }
    })
  ]
};

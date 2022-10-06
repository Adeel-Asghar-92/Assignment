const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  devServer:{
    historyApiFallback:true,
  },
  mode: 'development',
  entry: path.join(__dirname, "src", "index.js"),
  devtool: 'inline-source-map',
  target: 'electron-renderer',
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|jfif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.js$|jsx/,
        // test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [[
              '@babel/preset-env', {
                targets: {
                  esmodules: true
                }
              }],
              '@babel/preset-react']
          }
        }
      },
      {
        test: [/\.s[ac]ss$/i, /\.css$/i],
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      }
    ],  
    
  },
  resolve: {
    extensions: ['.js'],
  },
  output: {
    filename: 'webpack.js',
    path: path.resolve(__dirname, 'build', 'js'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
    }),
  ],
};
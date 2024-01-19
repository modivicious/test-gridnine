const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

let mode = 'development';
let target = 'web';

const plugins = [
  new HtmlWebpackPlugin({
    template: './app/index.html',
  }),
  new MiniCssExtractPlugin({
    filename: '[name].[contenthash].css',
  }),
  new CleanWebpackPlugin(),
  new CopyPlugin({
    patterns: [
      {
        from: './app/*.json',
        to: '[name].json',
      },
    ],
  }),
];

if (process.env.NODE_ENV === 'production') {
  mode = 'production';
  target = 'browserslist';
}

if (process.env.SERVE) {
  plugins.push(new ReactRefreshWebpackPlugin());
}

module.exports = {
  mode,

  entry: './app/src/index.tsx',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    assetModuleFilename: '[name][hash][ext][query]',
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: '' },
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'typescript',
                tsx: true,
              },
            },
          },
        },
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },

  plugins,

  target,

  devtool: 'source-map',

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },

  devServer: {
    static: { directory: './app' },
    hot: true,
    port: 8080,
  },
};

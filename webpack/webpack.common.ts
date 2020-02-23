import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import * as ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import * as path from 'path'
import * as webpack from 'webpack'

const config: webpack.Configuration = {
  entry: './src/index.tsx',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        },
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '..', 'dist')
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin({ eslint: true }),
    new HtmlWebpackPlugin({ template: './src/index.html' })
  ]
}

export default config

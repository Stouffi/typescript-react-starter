import * as Dotenv from 'dotenv-webpack'
import { Configuration } from 'webpack'
import * as merge from 'webpack-merge'
import common from './webpack.common'

const config: Configuration = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  plugins: [new Dotenv()]
})
export default config

import { Configuration } from 'webpack'
import * as merge from 'webpack-merge'
import common from './webpack.common'

const config: Configuration = merge(common, {
  mode: 'production',
  devtool: 'source-map'
})
export default config

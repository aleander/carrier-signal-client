import * as path from 'path'
import * as webpack from 'webpack'
import HTMLWebpackPlugin from 'html-webpack-plugin'

const config: webpack.Configuration = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'foo.bundle.js'
  },
  devServer: {
    contentBase: './dist'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@app': path.resolve(__dirname, './src/')
    }
  },
  devtool: 'inline-source-map',
  plugins: [
    new HTMLWebpackPlugin({
      title: 'thingie',
      template: 'index.html'
    })
  ]
}

export default config

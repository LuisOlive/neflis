const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const { GenerateSW } = require('workbox-webpack-plugin')

module.exports = {
  devtool: 'source-map',

  output: { filename: '[name].[contenthash].js' },

  module: {
    rules: [
      { test: /\.ya?ml$/i, use: ['js-yaml-loader'] },
      { test: /\.pug$/i, use: ['pug-loader'] },
      {
        test: /\.(styl(us)?|css)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: true } },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  'css-mqpacker',
                  'autoprefixer',
                  require('cssnano')({ preset: 'default' }),
                  'postcss-preset-env'
                ],
                sourceMap: true
              }
            }
          },
          {
            loader: 'stylus-loader',
            options: {
              stylusOptions: {
                use: ['stylus-kit', 'stylus-bem-mixins'],
                compress: false,
                sourceMap: true
              }
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.pug' }),
    new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
    new CopyPlugin({ patterns: ['./static'] }),
    new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }),
    new GenerateSW({ clientsClaim: true, skipWaiting: true })
  ]
}

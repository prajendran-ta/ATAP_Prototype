import * as fs from 'fs'
import * as path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { Configuration, Compiler, DefinePlugin } from 'webpack'
import { Configuration as DevServerConfiguration } from 'webpack-dev-server'

// ATAP demo: front end only. There is no backend and no login; the app starts offline, signed in as a demo
// user, and serves its built-in demo data. (See apps/mediahub-ui/shared/offlineMode.ts.)
const devPort = 8080
const isProd = process.env.NODE_ENV === 'production'

interface WebpackConfiguration extends Configuration {
  devServer?: DevServerConfiguration
}

const config: WebpackConfiguration = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[contenthash].js',
    clean: true,
    publicPath: '/',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      '@amadeus': path.resolve(__dirname, 'packages'),
      '@mediahub': path.resolve(__dirname, 'apps'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: [/node_modules/, /\.(test|spec)\.tsx?$/, /\.stories\.tsx?$/, /\/stories\//],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', { loader: 'postcss-loader' }],
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(png|jpe?g|gif|ico)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.png',
    }),
    new DefinePlugin({
      // Starts the app with the backend off and sign-in skipped (a stored choice / ?offline= / ?login= still wins).
      __ATAP_DEMO__: JSON.stringify(true),
      // apiConfig reads this on localhost; `process` does not exist in the browser.
      'process.env.REACT_APP_LOCAL_ENV': JSON.stringify('staging-1'),
    }),
    // HTML5 banners (public/creatives) and the preview-page images (public/Images) are not webpack modules:
    // copy them into the production build. The dev server serves public/ directly.
    ...(isProd
      ? [
          {
            apply: (compiler: Compiler) => {
              compiler.hooks.afterEmit.tap('CopyPublicAssets', () => {
                const outDir = compiler.options.output.path ?? path.resolve(__dirname, 'build')
                ;['creatives', 'Images'].forEach(dir => {
                  const from = path.resolve(__dirname, 'public', dir)
                  if (fs.existsSync(from)) fs.cpSync(from, path.join(outDir, dir), { recursive: true })
                })
              })
            },
          },
        ]
      : []),
  ],
  devServer: {
    static: [{ directory: path.join(__dirname, 'public'), publicPath: '/' }],
    port: devPort,
    hot: true,
    historyApiFallback: true,
    open: true,
  },
  devtool: isProd ? false : 'source-map',
  mode: isProd ? 'production' : 'development',
}

export default config

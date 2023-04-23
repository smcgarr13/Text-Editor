const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      compress: true,
      port: 3000,
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
      }),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),
      new WebpackPwaManifest({
        name: 'text-editor',
        short_name: 'JATE',
        description: 'just another text editor',
        background_color: '#ffffff',
        crossorigin: 'use-credentials',
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-transform-runtime'],
            },
          },
        },
      ],
    },
  };
};



// Add and configure workbox plugins for a service worker and manifest file
  // Add InjectManifest plugin from workbox-webpack-plugin
  // Configure InjectManifest plugin with service worker source and destination paths
  // Add WebpackPwaManifest plugin
  // Configure WebpackPwaManifest plugin with PWA manifest details
// Add CSS loaders and Babel to webpack
  // Add a rule for CSS files
  // Use style-loader and css-loader for handling CSS files
  // Add a rule for JavaScript files
  // Use babel-loader for handling JavaScript files
  // Configure babel-loader with appropriate presets and plugins

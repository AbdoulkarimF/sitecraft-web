const {
  override,
  addWebpackPlugin,
  addBabelPlugin,
  addPostcssPlugins,
  adjustStyleLoaders
} = require('customize-cra');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

module.exports = override(
  // Optimisation du bundle
  (config) => {
    config.optimization = {
      ...config.optimization,
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
            },
            format: {
              comments: false,
            },
          },
          extractComments: false,
        }),
      ],
      splitChunks: {
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
    };
    return config;
  },

  // Compression des assets
  addWebpackPlugin(
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8,
    })
  ),

  // Analyse du bundle (uniquement en développement)
  process.env.ANALYZE &&
    addWebpackPlugin(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: 'bundle-report.html',
      })
    ),

  // Optimisation des images
  addWebpackPlugin(
    new ImageMinimizerPlugin({
      minimizer: {
        implementation: ImageMinimizerPlugin.imageminMinify,
        options: {
          plugins: [
            ['gifsicle', { interlaced: true }],
            ['jpegtran', { progressive: true }],
            ['optipng', { optimizationLevel: 5 }],
            ['svgo', { plugins: [{ removeViewBox: false }] }],
          ],
        },
      },
    })
  ),

  // Support des modules CSS
  adjustStyleLoaders(({ use: [, css, postcss, resolve, processor] }) => {
    css.options.modules = {
      auto: true,
      localIdentName: '[name]__[local]--[hash:base64:5]',
    };
  }),

  // PostCSS plugins
  addPostcssPlugins([
    require('autoprefixer'),
    require('cssnano')({
      preset: 'default',
    }),
  ]),

  // Babel plugins pour l'optimisation
  addBabelPlugin('@babel/plugin-transform-runtime'),
  addBabelPlugin('babel-plugin-transform-react-remove-prop-types')
);

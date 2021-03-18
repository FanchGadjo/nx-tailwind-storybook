const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const rootWebpackConfig = require('../../../.storybook/webpack.config');
/**
 * Export a function. Accept the base config as the only param.
 *
 * @param {Parameters<typeof rootWebpackConfig>[0]} options
 */
module.exports = async ({ config, mode }) => {
  config = await rootWebpackConfig({ config, mode });

  config.module.rules.push({
    test: /\.scss$/,
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        ident: 'postcss',
        syntax: 'postcss-scss',
        plugins: [
          require('@tailwindcss/jit'),
          require('postcss-import'),
          require('tailwindcss'),
          require('autoprefixer'),
        ],
      },
    },
  })

  const tsPaths = new TsconfigPathsPlugin({
    configFile: './tsconfig.base.json',
  });

  config.resolve.plugins
    ? config.resolve.plugins.push(tsPaths)
    : (config.resolve.plugins = [tsPaths]);

  return config;
};

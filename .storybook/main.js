const path = require('path')
const webpack = require('webpack');

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    '../src/**/*.stories.{js,jsx,ts,tsx,mdx}',
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/**/*.stories.internal.{js,jsx,ts,tsx,mdx}"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  "webpackFinal": async (config) => {
    config.module.rules = [
      // デフォルトのrulesに入っているCSS用の設定が悪さをするのでお帰りいただく
      ...config.module.rules.filter(rule => rule.test.source !== (/\.css$/).source),
      // css-loader を設定しなおす
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
    config.resolve.alias = {
      "~": path.resolve(__dirname, "../src")
    }
    config.plugins.push(new webpack.DefinePlugin({
      'process.env.__NEXT_IMAGE_OPTS': JSON.stringify({
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        domains: [],
        path: '/',
        loader: 'default',
      }),
    }));
    return config
  },
  typescript: { reactDocgen: false },
  core: {
    builder: 'webpack5',
  }
}


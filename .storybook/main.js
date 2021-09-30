const path = require('path')

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
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
    return config
  }
}


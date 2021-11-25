
const lessRule = {
  test: /\.less$/i,
  loader: [
    // compiles Less to CSS
    "style-loader",
    "css-loader",
    "less-loader",
  ],
};

module.exports = function override(config, env) {
  config.module.rules.push(lessRule);

  return config;
}

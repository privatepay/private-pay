const nodeExternals = require('webpack-node-externals');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');

module.exports = function (options, webpack) {
  const entry = Array.isArray(options.entry) ? options.entry : [options.entry];

  return {
    ...options,
    entry: ['webpack/hot/poll?100', ...entry],
    externals: [
      nodeExternals({
        allowlist: ['webpack/hot/poll?100'],
      }),
    ],
    plugins: [
      ...(options.plugins || []),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.WatchIgnorePlugin({
        paths: [/\.js$/, /\.d\.ts$/],
      }),
      new RunScriptWebpackPlugin({
        name: options.output?.filename,
        autoRestart: false,
      }),
    ],
  };
};

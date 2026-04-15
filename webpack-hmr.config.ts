import nodeExternals from 'webpack-node-externals';
import { RunScriptWebpackPlugin } from 'run-script-webpack-plugin';
import { Configuration } from 'webpack';

export default function (
  options: Configuration,
  webpack: typeof import('webpack'),
): Configuration {
  const entry = Array.isArray(options.entry)
    ? options.entry
    : [options.entry as string];

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
        name: options.output?.filename as string,
        autoRestart: false,
      }),
    ],
  };
}

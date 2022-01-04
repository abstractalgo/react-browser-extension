import * as path from 'path';
import * as webpack from 'webpack';
// in case you run into any typescript error when configuring `devServer`
import 'webpack-dev-server';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/*

https://create-react-app.dev/docs/advanced-configuration/

INLINE_RUNTIME_CHUNK = false

  By default, Create React App will embed the runtime script into index.html
  during the production build. When set to false, the script will not be
  embedded and will be imported as usual. This is normally required when dealing
  with CSP.

GENERATE_SOURCEMAP = false

  When set to false, source maps are not generated for a production build. This
  solves out of memory (OOM) issues on some smaller machines.

(SKIP_PREFLIGHT_CHECK = true)

*/

module.exports = function override(config: webpack.Configuration, env: Record<string, string>) {
  // no source maps
  config.devtool = false;

  // https://stackoverflow.com/a/60848093/1895436

  // Consolidate chunk files instead
  config.optimization.splitChunks = {
    cacheGroups: {
      default: false,
    },
  };
  // Move runtime into bundle instead of separate file
  config.optimization.runtimeChunk = false;

  // CSS remove MiniCssPlugin
  config.plugins = config.plugins.filter(
    // @ts-ignore
    (plugin) => !(plugin instanceof MiniCssExtractPlugin),
  );
  // CSS replaces all MiniCssExtractPlugin.loader with style-loader
  config.module.rules = (config.module.rules as webpack.RuleSetRule[]).map((moduleRule) => {
    moduleRule.oneOf = moduleRule.oneOf?.map((rule) => {
      if (!rule.hasOwnProperty('use')) return rule;
      return Object.assign({}, rule, {
        // @ts-ignore
        use: rule.use.map((options) =>
          /mini-css-extract-plugin/.test(options.loader)
            ? { loader: require.resolve('style-loader'), options: {} }
            : options,
        ),
      });
    });
    return moduleRule;
  });

  // config.module.rules = (config.module.rules as webpack.RuleSetRule[]).map(
  //   (moduleRule) => {
  //     moduleRule.rules = moduleRule.rules?.map((rule) => {
  //       if (rule.loader === "file-loader") {
  //         rule.options = {
  //           ...((rule.options as object) || {}),
  //           name: "[path][name].[ext]",
  //         };
  //       }
  //       return rule;
  //     });
  //     return moduleRule;
  //   }
  // );

  // for initial chunks
  // config.output.filename = 'static/js/[name].js';
  config.output.filename = 'popup-main.js';

  // for non-initial chunks (hopefully none of them)
  // config.output.chunkFilename = 'static/js/nic-[id].js';

  return config;
};

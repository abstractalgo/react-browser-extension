'use strict';
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
exports.__esModule = true;
require('webpack-dev-server');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = function override(config, env) {
  config.devtool = false;
  config.optimization.splitChunks = {
    cacheGroups: {
      default: false,
    },
  };
  config.optimization.runtimeChunk = false;
  config.plugins = config.plugins.filter(function (plugin) {
    return !(plugin instanceof MiniCssExtractPlugin);
  });
  config.module.rules = config.module.rules.map(function (moduleRule) {
    var _a;
    moduleRule.oneOf =
      (_a = moduleRule.oneOf) === null || _a === void 0
        ? void 0
        : _a.map(function (rule) {
            if (!rule.hasOwnProperty('use')) return rule;
            return Object.assign({}, rule, {
              use: rule.use.map(function (options) {
                return /mini-css-extract-plugin/.test(options.loader)
                  ? { loader: require.resolve('style-loader'), options: {} }
                  : options;
              }),
            });
          });
    return moduleRule;
  });
  config.module.rules = config.module.rules.map(function (moduleRule) {
    var _a;
    moduleRule.rules =
      (_a = moduleRule.rules) === null || _a === void 0
        ? void 0
        : _a.map(function (rule) {
            if (rule.loader === 'file-loader') {
              rule.options = __assign(__assign({}, rule.options || {}), { name: '[path][name].[ext]' });
            }
            return rule;
          });
    return moduleRule;
  });
  config.output.filename = 'static/js/[name].js';
  config.output.chunkFilename = 'static/js/nic-[id].js';
  return config;
};

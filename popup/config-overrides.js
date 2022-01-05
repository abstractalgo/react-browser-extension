"use strict";
exports.__esModule = true;
require("webpack-dev-server");
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = function override(config, env) {
    config.devtool = false;
    config.optimization.splitChunks = {
        cacheGroups: {
            "default": false
        }
    };
    config.optimization.runtimeChunk = false;
    config.plugins = config.plugins.filter(function (plugin) { return !(plugin instanceof MiniCssExtractPlugin); });
    config.module.rules = config.module.rules.map(function (moduleRule) {
        var _a;
        moduleRule.oneOf = (_a = moduleRule.oneOf) === null || _a === void 0 ? void 0 : _a.map(function (rule) {
            if (!rule.hasOwnProperty('use'))
                return rule;
            return Object.assign({}, rule, {
                use: rule.use.map(function (options) {
                    return /mini-css-extract-plugin/.test(options.loader)
                        ? { loader: require.resolve('style-loader'), options: {} }
                        : options;
                })
            });
        });
        return moduleRule;
    });
    config.output.filename = 'popup-main.js';
    return config;
};

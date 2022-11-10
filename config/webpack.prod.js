const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const {paths, packageInfo, bannerConfig, env} = require('./config');

/**
 * Sample variables: "cross-env TARGET=umd"
 * TARGET: libraryTarget
 */
const libraryTarget = env.TARGET || 'umd';
let filename, experiments = {}, library = undefined, path = undefined;
switch(libraryTarget){
    case "module":
        filename = `${packageInfo.outputFilename}.module.js`;
        experiments = {
            outputModule: true,
        };
        break;
    default:
        filename = `${packageInfo.outputFilename}.min.js`;
        path = paths.root;
}

module.exports = {
    mode: 'production',
    devtool: false,
    entry: paths.entry,
    experiments,
    output: {
        path,
        filename,
        library,
        libraryTarget,
        umdNamedDefine: true,
        // prevent error: `Uncaught ReferenceError: self is not define`
        globalObject: 'this',
    },
    plugins: [
        new webpack.BannerPlugin(bannerConfig)
    ],
    optimization: {
        minimizer: [new TerserPlugin({extractComments: false})],
    },
};
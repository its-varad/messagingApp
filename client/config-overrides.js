const webpack = require('webpack');
const { override, addWebpackAlias, addWebpackModuleRule } = require('customize-cra');
const path = require('path');

module.exports = override(
    addWebpackAlias({
        crypto: path.resolve(__dirname, 'node_modules/crypto-browserify'),
        stream: path.resolve(__dirname, 'node_modules/stream-browserify'),
        util: path.resolve(__dirname, 'node_modules/util'),
        buffer: path.resolve(__dirname, 'node_modules/buffer')
    }),
    (config) => {
        config.resolve.fallback = {
            ...config.resolve.fallback,
            crypto: require.resolve('crypto-browserify'),
            stream: require.resolve('stream-browserify'),
            util: require.resolve('util'),
            buffer: require.resolve('buffer'),
        };
        config.plugins.push(
            new webpack.ProvidePlugin({
                process: 'process/browser',
                Buffer: ['buffer', 'Buffer'],
            })
        );
        return config;
    }
);

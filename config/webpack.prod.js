'use strict'
// Development environment WebPack configuration
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const baseConfig = require("./webpack.base")
const { merge } = require("webpack-merge");

module.exports = merge(baseConfig, {
    mode: "production",
    devtool: false,
    output: {
        publicPath: "./",
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        scss: ExtractTextPlugin.extract({ fallback: 'vue-style-loader', use: 'css-loader!sass-loader' }),
                        css: ExtractTextPlugin.extract({ fallback: 'vue-style-loader', use: 'css-loader' }),
                    }
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['sass-loader','postcss-loader']
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: "[name].[contenthash].css",
            allChunks: true,
            disable: false
        }),
        new TerserPlugin({
            parallel: true
        }),
        new CleanWebpackPlugin()
    ],
    optimization: {
        splitChunks: {
            chunks: "all",
            minSize: 30,
            cacheGroups: {
                default: {
                    name: 'common',
                    chunks: 'initial',
                    minChunks: 2,
                    priority: -20
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'initial',
                    priority: -10
                }
            }
        },
        runtimeChunk: true,
    }
})
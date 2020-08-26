'use strict'
// base environment WebPack configuration
const path = require("path")
const glob = require("glob")
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const PruifyCSSPlugin = require("purifycss-webpack");
const WebpackBar = require('webpackbar');

module.exports = {
    entry: path.resolve(__dirname, '../src/main.js'),
    output: {
        filename: '[name]-[hash].js',
        path: path.resolve(__dirname, '../dist'),
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'vue': "@vue/runtime-dom",
            'vuex': "vuex/dist/vuex.esm-bundler",
            '@': path.join(__dirname, '../src')
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                  loader: 'babel-loader',
                  options: {
                        presets: ['@babel/preset-env']
                    }
                }]
            },
            {
                test: /\.vue$/,
                use: [{loader: 'vue-loader'}]
            },
            {
                test: /\.(png|jpeg|gif|jpg)$/i,
                loader: 'url-loader?limit=8192',
                options: {
                    name: 'images/[name].[ext]'
                }
            },
        ]
    },
    plugins: [
        new WebpackBar(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, "../public/index.html"),
            inject: "body",
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeEmptyAttributes: true,
                removeAttributeQuotes: true
            }
        }),
        new VueLoaderPlugin(),
        // 消除未使用的css内容
        new PruifyCSSPlugin({
            paths: glob.sync(path.join(__dirname, "../dist/*.html"))
        })
    ],
    performance: {
        hints: 'warning',
        maxEntrypointSize: 100000000,
        maxAssetSize: 100000000,
        assetFilter: function(assetFilename) {
              return assetFilename.endsWith('.js');
        }
}
}
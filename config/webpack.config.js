'use strict'
// production environment WebPack configuration
const path = require("path")
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const notifier = require('node-notifier');
const baseConfig = require("./webpack.base")
const { merge } = require("webpack-merge");
const webpack = require("webpack");
const chalk = require("chalk");

module.exports = merge(baseConfig, {
    mode: "development",
    devtool: "cheap-module-eval-source-map",
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.less$/,
                use: ["style-loader", "css-loader", "less-loader"]
            },
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
    devServer: {
        compress: true,
        port: 9000,
        contentBase: path.resolve(__dirname, "../public"),
        hot: true,
        overlay: true,
        quiet: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: [
                    `\n\t${chalk.green.bold("Welcome to Vue3 Application!")}`+
                    `\n\n${chalk.greenBright("You can view projects in two ways:")}`+
                    `\n\tYour application is running in: ${chalk.blue.bold("http://localhost:9000")}`+
                    `\n\tYour application is running in: ${chalk.blue.bold("http://127.0.0.1:9000")}`,
                ]
            },
            onErrors: (severity, errors) => {
                if (severity !== 'error') {
                  return;
                }
                const error = errors[0];
                notifier.notify({
                  title: "Webpack error",
                  message: severity + ': ' + error.name,
                  subtitle: error.file || ''
                });
            },
            clearConsole: true,
        }),
    ]
})
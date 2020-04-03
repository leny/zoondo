/* leny/zoondo
 *
 * /webpack.config.js - Webpack configuration
 *
 * coded by leny
 * started at 03/04/2020
 */

// NOTE (@leny): this file is kinda special, many rules are disabled. It's normal.
/* eslint-disable no-console, no-param-reassign, global-require */

const webpack = require("webpack");
const {resolve, join} = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isTruthy = m => !!m;

module.exports = ({env, watch = false}) => {
    // ----- config & vars extraction

    process.env.NODE_ENV = env.includes("dev") ? "development" : "production";

    const pkgVars = require("./package.json");

    // ----- resolve alias

    // TODO

    // ----- loader rules

    const rules = [
        // --- Images
        {
            test: /\.(png|jpg|gif)$/,
            use: [
                {
                    loader: "file-loader",
                    options: {
                        name: `assets/${
                            env.includes("dev") ? "[path][name]" : "[hash]"
                        }.[ext]`,
                    },
                },
                {
                    loader: "img-loader",
                    options: {
                        plugins: [
                            require("imagemin-gifsicle")({
                                interlaced: false,
                            }),
                            require("imagemin-mozjpeg")({
                                progressive: true,
                                arithmetic: false,
                            }),
                            require("imagemin-pngquant")({
                                floyd: 0.5,
                                speed: 2,
                            }),
                        ],
                    },
                },
            ],
        },

        // --- JS modules
        {
            test: /\.js$/,
            exclude: [/node_modules/],
            use: [
                env.includes("dev") && "cache-loader",
                {
                    loader: "babel-loader",
                    options: {
                        cacheDirectory: env.includes("dev"),
                    },
                },
            ].filter(isTruthy),
        },
    ];

    // ----- Plugins

    const plugins = [
        new webpack.EnvironmentPlugin({
            ZOONDO_ENV: env.includes("dev") ? "dev" : env,
            NODE_ENV: env !== "prod" ? "development" : "production",
            VERSION: pkgVars.version,
            BUILD_TIME: Date.now(),
        }),
        new HtmlWebpackPlugin({
            template: resolve(__dirname, "./src/index.html"),
            path: "../",
        }),
    ];

    // ----- Optimization (staging & prod)

    const optimization = {};

    // -----

    return {
        mode: env.includes("dev") ? "development" : "production",
        devtool: env.includes("dev")
            ? "cheap-module-eval-source-map"
            : "hidden-source-map",
        context: resolve(__dirname, "./src"),
        entry: ["./app.js"],
        module: {
            rules,
        },
        // resolve: {alias},
        node: {fs: "empty"},
        plugins,
        optimization,
        performance: {hints: false},
        output: {
            path: resolve(__dirname, "./bin"),
            filename: env.includes("dev")
                ? "js/bundle.js"
                : "js/[chunkhash].js",
            publicPath: "/",
        },
        watch: env.includes("dev") && watch,
        devServer: {
            compress: true,
            historyApiFallback: true,
            open: true,
            contentBase: join(__dirname, "bin"),
            watchContentBase: true,
            writeToDisk: true,
        },
    };
};

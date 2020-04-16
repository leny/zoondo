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
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ImageminWebpackPlugin = require("imagemin-webpack-plugin").default;
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const NodemonPlugin = require("nodemon-webpack-plugin");

const isTruthy = m => !!m;

module.exports = ({target, env, watch = false}) => {
    // ----- config & vars extraction

    process.env.NODE_ENV = env.includes("dev") ? "development" : "production";

    const pkgVars = require("./package.json");

    // ----- resolve alias

    const alias = Object.fromEntries(
        Object.entries(
            {
                client: {
                    assets: "src/client/assets",
                    core: "src/client/core",
                    data: "src/data",
                    utils: "src/client/core/utils",
                    components: "src/client/components",
                    containers: "src/client/containers",
                    types: "src/client/core/types",
                },
                server: {
                    core: "src/server/core",
                    game: "src/server/game",
                    data: "src/data",
                    utils: "src/server/core/utils",
                },
            }[target],
        ).map(([key, path]) => [key, resolve(__dirname, path)]),
    );

    // ----- loader rules

    // --- Images
    const imagesLoader = {
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
    };

    // --- JS modules
    const jsLoader = {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [
            env.includes("dev") && "cache-loader",
            {
                loader: "babel-loader",
                options: {
                    cacheDirectory: env.includes("dev"),
                    ...{
                        client: {
                            presets: [
                                [
                                    "@babel/preset-env",
                                    {
                                        useBuiltIns: "usage",
                                        corejs: "3",
                                        targets: "> 0.25%, not dead",
                                    },
                                ],
                                "@babel/preset-react",
                                "@emotion/babel-preset-css-prop",
                            ],
                            plugins: ["emotion"],
                        },
                        server: {
                            presets: [
                                [
                                    "@babel/preset-env",
                                    {
                                        useBuiltIns: "usage",
                                        corejs: "3",
                                        targets: {
                                            node: "12.13.0",
                                        },
                                    },
                                ],
                            ],
                            plugins: [
                                "@babel/plugin-proposal-class-properties",
                                "@babel/plugin-proposal-private-methods",
                            ],
                        },
                    }[target],
                    compact: false,
                    comments: false,
                },
            },
        ].filter(isTruthy),
    };

    const rules = [target === "client" && imagesLoader, jsLoader].filter(
        isTruthy,
    );

    // ----- Plugins

    const plugins = [
        new CleanWebpackPlugin(),
        new webpack.EnvironmentPlugin({
            ZOONDO_ENV: env.includes("dev") ? "dev" : env,
            NODE_ENV: env !== "prod" ? "development" : "production",
            VERSION: pkgVars.version,
            BUILD_TIME: Date.now(),
            DEBUG_MODE: env !== "prod" && watch,
            ...{
                client: {
                    SERVER_PATH: watch ? "http://localhost:8000" : "/",
                },
                server: {
                    APP_PORT: 8000,
                    CLIENT_PATH: resolve(__dirname, "./bin/client"),
                },
            }[target],
        }),
        target === "client" &&
            new HtmlWebpackPlugin({
                template: resolve(__dirname, "./src/client/index.html"),
                path: "../",
            }),
        target === "client" &&
            new CopyWebpackPlugin([
                {
                    from: "assets/tribes",
                    to: "assets/tribes",
                },
            ]),
        target === "client" &&
            new ImageminWebpackPlugin({test: /\.(jpe?g|png|gif)$/i}),
        watch &&
            target === "server" &&
            new NodemonPlugin({nodeArgs: ["--inspect"]}),
    ].filter(isTruthy);

    // ----- Optimization (staging & prod)

    const optimization = {};

    // -----

    return {
        target: target === "client" ? "web" : "node",
        mode: env.includes("dev") ? "development" : "production",
        devtool: env.includes("dev")
            ? "cheap-module-eval-source-map"
            : "hidden-source-map",
        context: resolve(__dirname, `./src/${target}`),
        entry: {
            client: ["./app.js"],
            server: ["./index.js"],
        }[target],
        module: {
            rules,
        },
        resolve: {alias},
        externals: [target === "server" && nodeExternals()].filter(isTruthy),
        node: {
            client: {fs: "empty"},
            server: {},
        }[target],
        plugins,
        optimization,
        performance: {hints: false},
        output: {
            client: {
                path: resolve(__dirname, "./bin/client"),
                filename: env.includes("dev")
                    ? "js/bundle.js"
                    : "js/[chunkhash].js",
                publicPath: "/",
            },
            server: {
                path: resolve(__dirname, "./bin/server"),
                filename: "server.js",
            },
        }[target],
        watch: env.includes("dev") && watch,
        devServer: {
            compress: true,
            historyApiFallback: true,
            port: 8888,
            open: true,
            contentBase: join(__dirname, "bin"),
            watchContentBase: true,
            writeToDisk: true,
        },
    };
};

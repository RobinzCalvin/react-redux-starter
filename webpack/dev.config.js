const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const postcssReporter = require('postcss-reporter');
const postcssEasyImport = require('postcss-easy-import');
const postcssSCSS = require('postcss-scss');
const autoprefixer = require('autoprefixer');
const stylelint = require('stylelint');
const doiuse = require('doiuse');

const chunkhash = process.env.NODE_ENV === 'production' ? 'chunkhash' : 'hash';
const packageName = process.env.NODE_ENV_MODE === 'gh-pages' ? '/react-redux-starter-kit' : '';

module.exports = {
    target: 'web',
    context: path.resolve(__dirname, '..', 'src'),
    entry: {
        app: [
            'react-hot-loader/patch',
            './index.tsx'
        ],
    },
    output: {
        publicPath: packageName + '/',
        path: path.resolve(__dirname, '..', 'build'),
        filename: 'js/[name]-[' + chunkhash + '].bundle.js',
        chunkFilename: 'js/[name]-[' + chunkhash + '].bundle.js',
    },
    resolve: {
        modules: ['node_modules', 'src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    module: {
        rules: [{
                test: /\.(ts|tsx)$/,
                use: [{
                        loader: 'react-hot-loader/webpack'
                    },
                    {
                        loader: 'awesome-typescript-loader'
                    },
                    {
                        loader: 'tslint-loader'
                    }
                ],
            },
            {
                test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
                use: 'file-loader?name=fonts/[hash].[ext]',
            },
            {
                test: /\.css$/,
                loader: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                loader: [
                    'style-loader',
                    'css-loader?importLoaders=1',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    autoprefixer({
                                        browsers: ['last 2 versions']
                                    }),
                                ];
                            },
                        },
                    },
                    'sass-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            syntax: postcssSCSS,
                            plugins: function () {
                                return [
                                    postcssEasyImport({
                                        extensions: '.scss',
                                    }),
                                    stylelint(),
                                    doiuse({
                                        browsers: ['ie >= 11', 'last 2 versions'],
                                        ignore: ['flexbox', 'rem'],
                                        ignoreFiles: ['**/normalize.css'],
                                    }),
                                    postcssReporter({
                                        clearReportedMessages: true,
                                        throwError: true,
                                    }),
                                ];
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(png|svg)/,
                loader: 'url-loader',
                options: {
                    name: 'images/[name].[ext]',
                    limit: 10000
                }
            },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'meta',
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            chunks: ['app'],
            minChunks: (module, count) => module.context && module.context.includes("node_modules"),
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'shared',
            chunks: ['app'],
            minChunks: (module, count) => module.context && module.context.includes("src/shared"),
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'assets/index.html',
            chunksSortMode: function (a, b) {
                var order = ["app", "shared", "vendor", "meta"];
                return order.indexOf(b.names[0]) - order.indexOf(a.names[0]);
            },
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            'process.env.__HOST__': JSON.stringify('http://localhost:3000'),
        }),
        new webpack.NamedModulesPlugin(),
    ],

    devServer: {
        contentBase: path.resolve('..', 'build'),
        host: '0.0.0.0',
        port: 8080,
        inline: true,
        lazy: false,
        hot: true,
        historyApiFallback: true,
        disableHostCheck: true,
        stats: 'errors-only',
    }
};
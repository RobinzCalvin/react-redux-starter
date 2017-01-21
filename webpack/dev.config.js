const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    target: 'web',
    context: path.resolve(__dirname, '..', 'src'),
    entry: {
        app: './index.tsx',
        shared: [
            './shared/index.ts',
        ],
        vendor: [
            'axios',
            'react',
            'redux',
            'bem-cn',
            'reselect',
            'immutable',
            'react-dom',
            'react-redux',
            'redux-thunk',
            'react-router',
            'react-select',
            'react-bootstrap',
            'react-tap-event-plugin',
            'bootstrap/dist/css/bootstrap.min.css',
            './assets/bootstrap.paper.min.css',
        ]
    },
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, '..', 'build'),
        filename: 'js/app.bundle.js'
    },
    resolve: {
        modules: ['node_modules', 'src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: [
                    // { loader: 'react-hot-loader' }, // temporary disabled
                    {
                        loader: 'ts-loader',
                        options: { logLevel: 'debug' }
                    },
                    'tslint-loader'
                ],
            },
            {
                test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
                use: 'file-loader?name=fonts/[hash].[ext]',
            },
            {
                test: /\.css$/,
                loader:  ['style-loader', 'css-loader']
            },
            {
                test: /\.styl$/,
                loader: ['style-loader', 'css-loader?modules&importLoaders=1', 'stylus-loader']
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
            name: 'vendor',
            filename: 'js/vendor.bundle.js',
            minChunks: Infinity,
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'shared',
            filename: 'js/shared.bundle.js',
            chunks: ['app']
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'assets/index.html'
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
        stats: 'errors-only',
    }
};

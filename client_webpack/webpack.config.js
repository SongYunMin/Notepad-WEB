const path = require('path')
const VueLoader = require('vue-loader/lib/plugin')
const HtmlWebpack = require('html-webpack-plugin')
const { webpack } = require('webpack')

module.exports = {
    mode: 'development',
    entry: {
        app: './src/main.js',
    },
    devtool: '#source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '/',
    },
    devServer: {
        open       : true,
        hot        : true,
        contentBase: './dist'
    },
    module: {
        rules: [
            { test: /\.js$/, use: 'babel-loader' },
            { test: /\.vue$/, use: 'vue-loader' },
            { test: /\.css$/, use: ['vue-style-loader', 'css-loader'] }
        ]
    },
    plugins: [
        new VueLoader(),
        new HtmlWebpack({template: '/index.html', title: 'notepad'}),
    ],
    optimization: {},
    resolve: {
        modules: ['node_modules'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['.js', '.json', '.jsx', '.css'],
    },
};
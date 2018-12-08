const path = require('path');
const webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const SRC_DIR = path.resolve(__dirname, 'src');
const WWW_DIR = path.resolve(__dirname, 'www');
const DIST_DIR = path.resolve(__dirname, 'dist');

webpackConfig = {
    mode: "development",
    devtool: false, //"inline-source-map"
    entry: `${SRC_DIR}/index.tsx`,
    output: {
        filename: "bundle.js",
        path: WWW_DIR,
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".css", ".json"]
    },
    node: {
        fs: 'empty'
    },
    stats: {
        colors: true,
        reasons: true,
        chunks: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve('www/index.html'),
        })
    ],
    devServer: {
        contentBase: [DIST_DIR, SRC_DIR, WWW_DIR],
        port: 3000,
        compress: true,
        publicPath: '/',
        historyApiFallback: true,
        inline: true,
        hot: true,
        overlay: true
    },
    module: {
        rules: [
            { 
                test: /\.tsx?$/, 
                loader: "ts-loader" 
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
              test: /\.(png|svg|jpg|gif)$/,
              use: [
                'file-loader'
              ]
            }
        ]
    }
};

if (process.env.NODE_ENV === 'staging' || process.env.NODE_ENV === 'production') {
    //config.entry = `${SRC_DIR}/index.tsx`;
    config.devtool = false;
    
    const ElectronPackager = require("webpack-electron-packager");
    webpackConfig.plugins.push(new ElectronPackager({
        dir: ".",
        arch: "ia32",
        platform: "win32",
        out: "release-builds",
        overwrite: true
    }));
}

module.exports = webpackConfig;
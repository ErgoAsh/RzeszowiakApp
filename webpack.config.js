const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ElectronPackager = require("webpack-electron-packager");

const SRC_DIR = path.resolve(__dirname, 'src');
const DIST_DIR = path.resolve(__dirname, 'dist');
const PUBLIC_DIR = path.resolve(__dirname, 'public');

webpackConfig = {
    mode: "production",
    devtool: false, //"inline-source-map"
    entry: `${SRC_DIR}/index.tsx`,
    output: {
        filename: "bundle.js",
        path: DIST_DIR,
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
            template: path.resolve('public/index.html'),
        }),
        new ElectronPackager({
            dir: ".",
            arch: "ia32",
            platform: "win32",
            out: "release-builds",
            overwrite: true
        })
    ],
    devServer: {
        contentBase: [DIST_DIR, SRC_DIR, PUBLIC_DIR],
        port: 80,
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
                },
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
  
    webpackConfig.plugins.push(new ElectronPackager({
        dir: ".",
        arch: "ia32",
        platform: "win32",
        out: "release-builds",
        overwrite: true
    }));
}

module.exports = webpackConfig;
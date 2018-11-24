const path = require('path');
const webpack = require('webpack');

//const ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CordovaPlugin = require('webpack-cordova-plugin');
//var InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');

const SRC_DIR = path.resolve(__dirname, 'src');
const DIST_DIR = path.resolve(__dirname, 'dist');
const PUBLIC_DIR = path.resolve(__dirname, 'public');

module.exports = {
    mode: "development",
    devtool: "inline-source-map",
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
        new CordovaPlugin({
            config: 'config.xml',  // Location of Cordova' config.xml (will be created if not found)
            src: 'index.html',     // Set entry-point of cordova in config.xml
            platform: 'android',   // Set `webpack-dev-server` to correct `contentBase` to use Cordova plugins.
            version: true,         // Set config.xml' version. (true = use version from package.json)
        })
        
        //new InterpolateHtmlPlugin({
        //    PUBLIC_URL: PUBLIC_DIR
        //})
        //new ExtractTextPlugin({ filename: 'styles.css', allChunks: true })
    ],
    devServer: {
        contentBase: [DIST_DIR, SRC_DIR, PUBLIC_DIR],
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
            }
        ]
    }
};

if (process.env.NODE_ENV === 'staging' || process.env.NODE_ENV === 'production') {
    config.entry = `${SRC_DIR}/index.tsx`;
    config.devtool = false;
    config.plugins = [];
}
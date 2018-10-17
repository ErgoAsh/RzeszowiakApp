const path = require('path');
const webpack = require('webpack');
//const ExtractTextPlugin = require('extract-text-webpack-plugin');

const SRC_DIR = path.resolve(__dirname, 'src');
const DIST_DIR = path.resolve(__dirname, 'dist');

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
    stats: {
        colors: true,
        reasons: true,
        chunks: true
      },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
        //new ExtractTextPlugin({ filename: 'styles.css', allChunks: true })
    ],
    devServer: {
        contentBase: DIST_DIR,
        port: 3000,
        compress: true,
        publicPath: '/',
        historyApiFallback: true,
        inline: true,
        hot: true
    },
    module: {
        rules: [
            { 
                test: /\.tsx?$/, 
                loader: "ts-loader" 
            },
            {
                test: /\.js$/,
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
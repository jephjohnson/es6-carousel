const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const uglifyJsPlugin = require('uglifyjs-webpack-plugin');
const config = require('config');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

/*-------------------------------------------------*/

let plugins = [
    new HTMLWebpackPlugin({
        template: path.resolve(__dirname, './src/index.html')
    }),
    new CopyWebpackPlugin([
        {from:'src/assets/fonts', to:'assets/fonts'},
        {from:'src/assets/images', to:'assets/images'},
        {from:'src/assets/data', to:'assets/data'} 
    ]), 
    new ExtractTextPlugin({ filename: 'style.css', disable: false, allChunks: true }),
    new webpack.HotModuleReplacementPlugin(),
];

if( config.get('uglify') ) {
    plugins.push( new uglifyJsPlugin( {
        sourceMap: config.get('sourcemap')
    } ) );
}

/*-------------------------------------------------*/

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        publicPath: config.get('publicPath')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {           
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader', 'sass-loader']
                })
            }
            
        ]
    },
    plugins: plugins,
    devServer: {
        historyApiFallback: true,
        open: config.get('open')
    }
};

const extractSass = new ExtractTextPlugin({
    filename: "[name].css",
    disable: process.env.NODE_ENV === "development"
});

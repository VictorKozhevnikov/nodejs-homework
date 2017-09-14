const webpack = require('webpack');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const path = require('path');

module.exports = {
    entry: {
        'main': './src/index.ts'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
        sourceMapFilename: '[file].map',
        chunkFilename: '[id].chunk.js'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.js', '.json']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: [/\.(spec|e2e)\.ts$/],
                use: 'awesome-typescript-loader'
            },
            {
                test: /\.json$/,
                use: 'json-loader'
            }
        ]
    },
    plugins:[
        new webpack.optimize.ModuleConcatenationPlugin(),
        new CheckerPlugin()
    ]
}

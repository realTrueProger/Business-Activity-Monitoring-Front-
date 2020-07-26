const path = require('path');
const webpack = require('webpack');

module.exports = (env) => {
    return {
        mode: 'production',
        entry: './src/app.js',
        output: {
            path: path.join(__dirname, 'public'),
            filename: 'bundle.js'
        },
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }, {
                test: /\.s?css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }, {
                test: /\.bpmn$/,
                use: {
                    loader: 'raw-loader'
                }
            }]
        },
        plugins: [
            new webpack.DefinePlugin({ 'process.env.API_URL': JSON.stringify(`${env.API_URL}`) }),
        ]
    };
};

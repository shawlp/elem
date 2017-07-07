/**
 * Created by Administrator on 2017/6/17 0017.
 */
module.exports = {
    entry: './src/main.js',
    output: {
        path: __dirname,
        filename: 'dist/appBundle.js'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.css$/, loader: 'style-loader!css-loader'},
            { test: /\.(png|jpg|gif|ttf)$/, loader: 'file-loader'}
        ]
    }
};
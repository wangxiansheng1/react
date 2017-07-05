const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html
const ExtractTextPlugin = require('extract-text-webpack-plugin'); //css单独打包
//清除文件夹dist
const CleanWebpackPlugin = require('clean-webpack-plugin');

//定义地址
const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'src'); //__dirname 中的src目录，以此类推
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist'); //发布文件所存放的目录dist/前面加/报错？
const loaders = require('./webpack.loaders');


module.exports = {
    entry: {
        app: './src/App.jsx'
    },
    output: {
        //publicPath: 'dist/', //编译好的文件，在服务器的路径,域名会自动添加到前面
        path: BUILD_PATH, //编译到当前目录
        filename: 'scripts/[name].[chunkhash:5].js', //编译后的文件名字
        chunkFilename: '/scripts/[name].[chunkhash:5].min.js',//chunkhash是根据具体模块文件的内容计算所得的hash值，所以某个文件的改动只会影响它本身的hash指纹，不会影响其他文件。
    },
    module: loaders,


    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production') //定义生产环境
            }
        }),
        new HtmlWebpackPlugin({
            template: './src/template/index.html',
            title: 'dist',
            inject: 'body'
        }),
        new ExtractTextPlugin('style/[name].css'),
        //提取出来的样式和common.js会自动添加进发布模式的html文件中，原来的html没有
        // new webpack.optimize.CommonsChunkPlugin("common", "scripts/common.bundle.js"),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false, // remove all comments
            },
            compress: {
                warnings: false
            }
        }),

        new CleanWebpackPlugin(['dist'], {
            //清除dist文件 root为根目录下
            root: process.cwd()
        }),
    ],

    //热更新
    devServer: {
        colors: true,
        historyApiFallback: true,
        inline: true
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.less', '.scss', '.css'] //后缀名自动补全
    }
}
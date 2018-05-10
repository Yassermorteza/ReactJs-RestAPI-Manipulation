'use strict';

const path = require('path');
const webpack =  require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");


module.exports = {
	entry: [
		'babel-polyfill',
		path.resolve(__dirname, 'src', 'index.js')
	],
	output: {
		path: path.resolve(__dirname, 'public'),
		publicPath: '/',
		filename: 'script.js'
	},
	module: {
		rules:[
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['env', 'react']
				}
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			}
		]
	},
	plugins: [
		new UglifyJSPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new HtmlWebpackPlugin({
			minify: {
				collapseWhitespace: true
			},
			hash: true,
			template: './src/index.html',
		}),
		new CompressionPlugin({
			asset: "[path].gz[query]",
			algorithm: "gzip",
			test: /\.js$|\.css$|\.html$/,
			threshold: 10240,
			minRatio: 0
		})
	]
}
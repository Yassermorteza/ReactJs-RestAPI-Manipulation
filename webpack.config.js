'use strict';

const path =  require('path');
const webpack =  require('webpack');

module.exports = {
	entry: [
		'babel-polyfill',
		'react-hot-loader/patch',
		path.resolve(__dirname, 'src', 'index.js')
	],
	output: {
		path: path.resolve(__dirname, 'src'),
		publicPath: '/',
		filename: 'script.js'
	},
	resolve: {
		modules: [path.resolve(__dirname, 'node_modules')],
		extensions: ['*', '.js', '.jsx']
	},
	devServer:{
		contentBase: path.resolve(__dirname, 'src'),
		historyApiFallback: true,
		inline: true,
		hot: true,
		port: 8080
	},
	module: {
		rules:  [
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
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify("development") 
			}
		})
	]
}
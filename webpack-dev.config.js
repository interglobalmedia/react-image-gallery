const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const port = process.env.envPORT || 3000;

const TARGET_ENV = process.env.npm_lifecycle_event === 'build' ? 'production' : 'development';

if(TARGET_ENV === 'development') {
	console.log('Serving locally ...');
}

const VENDOR_LIBS = [
	'core-js', 'react', 'react-dom', 'prop-types'
];

module.exports = {
	entry: {
		bundle: './src/index.js',
		vendor: VENDOR_LIBS
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].[chunkhash:8].js'
	},
	module: {
		rules: [
			{
				test: /\.js?/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env', 'stage-1', 'stage-2', 'jest', 'react']
					}
				},
				exclude: /node_modules/,
			},
			{
				test: /\.scss$/,
				use: [{
					loader: 'style-loader'
				}, {
					loader: 'css-loader'
				}, {
					loader: 'postcss-loader'
				}, {
					loader: 'sass-loader'
				}],
			},
			{
				test: /\.(jpg|png|gif|svg|pdf|ico)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 100000
						},
					},
				]
			},
		]
	},
	plugins: [
		new htmlWebpackPlugin({
			template: 'src/index.html',
			favicon: 'src/favicon.ico',
			inject: true
		}),
		new webpack.NamedModulesPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: Infinity
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'runtime'
		}),
		new webpack.DefinePlugin({
			DEV: true
		})
	],
	devtool: 'eval-source-map',
	devServer: {
		// means that  a script will be inserted in your bundle to take care of live reloading, and build messages will appear in the browser console.
		inline: true,
		stats: 'minimal',
		open: true, // open default browser while launching
		contentBase: './src/',
		historyApiFallback: true, // means the index.html page will likely have to be served in place of any 404 responses. Fallback for SPAs.
		port: port
	},
};

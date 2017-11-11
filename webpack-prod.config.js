const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

const TARGET_ENV = process.env.npm_lifecycle_event === 'build' ? 'production' : 'development';

if(TARGET_ENV === 'production') {
	console.log('Serving for production ...');
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
		filename: 'scripts/[name]-[chunkhash:8].js'
	},
	module: {
		rules: [
			{
				test: /\.js?/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env', 'react', 'stage-1', 'stage-2', 'jest']
					}
				},
				exclude: /node_modules/
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [{
						loader: 'css-loader'
					}, {
						loader: 'postcss-loader'
					}, {
						loader: 'sass-loader'
					}],
				}),
			},
			{
				test: /\.(jpg|png|gif|svg|pdf|ico)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[path][name]-[hash:8].[ext]'
						},
					},
				]
			},
		]
	},
	stats: {
		chunks: true,
		modules: false
	},
	plugins: [
		new htmlWebpackPlugin({
			template: 'src/index.html',
			favicon: 'src/favicon.ico',
			inject: true
		}),
		new webpack.HashedModuleIdsPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: Infinity
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'runtime'
		}),
		new ExtractTextPlugin('style/style-[contenthash:8].css'),
		new OptimizeCSSAssetsPlugin({
			assetNameRegExp: /\.optimize\.css$/g,
			cssProcessor: require('cssnano'),
			cssProcessorOptions: { discardComments: {removeAll: true} },
			canPrint: true
		}),
		new webpack.DefinePlugin({
			DEV: false,
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			}
		}),
		new ImageminPlugin({
			disable: false,
			jpegtran: {
				progressive: false
			},
		}),
		new UglifyJSPlugin({
			sourceMap: true
		})
	],
	devtool: 'source-map',
};

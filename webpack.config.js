const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (_, argv) => 
{
	console.log(`Building in ${argv.mode} mode.\n`);
	return {
		mode: argv.mode,
		entry: {	
			index: ["./src/main.ts"]
		},
		output: {
			filename: "[name].js",
			path: path.resolve(__dirname, "dist"),
		},
		resolve: {
			modules: ["src", "node_modules"],
			alias: {
				assets: path.resolve(__dirname, "assets")
			},
			extensions: [ ".tsx", ".jsx", ".ts", ".js" ],
		},
		devServer: {
			contentBase: path.join(__dirname, "dist"),
			watchContentBase: true,
			compress: true,
			transportMode: "ws",
			port: 3000,
			hot: true,
		},
		plugins: [
			new CleanWebpackPlugin({
				cleanStaleWebpackAssets: false,
			}),
			new MiniCssExtractPlugin({
				filename: "[name].css",
				chunkFilename: "[id].css",
			}),
			...["index"].map(html => new HtmlWebpackPlugin({
				filename: `${html}.html`,
				chunks: [html],
				inject: true,
				favicon: "",
				template: `public/${html}.html`,
				minify: {
					collapseWhitespace: true,
					removeComments: true,
					removeRedundantAttributes: true,
					removeScriptTypeAttributes: true,
					removeStyleLinkTypeAttributes: true,
					useShortDoctype: true
				}
			})),
		],
		module: {
			rules: [
				{	// typescript babel
					test: /\.(ts|tsx)$/,
					exclude: /(node_modules|dist)/,
					loader: "babel-loader",
				},
				{	// eslint typescript
					enforce: "pre",
					test: /\.(ts|tsx)$/,
					exclude: /(node_modules|dist)/,
					loader: "eslint-loader"
				},
				{	// file loader
					test: /\.(png|jpe?g|gif|svg|webp|mp3|wav)$/i,
					loader: "file-loader"
				},
				{	// font loader
					test: /\.(woff|woff2|eot|ttf|otf)$/,
					use: "file-loader"
				},
				{	// html loader
					test: /\.html$/i,
					loader: "html-loader",
				},
				{	// css extract
					test: /\.s[ac]ss|css$/i,
					use: [
						{ 
							loader: argv.mode === "development" 
								? "style-loader" : MiniCssExtractPlugin.loader,
						},
						{
							loader: "css-loader", 
							options: {
								sourceMap: true,
							}
						},
					]
				}
			]
		}
	};	
};

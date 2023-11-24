  const config = {
	mode: 'production',
	entry: {
		index: './src/js/index.js',//при добав нов,стр указіваем и сдесь путь
		 //contacts: './src/js/contacts.js',
		// about: './src/js/about.js',
	},
	output: {
		filename: '[name].bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
};

 export default config;
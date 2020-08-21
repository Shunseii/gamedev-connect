module.exports = {
	purge: [
		'src/**/*.js',
		'src/**/*.jsx',
		'src/**/*.ts',
		'src/**/*.tsx',
		'public/**/*.html'
	],
	theme: {
		extend: {	
			height: {
				'1/5': '20%',
				'2/5': '40%',
				'3/5': '60%',
				'4/5': '80%',
				'fit': 'fit-content'
			},
			width: {
				'fit': 'fit-content'
			}
		}
	},
	variants: {},
	plugins: [
		require('@tailwindcss/typography')
	]
};

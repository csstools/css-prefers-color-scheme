import babel from 'rollup-plugin-babel';

export default {
	input: 'codepen.js',
	output: [
		{ file: 'codepen.bundle.js', format: 'cjs', sourcemap: 'inline' }
	],
	plugins: [
		babel({
			externalHelpers: false,
			runtimeHelpers: false,
			presets: [
				[
					'@babel/preset-env'
				]
			]
		})
	]
};

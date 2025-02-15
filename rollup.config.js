import { terser } from "rollup-plugin-terser";

export default [
	{
		input: 'src/index.js',
		output: [
			{ file: 'dist/index.js' },
			{ file: 'dist/index.min.js', plugins: [terser()] }
		]
	}
]
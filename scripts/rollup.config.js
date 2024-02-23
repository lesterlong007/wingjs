import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import clear from 'rollup-plugin-clear';
// import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: 'dist/umd/index.js',
      format: 'umd',
      name: 'WingJS',
    },
    {
      file: 'dist/es/index.js',
      format: 'es'
    }
  ],
  plugins: [
    clear({
      targets: ['dist'],
      watch: true,
    }),
    typescript({
      tsconfig: './tsconfig.json'
    }),
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    }),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      presets: ['@babel/preset-env'],
      exclude: ['node_modules/**']
    }),
    // terser()
  ]
};

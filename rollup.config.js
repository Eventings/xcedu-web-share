// rollup.config.js
import resolve from '@rollup/plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import {terser} from 'rollup-plugin-terser'

export default {
  input: 'index.js',
  output: [{
    file: 'dist/xcedu-share.js',
    format: 'umd',
    name: 'XcShare'
  }, {
    file: 'dist/xcedu-share.min.js',
    format: 'umd',
    name: 'XcShare',
    plugins: [terser()]
  }],
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    })
  ]
}

import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';
import copy from 'rollup-plugin-copy';

export default [
  {
    input: 'src/Home-Assistant-Mail-And-Packages-Custom-Card.ts',
    output: {
      dir: 'dist',
      format: 'es',
    },
    plugins: [
      copy({
        targets: [{ src: 'src/img/', dest: 'dist/' }],
      }),
      nodeResolve(),
      commonjs(),
      typescript(),
      json(),
      terser(),
    ],
  },
];

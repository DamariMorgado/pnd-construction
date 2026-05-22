import terser from '@rollup/plugin-terser';

const input = {
  index: 'src/main.jsx',
  // add cli only if file exists:
  // cli: 'src/cli.js',
};

export default [
  {
    input,
    output: [
      {
        dir: 'dist',
        format: 'esm',
        entryFileNames: '[name].js',
        sourcemap: true,
      },
      {
        dir: 'dist',
        format: 'cjs',
        entryFileNames: '[name].cjs',
        exports: 'named',
        sourcemap: true,
      },
    ],
    plugins: [terser()],
  },
];

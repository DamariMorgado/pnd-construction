import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

const input = 'src/index.ts';

export default {
  input,
  output: [
    {
      file: 'dist/index.js',
      format: 'esm',
      sourcemap: true,
    },
    {
      file: 'dist/index.cjs',
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
    },
  ],
  plugins: [
    typescript({
      tsconfig: false,
      sourceMap: true,
      declaration: true,
      declarationMap: true,
      declarationDir: 'dist',
      rootDir: 'src',
      outDir: 'dist',
    }),
    terser(),
  ],
};

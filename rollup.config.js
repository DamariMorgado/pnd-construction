import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/main.jsx",
  output: [
    { file: "dist/index.cjs", format: "cjs", sourcemap: true },
    { file: "dist/index.js", format: "esm", sourcemap: true },
  ],
  plugins: [
    peerDepsExternal(),
    resolve({ extensions: [".js", ".jsx"] }),
    postcss(),
    commonjs(),
    babel({
      babelHelpers: "bundled",
      extensions: [".js", ".jsx"],
      exclude: "node_modules/**",
      presets: ["@babel/preset-react"],
    }),
    terser(),
  ],
  external: ["react", "react-dom"],
};

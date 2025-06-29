import { type Options, defineConfig } from 'tsup'

const commons: Options = {
  minify: false,
  sourcemap: true,
  dts: true,
  clean: true,
  target: 'es2018',
  format: ['esm', 'cjs'],
}

export default defineConfig([
  {
    ...commons,
    entryPoints: ['src/index.ts'],
    outDir: 'build',
  },
])

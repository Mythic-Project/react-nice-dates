import { type Options, defineConfig } from 'tsup'
import browserslist from 'browserslist'
import { resolveToEsbuildTarget } from 'esbuild-plugin-browserslist'

const target = resolveToEsbuildTarget(browserslist(), {
  printUnknownTargets: false
})

const commons: Options = {
  minify: true,
  sourcemap: true,
  dts: true,
  clean: false,
  target,
  format: ['esm', 'cjs', 'iife']
}

export default defineConfig([
  {
    ...commons,
    entryPoints: ['src/index.ts'],
    outDir: 'build',
    tsconfig: 'tsconfig.build.json'
  }
])

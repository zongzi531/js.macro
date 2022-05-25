import type { Options } from 'tsup'

export const tsup: Options = {
  entryPoints: ['src/*.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
}

import {compile, compileSync} from './compile.js'
import {run, runSync} from './run.js'
import {resolveEvaluateOptions} from './util/resolve-evaluate-options.js'

/**
 * @typedef {import('vfile').VFileCompatible} VFileCompatible
 * @typedef {import('./util/resolve-evaluate-options.js').EvaluateOptions} EvaluateOptions
 *
 * @typedef {{[name: string]: any}} ComponentMap
 * @typedef {{[props: string]: any, components?: ComponentMap}} MDXContentProps
 * @typedef {{[exports: string]: unknown, default: (props: MDXContentProps) => any}} ExportMap
 */

/**
 * Evaluate MDX.
 *
 * @param {VFileCompatible} vfileCompatible MDX document to parse (`string`, `Buffer`, `vfile`, anything that can be given to `vfile`)
 * @param {EvaluateOptions} evaluateOptions
 * @return {Promise<ExportMap>}
 */
export async function evaluate(vfileCompatible, evaluateOptions) {
  var {compiletime, runtime} = resolveEvaluateOptions(evaluateOptions)
  // V8 on Erbium.
  /* c8 ignore next 2 */
  return run(await compile(vfileCompatible, compiletime), runtime)
}

/**
 * Synchronously evaluate MDX.
 *
 * @param {VFileCompatible} vfileCompatible MDX document to parse (`string`, `Buffer`, `vfile`, anything that can be given to `vfile`)
 * @param {EvaluateOptions} evaluateOptions
 * @return {ExportMap}
 */
export function evaluateSync(vfileCompatible, evaluateOptions) {
  var {compiletime, runtime} = resolveEvaluateOptions(evaluateOptions)
  return runSync(compileSync(vfileCompatible, compiletime), runtime)
}

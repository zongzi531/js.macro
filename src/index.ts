import { createMacro } from 'babel-plugin-macros'
import transformDefine from './transforms/define'

export default createMacro(({ references, state, babel }) => {
  transformDefine(references.define, state, babel)
})

export declare const define: Function
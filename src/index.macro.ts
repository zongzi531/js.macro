import { createMacro } from 'babel-plugin-macros'
import define from './transforms/define'

export default createMacro(({ references, state, babel }) => {
  define(references.define, state, babel)
})

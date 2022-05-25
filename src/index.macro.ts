import { createMacro } from 'babel-plugin-macros'

export default createMacro(({ references, state, babel }) => {
  console.log(references, state, babel)
})

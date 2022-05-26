import * as Babel from '@babel/core'
import * as t from '@babel/types'
import MagicString from 'magic-string'

const symbolMap: Record<string, 'const'> = {
  '@': 'const',
}

export default (references: Babel.NodePath[] | undefined, state: Babel.PluginPass, babel: typeof Babel) => {
  if (Array.isArray(references)) {
    references.forEach((reference, index) => {
      if (t.isTaggedTemplateExpression(reference.parentPath?.node)) {
        const quasi = reference.parentPath?.node.quasi.quasis[0]
        const vds: Array<t.VariableDeclaration> = []
        if (quasi) {
          const ms = new MagicString(quasi.value.raw)
          ms.replace(/(@)([a-zA-z_]+)(:)(\S+);/g, (_, symbol, name, equal, value) => {
            vds.push(t.variableDeclaration(symbolMap[symbol], [t.variableDeclarator(t.identifier(name), t.identifier(value))]))
            return _
          })
        }
        reference.parentPath?.replaceWithMultiple(vds)
      }
    })
  }
}

import * as Babel from '@babel/core'
import * as t from '@babel/types'

const CONST_SYMBOL = '@'
const CONST_NAME_REGEXP = /(@)([a-zA-z_]+)(:)/
const VALUE_REGEXP = /(:)(\S+);/

type DefineArray = [t.VariableDeclaration['kind'], string | any, string | any]



const getCurrentStacksIndex = (defineStacks: Array<DefineArray>, loc = 0): number => {
  for (const index in defineStacks) {
    if (!defineStacks[index][loc]) {
      return Number(index)
    }
  }
  return defineStacks.length
}

const getCurrentInsertIndex = (defineStacks: Array<DefineArray>) => {
  for (const index in defineStacks) {
    if (!defineStacks[index][0]) {
      throw new Error('Error: Not find @.')
    }
    if (!defineStacks[index][1]) {
      return { index: Number(index), insert: 1 }
    }
    if (!defineStacks[index][2]) {
      return { index: Number(index), insert: 2 }
    }
  }
  throw new Error('Error: Not find @.')
}

export default (references: Babel.NodePath[] | undefined, state: Babel.PluginPass, babel: typeof Babel) => {
  if (Array.isArray(references)) {
    const defineStacks: Array<DefineArray> = []
    references.forEach((reference, index) => {
      if (t.isTaggedTemplateExpression(reference.parentPath?.node)) {
        const node = reference.parentPath?.node
        if (node) {
          const vds: Array<t.VariableDeclaration> = []
          const { expressions, quasis } = node.quasi
          quasis.forEach((quasi, index) => {
            const { raw } = quasi.value
            const expression = expressions[index]
            let anchor = 0
            let stacksIndex = getCurrentStacksIndex(defineStacks)

            // Push define to stacks
            while (anchor < raw.length) {
              const csi = raw.indexOf(CONST_SYMBOL, anchor + 1)
              if (csi === -1) {
                anchor = raw.length
              } else {
                defineStacks[stacksIndex] ??= [] as unknown as DefineArray
                defineStacks[stacksIndex][0] = 'const'
                anchor = csi
              }

              if (anchor !== raw.length) {
                const behindStr = raw.slice(anchor - 1, raw.length)
                // Push define name
                const name = behindStr.match(CONST_NAME_REGEXP)?.[2]
                if (name) {
                  defineStacks[stacksIndex] ??= [] as unknown as DefineArray
                  defineStacks[stacksIndex][1] = name
                }
                // Push define value
                const value = behindStr.match(VALUE_REGEXP)?.[2]
                if (value) {
                  defineStacks[stacksIndex] ??= [] as unknown as DefineArray
                  defineStacks[stacksIndex][2] = value
                }
              }

              stacksIndex++
            }

            if (t.isLiteral(expression) || t.isIdentifier(expression)) {
              const { index, insert } = getCurrentInsertIndex(defineStacks)
              defineStacks[index][insert] = expression
            }
          })

          // Check Define Stacks
          defineStacks.forEach((stack) => {
            if (stack.length !== 3) {
              throw new Error('Error: define failed.')
            }
          })

          defineStacks.forEach(([c, n, v]) => {
            if (typeof n === 'string') {
              n = t.identifier(n)
            }
            if (typeof v === 'string') {
              v = t.identifier(v)
            }
            vds.push(t.variableDeclaration(c, [t.variableDeclarator(n, v)]))
          })

          if (vds.length > 0) {
            reference.parentPath?.replaceWithMultiple(vds)
          }
        }
      }
    })
  }
}

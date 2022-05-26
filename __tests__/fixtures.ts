import path from 'path'
import plugin from 'babel-plugin-macros'
import tester from 'babel-plugin-tester'

tester({
  plugin,
  pluginName: '@zong/js.macro',
  fixtures: path.join(__dirname, 'fixtures')
})

// Copied from https://github.com/vuejs/vue/blob/0603ff695d2f41286239298210113cbe2b209e28/src/compiler/helpers.js
function addProp (el, name, value, range) {
  (el.props || (el.props = [])).push(rangeSetItem({ name, value }, range))
  el.plain = false
}

function rangeSetItem (item, range) {
  if (range) {
    if (range.start != null) {
      item.start = range.start
    }
    if (range.end != null) {
      item.end = range.end
    }
  }
  return item
}

// TODO: Extract to a separate package
const vtDirective = function (el, dir) {
  // Preserve data from v-bind directive
  const previousWrapData = el.wrapData
  el.wrapData = (code) => {
    if (previousWrapData) {
      code = previousWrapData(code)
    }

    return `_b(${code},'${el.tag}',$ta('${dir.arg}'),false)`
  }

  addProp(el, 'textContent', `_s($t('${dir.arg}'))`, dir)
}

export default function FluentVueModule () {
  this.extendBuild(config => {
    config.module = config.module || { rules: [] }

    // Allow importing ftl files as strings
    config.module.rules.push({
      test: /\.ftl$/,
      loader: require.resolve('raw-loader')
    })

    // Add support for SFC custom blocks
    config.module.rules.push({
      resourceQuery: /blockType=fluent/,
      type: 'javascript/auto',
      loader: require.resolve('fluent-vue-loader')
    })

    const vueRule = config.module.rules.find(rule => rule.loader?.toString().includes('vue-loader'))

    if (!vueRule) {
      console.error('Could not find vue-loader rule in Webpack config')
      return
    }

    vueRule.options = vueRule.options || {}
    vueRule.options.compilerOptions = options.compilerOptions || {}
    vueRule.options.compilerOptions.directives = vueRule.options.compilerOptions.directives || {}
    vueRule.options.compilerOptions.directives.t = vtDirective
  })
}

module.exports.meta = require('../package.json')

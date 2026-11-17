'use strict'

const BUTTON_COMPONENTS = ['button', 'Button']
const TABLE_COMPONENTS = ['table', 'Table', 'TableWithFilterBanner']
const SELECT_COMPONENTS = ['select', 'Select']
const DRAWER_COMPONENTS = ['Drawer']
const INPUT_COMPONENTS = ['input', 'Input']

function validateIdSuffix(context, node, suffix, label) {
  const idAttr = node.attributes.find(
    (attr) => attr.type === 'JSXAttribute' && attr.name && attr.name.name === 'id'
  )

  if (!idAttr) return

  const idValue =
    idAttr.value && idAttr.value.type === 'Literal'
      ? idAttr.value.value
      : idAttr.value && idAttr.value.type === 'JSXExpressionContainer' && idAttr.value.expression.type === 'Literal'
        ? idAttr.value.expression.value
        : idAttr.value && idAttr.value.type === 'JSXExpressionContainer' && idAttr.value.expression.type === 'TemplateLiteral'
          ? idAttr.value.expression.quasis[idAttr.value.expression.quasis.length - 1].value.raw
          : null
  if (!idValue) {
    return
  }
  if (!idValue.endsWith(suffix)) {
    context.report({ node, message: `${label} id "${idValue}" must end with "${suffix}".` })
  }
}

function createRule(defaultComponents, suffix) {
  return {
    meta: {
      type: 'problem',
      docs: { description: `Component must have an id ending with "${suffix}"` },
      schema: [{ type: 'object', properties: { components: { type: 'array', items: { type: 'string' } } }, additionalProperties: false }],
    },
    create(context) {
      const options = context.options[0] || {}
      const components = options.components ? [...defaultComponents, ...options.components] : defaultComponents
      return {
        JSXOpeningElement(node) {
          if (!components.includes(node.name.name)) return
          validateIdSuffix(context, node, suffix, node.name.name)
        },
      }
    },
  }
}

module.exports = {
  'button-id-format': createRule(BUTTON_COMPONENTS, '-btn'),
  'table-id-format': createRule(TABLE_COMPONENTS, '-tbl'),
  'select-id-format': createRule(SELECT_COMPONENTS, '-sel'),
  'drawer-id-format': createRule(DRAWER_COMPONENTS, '-drawer'),
  'input-id-format': createRule(INPUT_COMPONENTS, '-inp'),
}

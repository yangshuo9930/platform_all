import { CSSProperties, VNodeChild } from 'vue'
import { createTypes, toValidableType, VueTypesInterface, VueTypeValidableDef } from 'vue-types'

export type VueNode = VNodeChild | JSX.Element

type PropTypes = VueTypesInterface & {
  readonly style: VueTypeValidableDef<CSSProperties>
  readonly VNodeChild: VueTypeValidableDef<VueNode>
}

const projectTypes = createTypes({
  func: undefined,
  bool: undefined,
  string: undefined,
  number: undefined,
  object: undefined,
  integer: undefined
}) as PropTypes

// projectTypes.extend([
//   {
//     name: 'style',
//     getter: true,
//     type: [String, Object],
//     default: undefined
//   },
//   {
//     name: 'VNodeChild',
//     getter: true,
//     type: undefined
//   }
// ])
// export { propTypes }

// 去除警告propType升级5.0后的语法废弃警告: 在 ES6+ 中扩展命名空间验证器
// https://dwightjack.github.io/vue-types/advanced/extending-vue-types.html#extending-namespaced-validators-in-es6
class propTypes extends projectTypes {
  static get style() {
    return toValidableType('style', {
      type: [String, Object],
      default: undefined
    })
  }
  static get VNodeChild() {
    return toValidableType('VNodeChild', {
      type: undefined
    })
  }
}

export { propTypes }

// import React, { Component } from 'react'
// import MouseCom from './components/MouseCom'
// import Image from './components/Image'
// import Position from './components/Position'
// import Scroll from './components/Scroll'

// import HPosition from './hoc/Position'
// import withMouse from './hoc/withMouse'
// const PositionWith = withMouse(HPosition)

// export default class Not extends Component {
//   render() {
//     return (
//       <div>
//         {/* HOC */}
//         <PositionWith></PositionWith>
//         <hr />
//         {/* render props */}
//         <MouseCom render={(state) => <Image {...state}></Image>}></MouseCom>
//         <Scroll>
//           {(scrollState) => (
//             <MouseCom
//               render={(state) => <Position {...state} {...scrollState}></Position>}
//             ></MouseCom>
//           )}
//         </Scroll>
//         <Scroll>
//           {(state) => (
//             <div
//               style={{
//                 width: 5000,
//                 height: 5000,
//                 overflow: 'scroll',
//               }}
//             >
//               <hr />
//               <div>left: {state.left}</div>
//               <div>top: {state.top}</div>
//             </div>
//           )}
//         </Scroll>

//         {/* 性能优化 */}
//       </div>
//     )
//   }
// }

import React from 'react'

export default function Not() {
  return <div>index</div>
}

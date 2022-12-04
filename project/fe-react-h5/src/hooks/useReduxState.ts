// 使用reudx中数据
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// export default function useReduxState(
//   action: Function,
//   stateName: keyof RootState,
// ) {
//   const dispatch = useDispatch()

//   useEffect(() => {
//     dispatch(action())
//   }, [dispatch, action])

//   const state = useSelector((state: RootState) => state[stateName])

//   return state
// }

// 也可以使用泛型来指定stateName的类型
export default function useReduxState<T extends keyof RootState>(action: () => void, stateName: T) {
  const dispatch = useDispatch()

  // 每次组件渲染都会创建一个action,useEffect不断调用,所以这里使用useRef来保存action
  // 如果action是一个函数, 则会每次渲染都执行, 如果action是一个对象, 则只会执行一次
  // 让useEffect不在依赖action, 依赖ref对象

  const refAction = useRef(action)
  useEffect(() => {
    dispatch(refAction.current())
  }, [dispatch])

  const state = useSelector((state: RootState) => state[stateName])

  return state
}

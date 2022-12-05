// 排序算法

const r = [
  1, 3, 5, 7, 1, 3, 4, 5, 12, 1, 12, 3645, 6, 547, 5, 6, 7, 5, 2, 32, 87987, 456, 45, 43, 423, 4,
  23, 14, 34, 5, 435, 57, 65876897, 987, 987, 9, 879, 90, 97078, 087, 9, 857, 4
]

function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let exchange = false // 交换标志
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        // 相邻元素两两对比
        // 元素交换
        /** 1.使用中间变量 **/
        // let temp = arr[j + 1]
        // arr[j + 1] = arr[j]
        // arr[j] = temp
        /** 2.适用纯数字的数组排序 **/
        // arr[j] = arr[j] + arr[j + 1]
        // arr[j + 1] = arr[j] - arr[j + 1]
        // arr[j] -= arr[j + 1]
        /** 3.使用es6解构赋值 **/
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        exchange = true //
      }
    }
    if (!exchange) {
      // 若本趟排序未发生交换，提前终止算法
      break
    }
  }
  return arr
}

console.time('first')
console.log(bubbleSort(r))
console.timeEnd('first')

function selectionSort(arr) {
  let len = arr.length
  let minIndex, temp
  for (let i = 0; i < len - 1; i++) {
    minIndex = i
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        // 寻找最小的数
        minIndex = j // 将最小数的索引保存
      }
    }
    // temp = arr[i]
    // arr[i] = arr[minIndex]
    // arr[minIndex] = temp
    ;[arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
  }
  return arr
}

console.time('1')
console.log(selectionSort(r))
console.timeEnd('1')

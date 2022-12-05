// 双重for循环暴力破解
const twoSum = (nums, target) => {
  const len = nums.length
  for (let i = 0; i < len; i++) {
    // 因为同一元素不允许重复出现，所以从i的下一位开始遍历
    for (let j = i + 1; j < len; j++) {
      // find the answer, return
      if (nums[i] + nums[j] === target) {
        return [i, j]
      }
    }
  }
}

// Map优化
let twoSum1 = function (nums, target) {
  const map = new Map()
  for (let i = 0, len = nums.length; i < len; i++) {
    // 一层遍历，用 target 减去每一项，在 map 的 key 中寻找
    if (map.has(target - nums[i])) {
      // 存在则返回结果
      return [map.get(target - nums[i]), i]
    }
    // 不存在，则设置 map key 和 val
    map.set(nums[i], i)
  }
  return []
}

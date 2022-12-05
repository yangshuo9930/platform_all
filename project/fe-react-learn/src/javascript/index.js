import React from 'react'

export default function JavaScript () {
  return <div>JavaScript</div>
}

console.log('js代码执行===>')

// 实现 a == 1 == 2 == 3
let value = 1

Object.defineProperty(window, 'a', {
  get () {
    return value++
  },
})

console.log(window.a === 1 && window.a === 2 && window.a === 3, window.a)

// 函数属性
function fn () {
  console.log('fn函数执行')
}
fn.fn = function () {
  console.log('fn=>fn函数执行', this, this.property1)
}

fn.property1 = 1
fn.prototypeObj = {}

fn.fn()
// console.log(fn)

let arr = []
arr[0] = 0
arr[1] = 1

arr.foo = 'foo'
arr[3] = 3

console.log(arr, arr.length, arr.foo, arr[3])

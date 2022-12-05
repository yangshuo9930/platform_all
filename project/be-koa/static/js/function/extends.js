// 原型和原型链
// 构造函数都有一个prototype属性, 这个属性是它的原型对象, 称之为原型.
// 构造函数的实例有一个 __proto__ 属性, 指向构造函数的原型, 而原型对象本身也是一个实例对象, 也有__proto__属性, 这样一层层的链式形成原型链.

// 构造函数继承 => 原型链继承 => 组合继承 => 寄生式继承 => 寄生式组合继承 => Class继承

// 寄生式组合继承
function Super(name) {
  this.name = name
}

Super.prototype.sayHi = function () {
  console.log('hi', this.name)
}

function Sub(name, property) {
  Super.call(this, name) //  1. 借用构造函数继承
  this.property = property
}

Sub.prototype = Object.create(Super.prototype) // 2. 重写原型
Sub.prototype.constructor = Sub

Sub.prototype.sayName = function () {
  console.log(this.name)
}

// Class继承
class SuperClass {
  constructor(name) {
    this.name = name
  }
  sayHi() {
    console.log('hi', this.name)
  }
}

class SubClass extends SuperClass {
  constructor(name, property) {
    super(name)
    this.property = property
  }

  sayName() {
    console.log(this.name)
  }
}

document.querySelector('.extends').addEventListener('click', () => {
  const s = new Super('s')
  console.log('s', s)
  const xs = new Sub('s')
  console.log('xs', xs)

  const sc = new SuperClass('sc')
  console.log('sc', sc)
  const xsc = new SubClass('xsc')
  console.log('xsc', xsc)
})

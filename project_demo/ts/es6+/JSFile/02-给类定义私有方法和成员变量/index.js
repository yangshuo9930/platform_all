'use strict'
;(() => {
  class Person {
    name
    property
    constructor(name, property) {
      this.name = name
      this.property = property
    }
    color = ['black', 'white']
    #color = ['red']
    sayHi() {
      console.log('hi', this.name, this.color, this.#color)
    }
    sayColor() {
      console.log(this.color)
    }
  }
  let p = new Person('小王', 12)
  console.log(p) //  Person { name: '小王', property: 12 }
  // p.color color为私有属性, 只能类内部访问
  console.log(p.sayHi())
})()

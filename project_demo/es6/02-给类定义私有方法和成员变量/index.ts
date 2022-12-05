(() => {
  class Person {
    name: string
    property: any
    constructor(name: string, property: any) {
      this.name = name
      this.property = property
    }
    private color = ['black', 'white']
    #color = ['red'] // 冲突 ?? #color 和 color 
    sayHi () {
      console.log('hi', this.name, this.color, this.#color)
    }
    private sayColor () {
      console.log(this.color)
    }
  }

  let p = new Person('小王', 12)

  console.log(p) //  Person { name: '小王', property: 12 }
  // p.color color为私有属性, 只能类内部访问

  console.log(p.sayHi())
  // console.log(p.#color) //报错: SyntaxError: Private field '#color' must be declared in an enclosing class



})()
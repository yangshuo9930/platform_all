// es6
class Person {
  // es6: 通过构造函数声明类的成员
  constructor(name, property) {
    this.name = name
    this.property = property
  }
  // es13: 在ES13之前，我们只能在构造函数里面声明类的成员，而不能像其他大多数语言一样在类的最外层作用域里面声明成员
  color = ['black', 'white']
}
// es13
class Person1 {
  name = '人类'
  age = 18
}
let p = new Person('人族', 100)
let p1 = new Person1()
console.log(p, p1)

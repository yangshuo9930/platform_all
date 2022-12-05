// 在JS中，我们可以使用Object.prototype.hasOwnProperty()来检查某个对象自身是否拥有某个属性:
class Car {
  color = 'green';
  age = 2;
}

const car1 = new Car()

console.log(car.hasOwnProperty('age')) // true
console.log(car.hasOwnProperty('name')) // false


// 复制代码
// 上面的写法其实是有两个问题的。第一个问题是：Object.prototype.hasOwnProperty()这个方法是不受保护的，换句话来说就是它可以被某个类自定义的hasOwnProperty()方法覆盖掉，而自定义方法做的事情可能和Object.prototype.hasOwnProperty()做的事情完全不一样:
class Car {
  color = 'green';
  age = 2;

  // 你看这个方法就没有告诉我们这个类的对象是不是有某个属性
  hasOwnProperty () {
    return false
  }
}

const car = new Car()

console.log(car.hasOwnProperty('age')) // false
console.log(car.hasOwnProperty('name')) // false


// 复制代码
// 上面的写法第二个问题就是：当一个对象是通过Object.create(null)创建出来的具有null原型的对象时，你想在这个对象上面调用hasOwnProperty这个方法是会报错的:
const obj = Object.create(null)
obj.color = 'green'
obj.age = 2

// TypeError: obj.hasOwnProperty is not a function
console.log(obj.hasOwnProperty('color'))


// 复制代码
// 解决这个问题的一种办法就是调用Object.prototype.hasOwnProperty这个Function的call方法:
const obj = Object.create(null)
obj.color = 'green'
obj.age = 2
obj.hasOwnProperty = () => false

Object.prototype.hasOwnProperty.call(obj, 'color')


// 复制代码
// 当hasOwnProperty需要被多次调用的时候，我们可以通过将这部分逻辑抽象成一个方法来减少重复的代码:
function objHasOwnProp (obj, propertyKey) {
  return Object.prototype.hasOwnProperty.call(obj, propertyKey)
}

const obj = Object.create(null)
obj.color = 'green'
obj.age = 2
obj.hasOwnProperty = () => false

console.log(objHasOwnProp(obj, 'color')) // true
console.log(objHasOwnProp(obj, 'name')) // false


// 复制代码
// 封装是封装了，不过看着好麻烦有木有？所以ES13诞生了一个全新的Object.hasOwn()函数来帮我们做上面这些重复的工作。这个新的内置函数接收两个参数，一个是对象，一个是属性，如果这个对象本身就有这个属性的话，这个函数就会返回true，否则就返回false：
const obj = Object.create(null)
obj.color = 'green'
obj.age = 2
obj.hasOwnProperty = () => false

console.log(Object.hasOwn(obj, 'color')) // true
console.log(Object.hasOwn(obj, 'name')) // false

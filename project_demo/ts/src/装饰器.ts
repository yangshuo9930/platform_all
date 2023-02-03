export interface Person {
  name: string
  age: string
}
// 1. 普通装饰器
function Enhancer(target: any) {
  target.prototype.name = '金色小芝麻'
  target.prototype.age = '18'
}
@Enhancer
export class Person {
  constructor() {}
}

// 2. 装饰器工厂: 利用函数柯里化解决传参问题， 向装饰器传入一些参数，也可以叫 参数注解
function Enhancer2(name: string) {
  return function enhancer(target: any) {
    // 这个 name 就是装饰器的元数据，外界传递进来的参数
    target.prototype.name = name
    target.prototype.age = 18
  }
}

export interface Animal {
  name: string
  age: string
}
@Enhancer2('小太阳')
export class Animal {
  constructor() {}
}

console.log(new Animal().name)

// import 'reflect-metadata'

// const MEHTOD_METADATA = 'method'
// const PATH_MEDADATA = 'path'
// /**
//  * Controller 装饰器
//  * @param path
//  * @returns
//  */
// function Controller(path: string): ClassDecorator {
//   return function (target) {
//     Reflect.defineMetadata(PATH_MEDADATA, path, target)
//   }
// }

// /**
//  * Methods 装饰器
//  * @param method
//  * @returns
//  */
// function createMappingDecorator(method: string) {
//   return function (path: string): MethodDecorator {
//     return function (target: Object, key: string | symbol, descriptor: PropertyDescriptor) {
//       Reflect.defineMetadata(MEHTOD_METADATA, method, descriptor.value)
//       Reflect.defineMetadata(PATH_MEDADATA, path, descriptor.value)
//     }
//   }
// }

// function isConstructor(item: string) {
//   return item === 'constructor'
// }

// function isFunction(fn: unknown) {
//   return typeof fn === 'function'
// }

// function mapRoute(instance: Object) {
//   const prototype = Object.getPrototypeOf(instance)
//   const methodsNames = Object.getOwnPropertyNames(prototype).filter((item: string) => {
//     return !isConstructor(item) && isFunction(prototype[item])
//   })

//   return methodsNames.map((name: string) => {
//     const fn: Function = prototype[name]
//     const route: string = Reflect.getMetadata(PATH_MEDADATA, fn)
//     const method: string = Reflect.getMetadata(MEHTOD_METADATA, fn)

//     return {
//       route,
//       method,
//       fn,
//       name
//     }
//   })
// }
// const Get = createMappingDecorator('Get')
// const Post = createMappingDecorator('Post')

// @Controller('/test')
// class SomeClass {
//   @Get('/a')
//   someMethod(): string {
//     return 'Hello World'
//   }

//   @Post('/b')
//   somePostMethod(): string {
//     return 'Post'
//   }
// }

// const routes = mapRoute(new SomeClass())
// console.log(routes)

class A {
  name: string
  constructor(name: string) {
    this.name = name
  }
}

class C {
  c: string
  constructor(name: string) {
    this.c = name
  }
}

class Ioc {
  mo: object
  constructor() {
    this.mo = {}
  }
  privade(key: string, val: any) {
    this.mo[key] = val
  }
  get(key) {
    return this.mo[key]
  }
}

const mo = new Ioc()
mo.privade('a', new A('小王'))

mo.privade('c', new C('www'))

class B {
  a: any
  c: any
  constructor() {
    this.a = mo.get('a')
    this.c = mo.get('c')
  }
}

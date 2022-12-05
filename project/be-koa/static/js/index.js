// EST2022
// 1.

class Foo {
  #iteration = 0

  increment() {
    this.#iteration++
  }

  logIteration() {
    console.log(this.#iteration)
  }
}

const xf = new Foo()

console.log(xf)

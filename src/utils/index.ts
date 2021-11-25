interface pasreType {

}

export const customBack = {
  parse: (str: string) => {
    // let newStr
    if (str) {
      try {
        str = JSON.parse(str)  // 先来骗一骗编译器
      }
      catch (err) {
        console.log('反序列化失败', err);
      }
    }
    return str || undefined
  },
  stringify: (arr: any) => {
    try {
      arr = JSON.stringify(arr) || '{}'
    }
    catch (err) {
      console.log('序列化失败', err);
    }
    return arr
  }
}

// 在类型不明确的时候使用泛型
function fn<T>(a: T): T {
  return a
}

// 使用时我们可以直接使用，由ts自己来推断，但推断具有局限性
let les = fn(10)
// 最好还是自己手动指定
let result = fn<number>(10)
let result1 = fn<string>('123')

// 多个泛型
function fn2<T, K>(a: T, b: K) {
  return a
}

let res2 = fn2<string, number>('52', 1)

// 必须包含的属性
interface Inter {
  length: number
}

function fn3<T extends Inter>(a: T): number {
  return a.length
}

let a = { length: 10 }
let rrr = fn3(a)

// 泛型用于类
class Myclass<T> {
  name: T;
  constructor(name: T) {
    this.name = name
  }
}

let myName = new Myclass<string>('牛恒')
let myname2 = new Myclass<number>(50)

const fn4 = <T>(num: T): T => {
  return num
}

let exeit = fn4<string>('10')
let exitsa = fn4<number>(10)
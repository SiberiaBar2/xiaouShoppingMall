import React from 'react'
import axios from 'axios'

interface resType {
  data?: Object
}

interface optionsType {
  url?: string,
  method?: string
  timeout?: number,
  params: object,
  data?: object,
  headers?: object
}
export const baseApi = ({ method = 'get', headers = {}, params = {}, url = '', path = '' }) => {
  let promise = new Promise((reslove, reject) => {
    let option = {
      url: path,
      method,
      timeout: 120000
    }

    let options = option as optionsType

    if (method === 'get') {
      options.params = params
      // (<any>Object).defineproperty(options, 'params', {
      //   value: params
      // })
    } else if (['post', 'put'].includes(method)) {
      options.data = params
      // delete 
      // (<any>Object).defineproperty(options, 'data', {
      //   value: params
      // })
    }

    if ((<any>headers)['content-type']) {
      (<any>headers)['content-type'] = 'application/x-www-form-urlencoded'
    }

    options.headers = headers || {}
    // (<any>Object).defineproperty(options, 'headers', {
    //   value: params
    // })

    console.log('options', options);
    axios(options)
      .then((res: resType) => {
        console.log('看返回值', res);
        reslove(res.data)
      })
      .catch((err: any) => {
        reject(err)
      })
  })
  return promise
}

// 三个async无用，但是第一个axios用promise 来reslove 和 reject 返回值， 后面两个调用函数使用async await就能拿到值了
// if (process.env.NODE_ENV === 'development') {
//   axios.defaults.baseURL = '';
// } else if (process.env.NODE_ENV === 'production') {  //生产坏境
//   axios.defaults.baseURL = 'http://localhost:3000'
// }


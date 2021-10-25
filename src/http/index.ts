
import React from 'react';
import axios from 'axios'
import { message } from 'antd';
import { useHistory } from "react-router-dom";

// interface token
interface resType {
  data?: Object
}

interface headersType {
  header: object,
  authorization: string
}
interface optionsType {
  url: string,
  method: string
  timeout: number,
  params: object,
  data: object,
  headers: headersType ,
  authorization: string
}

interface tokenType {
  token: string
}
interface requestInterceptorType {
  headers?: tokenType
}

// 响应码类型断言
interface responseCode {
  code?: number
}
interface responseInterceptorType {
  data?: responseCode
}

interface baseApiType {
  // method: string,
  header?: object,
  // params: object,
  path?: string
}

// 若是给函数参数指定类型，那就成了强类型， 外部如果不传都会报错
export const BaseApi = ({ method = 'get', header = {}, params = {}, path = '' }) => {
  console.log('查看BaseApi', method, header, params);

  // let history = useHistory();
  let promise = new Promise((reslove, reject) => {
    let option = {
      url: path,
      method,
      timeout: 120000,
      headers:header, 
      authorization: ''
    }

    let options = option as optionsType

    if (method === 'get') {
      options.params = params
      // (<any>Object).defineproperty(options, 'params', {
      //   value: params
      // })
    } else if (['post', 'put'].includes(method)) {
      options.data = params
    }

    if ((<any>header)['Content-Type']) {
      // 为什么这里就变成 from data 数据格式了，表单无法提交
      // (<any>header)['content-type'] = 'application/x-www-form-urlencoded'
      (<any>header)['Content-Type'] = 'application/json'
    }
    // const userInfo = sessionStorage.getItem('userinfo') || '{}'
    // const userInfos = JSON.parse(userInfo) as tokenType
    // 将登录凭证通过自定义请求头发送给数据接口
    // options.headers.authorization = userInfos.token
    // options.headers.header = header
    // Object.defineProperty(options.headers, 'header', {
    //   value: header
    // })
    // Object.defineProperty(options.headers, 'authorization', { 
    //   value: userInfos.token
    // })
    console.log('options', options);

    // 暂时注释拦截器
    // axios.interceptors.request.use((config: requestInterceptorType) => {
      // const userInfo = sessionStorage.getItem('userinfo')
      // userInfo as tokenType
      // 既然 string | null 的值不能赋值给 string ，就先判断它有没有值
      // let conversionSession = userInfo && JSON.parse(userInfo)
      // console.log('userInfo', userInfo)
      // config.headers.userToken = userInfo.token
      // if (config !== null) {
      // config && config.headers && config.headers.userToken = conversionSession.token
      // }
      // 现在为什么 Object.defineProperty 不会报错了？？
      // 为什么米有为config 的headers属性定义类型也没有报错？
      // if(conversionSession){
      //   Object.defineProperty(config.headers, 'authorization', {
      //     value: conversionSession.token
      //   })
      //   console.log('config--->', config.headers);
      //   return config
      // }
    // })

    // axios.interceptors.response.use((config: responseInterceptorType) => {
    //   if (config.data) { // 对象可能未定义，那就就套两层判断！！
    //     if (config.data.code !== 200) {
    //       message.error('返回数据异常！', 3, () => {
    //         console.log('返回异常');
    //       })
    //     }
    //     if (config.data.code === 403) {
    //       message.error('请登录', 2, () => {
    //         console.log('重新登录');
    //       })
    //       // history.push('/login')
    //     }
    //     return config.data
    //   }
    // })

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


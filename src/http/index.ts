
import axios from 'axios'
import { message } from 'antd';
import { useHistory } from "react-router-dom";
interface headerConfig {
  authorization?: string,
  'Content-Type': string
}
interface UseConfig {
  [propname: string]: any
}
interface apiConfigTypes {
  method: string,
  header: headerConfig,
  params: any,
  path: string
}


interface OptionType {
  [propsname: string]: any
}
// 若是给函数参数指定类型，那就成了强类型， 外部如果不传都会报错
export const BaseApi = (props: apiConfigTypes) => {
  const {
    method = 'get',
    header,
    params,
    path = ''
  } = props

  let promise = new Promise((reslove, reject) => {
    let options = { // 这里还可以as interface
      url: path,
      method,
      timeout: 120000
    } as OptionType

    if (method === 'get') {
      options.params = params
    } else if (['post', 'put'].includes(method)) {
      options.data = params
    }

    // 请求拦截添加认证字符串
    axios.interceptors.request.use((config: any) => {
      if (config) {
        const userInfo = sessionStorage.getItem('userinfo') || '{}'
        console.log('JSON.parse(userInfo)', JSON.parse(userInfo));
        const ChangeSession = JSON.parse(userInfo) as UseConfig
        if (ChangeSession.token) { // 如果有token就添加自定义请求头，这为什么不报没有这个属性了 ?
          config.headers.authorization = ChangeSession.token
        }
        return config
      }
    })

    axios(options)
      .then((res: any) => {
        reslove(res.data)
      })
      .catch((err: any) => {
        reject(err)
      })
  })
  return promise
}



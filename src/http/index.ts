
import axios from 'axios'
import { message } from 'antd';
import { useHistory } from "react-router-dom";
import { customBack } from 'utils'
interface headerConfig {
  authorization?: string,
  'Content-Type': string
}
interface apiConfigTypes {
  method: string,
  header: headerConfig,
  params: any,
  path: string
}
interface optionKey extends apiConfigTypes {
  url: string,
  method: string,
  timeout: number,
  data: any
}

type info = {
  token: string
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
    // let options: OptionType = { // 这里还可以as interface
    //   url: path,
    //   method,
    //   timeout: 120000
    // }

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
    // let sessionInfo = sessionStorage.getItem('userinfo')
    // console.log('sessionStorage',sessionStorage.getItem('userinfo'),typeof sessionStorage.getItem('userinfo'));
    // if(sessionInfo){

    // }
    // 请求拦截添加认证字符串
    axios.interceptors.request.use((config: any) => {
      if (config) {
        // let value = sessionStorage.getItem('userinfo')
        // if(sessionInfo){
        const userInfo = customBack.parse(sessionStorage.getItem('userinfo') || '{}')
        if (userInfo) { config.headers.authorization = userInfo && userInfo.token }

        // }
        // const userInfo = customBack.parse<string>(sessionStorage.getItem('userinfo') || '{}')
        // config.headers.authorization = userInfo.token
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



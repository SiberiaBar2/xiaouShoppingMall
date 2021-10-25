// 
import { BaseApi } from 'http/index'

const merge = (option = {}, baseOption = {}) => {
  return Object.assign({}, option, baseOption)
}

const commonHeaders = () => {
  return { 'Content-Type': 'application/json' }
}

// 为什么接收参数那里是headers就可以，header就是对象？
export const userLogin = async (option: object) => {
  let res = await BaseApi(merge(option, {
    path: '/api/userlogin',
    method: 'post',
    header: commonHeaders()
  }))
  return res
}

export const menuList = async (option: object) => {
  const res = await BaseApi(merge(option, {
    path: '/api/menulist?istree=1',
    method: 'get',
    header: commonHeaders()
  }))
  console.log('res---->res', res);
  return res
}

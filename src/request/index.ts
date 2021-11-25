// 
import { BaseApi } from 'http/index'
// console.log('apiConfigTypes', apiConfigTypes);
interface options {
  params: any
}

const commonHeaders = () => {
  return { 'Content-Type': 'application/json' }
}

// 为什么接收参数那里是headers就可以，header就是对象？
export const userLogin = async (option: options) => {
  let res = await BaseApi({
    ...option,
    path: '/api/userlogin',
    method: 'post',
    header: commonHeaders()
  })
  return res
}

export const menuList = async (option: options) => {
  const res = await BaseApi({
    ...option,
    path: '/api/menulist?istree=1',
    method: 'get',
    header: commonHeaders()
  })
  console.log('res---->res', res);
  return res
}

// 
import { baseApi } from 'http/index'

const merge = (option = {}, baseOption = {}) => {
  return Object.assign({}, option, baseOption)
}

const commonHeaders = () => {
  return { 'content-type': 'application/json' }
}

export const userLogin = async (option: object) => {
  let res = await baseApi(merge(option, {
    path: '/api/userlogin',
    method: 'post',
    header: commonHeaders()
  }))
  console.log('res---->res', res);
  return res
}

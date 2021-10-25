import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button, Checkbox, message } from 'antd';
import { userLogin } from 'request'
import { useHistory } from "react-router-dom";
import { initMethod } from 'store/actions'

import cx from 'classnames'
import './index.css'

interface resLogin {
  code?: number,
  list?: object,
  msg?: string
}

interface loginType {
  initMethod?: any
}

const Login: React.FC<loginType> = ({
  initMethod
}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  let history = useHistory();
  console.log('history', history)
  console.log('initMethod----->', initMethod)
  const onFinish = async (values: any) => {
    console.log('Success:', values);
    const { username, password } = values
    let result = await userLogin({ params: { username, password } }) as resLogin
    console.log('result---->', result)
    if (result && result.code === 200) {
      // 为什么加了stringify 就不报错了
      sessionStorage.setItem('userinfo', JSON.stringify(result.list))
      console.log('result.list', result.list)
      message.success(result.msg, 1)
      let obj = {
        name: '哎呀',
        eqier: '什么呢'
      }
      let aaa = 100
      history.push(`/layout`, { state: aaa });
      initMethod(result.list)
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const userChange = (val: any) => {
    console.log('user', val.target.value)
    setUsername(val)
  }
  const passChange = (val: any) => {

    console.log('pass', val.target.value)
    setPassword(val)
  }
  return (
    <div className={cx('container')}>
      <div className={cx('loginCard')}>
        <Form
          name="basic"
          className={cx('from')}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input
              placeholder="请输入用户名"
              value={username}
              onChange={userChange}
            />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password
              placeholder="请输入密码"
              value={password}
              onChange={passChange}
            />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default connect(
  (state) => {
    console.log('高阶组件')
  },
  {
    initMethod
  })(Login)
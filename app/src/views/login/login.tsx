import React, { FunctionComponent } from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { withStore } from '@/core/store'

import './login.less'

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms))

const Login: FunctionComponent = (props: any) => {
  const { user, loginLoading, dispatch } = props

  const onFinish = async ({ username, password }: any) => {
    console.log(username, password)
    const queryData = { mvClientID: 'FIA0074', mvPassword: '123456' }
    dispatch({ type: 'CHANGE_LOGIN_LOADING', data: true })
    try {
      await sleep(10000)
      const res = await $api.queryLogin(queryData)
      dispatch({ type: 'LOGIN_SUCCESS', data: res })
    } catch (err) {
      dispatch({ type: 'LOGIN_FAILED', data: err.message })
    }
  }

  return (
    <div className="login flex column center" style={{ height: '100%' }}>
      <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={onFinish}>
        <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!' }]}>
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button" loading={loginLoading}>
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
      <pre>User: {JSON.stringify(user)}</pre>
      <pre>Loading: {JSON.stringify(loginLoading)}</pre>
    </div>
  )
}

export default withStore(['loginLoading', 'user', 'loginError'])(Login)

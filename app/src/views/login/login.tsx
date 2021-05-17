import React, { FunctionComponent } from 'react'
import { Form, Input, Button, Checkbox, message, Alert } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { withStore } from '@/core/store'

import './login.less'

const Login: FunctionComponent = (props: any) => {
  const { user, loginLoading, loginError, dispatch, history } = props

  const onFinish = async ({ username, password }: any) => {
    const queryData = { mvClientID: username, mvPassword: password }
    dispatch({ type: 'CHANGE_LOGIN_LOADING', data: true })
    try {
      const res = await $api.queryLogin(queryData)
      if (res.success) {
        dispatch({ type: 'LOGIN_SUCCESS', data: res })
        message.success('Login success')
        history.push('/demo')
      } else {
        dispatch({ type: 'LOGIN_FAILED', data: res.errorMessage })
      }
    } catch (err) {
      dispatch({ type: 'LOGIN_FAILED', data: err.message })
    }
  }

  return (
    <div className="login flex column center" style={{ height: '100%' }}>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true, username: 'FIA0074', password: '123456' }}
        onFinish={onFinish}
      >
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
        {!!loginError && (
          <Form.Item>
            <Alert message={loginError} type="error" />
          </Form.Item>
        )}
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button" loading={loginLoading}>
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    </div>
  )
}

export default withStore(['loginLoading', 'user', 'loginError'])(Login)

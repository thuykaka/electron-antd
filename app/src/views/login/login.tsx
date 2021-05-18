import React, { FunctionComponent, useState, useEffect } from 'react'
import { Form, Input, Button, Checkbox, message, Alert, Row, Col } from 'antd'
// @ts-ignore
import ClientCaptcha from 'react-client-captcha'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { withStore } from '@/core/store'

import './login.less'
import 'react-client-captcha/dist/index.css'

const Login: FunctionComponent = (props: any) => {
  const { loginLoading, loginError, dispatch, history } = props
  console.log('props')

  const [genCaptcha, setGenCaptcha] = useState('')

  useEffect(() => {
    dispatch({ type: 'RESET_LOGIN_DATA' })
  }, [])

  const onFinish = async ({ username, password, inputCaptcha }: any) => {
    console.log('onFinish', inputCaptcha)
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
        layout="vertical"
        requiredMark={false}
        initialValues={{ remember: true, username: 'FIA0074', password: '123456' }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item label="Security Code">
          <Row gutter={8}>
            <Col span={16}>
              <Form.Item
                name="inputCaptcha"
                noStyle
                rules={[
                  { required: true, message: 'Please input the captcha you got!' },
                  () => ({
                    validator(_, value) {
                      if (!value || genCaptcha === value) {
                        return Promise.resolve()
                      }
                      return Promise.reject(new Error('The captcha that you entered do not match!'))
                    },
                  }),
                ]}
              >
                <Input maxLength={4} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <ClientCaptcha
                chars={'0123456789'}
                height={32}
                retryIconSize={20}
                captchaCode={(code: any) => {
                  console.log('setGenCaptcha', code)
                  // setGenCaptcha(code)
                }}
                retry={true}
              />
            </Col>
          </Row>
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
        </Form.Item>
        <Form.Item>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    </div>
  )
}

export default withStore(['loginLoading', 'user', 'loginError'])(Login)

import { useHistory, useLocation } from 'react-router-dom'
import styles from './index.module.scss'
import { NavBar, Form, Input, Button, List, Toast } from 'antd-mobile'
import { useDispatch } from 'react-redux'
import { login } from '@/store/actions/login'
import { AxiosError } from 'axios'
import { useRef, useState } from 'react'
import { FormInstance } from 'antd-mobile/es/components/form'
import { InputRef } from 'antd-mobile/es/components/input'
import useCountDown from '@/hooks/useCountDown'

export default function Login() {
  const history = useHistory()
  const dispatch = useDispatch()
  // const params = useParams()
  const location = useLocation<{ from: string }>()

  const onFinish = async (values: LoginForm) => {
    try {
      await dispatch(login(values))
      Toast.show({
        content: '登陆成功!',
        duration: 500,
        afterClose: () => {
          const pathname = location.state ? location.state.from : '/home'
          history.replace(pathname)
        }
      })
    } catch (e) {
      // try catch中 err 的类型是不确定
      const err = e as AxiosError<{ message: string }>
      Toast.show({
        content: err.response?.data.message,
        duration: 1000
      })
    }
  }

  const refForm = useRef<FormInstance>(null)
  const refInput = useRef<InputRef>(null)

  // const [time, setTime] = useState(0)
  // const refTimer = useRef(-1)
  const [disabled, setDisabled] = useState(false)
  const { start, count } = useCountDown(5, () => {
    setDisabled(false)
  })
  const getCode = () => {
    // if (count > 0) return
    // 获取验证码
    // 使用ref获取 Form组件或者使用Form组件提供的useForm方法 const [form] = Form.useForm()
    const mobile = refForm.current?.getFieldValue('mobile')
    const err = refForm.current!.getFieldError('mobile')

    if (!mobile || err.length > 0) {
      // 手机号没有通过校验,提升先输入正确的手机号,并且获取焦点
      refForm.current?.validateFields()
      refInput.current?.focus()
      return
    }

    Toast.show('已发送验证码')
    setDisabled(true)

    // 两种解决方案
    // 1. setTime 提供回调函数,可获取最新的time状态
    // setTime(5)
    // refTimer.current = window.setInterval(() => {
    //   setTime(time => time - 1)
    // }, 1000)

    // 2.提供ref对象,使用它的current属性
    // setInterval(() => {
    //   refTimer.currtent--
    //   setTime(refTimer.current)
    // }, 1000)

    // 封装成hooks函数
    start()
  }
  // useEffect(() => {
  //   if (time === 0) {
  //     clearInterval(refTimer.current)
  //   }
  // }, [time])

  return (
    <div className={styles.root}>
      <NavBar onBack={() => history.goBack()}>标题</NavBar>

      <div className="login-form">
        <h2 className="title">账号登录</h2>
        <Form
          ref={refForm}
          name="form"
          onFinish={onFinish}
          validateTrigger={['onBlur', 'onChange']}
          initialValues={{
            mobile: '13811111111',
            code: '246810'
          }}
          footer={
            <Button type="submit" color="primary" block>
              提交
            </Button>
          }
        >
          <Form.Item
            name="mobile"
            className="login-item"
            rules={[
              { required: true, message: '手机号不可为空' },
              { pattern: /^1\d{10}$/, message: '请输入正确的手机号' }
            ]}
          >
            <Input placeholder="请输入手机号" ref={refInput} />
          </Form.Item>
          <List.Item
            className="login-code-extra"
            extra={
              <Button disabled={disabled} className="code-extra" onClick={getCode}>
                {
                  /* {time === 0 ? '获取验证码' : `${time}s后可重新获取验证码`} */
                  count === 0 || count > 4 ? '获取验证码' : `${count}s后可重新获取验证码`
                }
              </Button>
            }
          >
            <Form.Item
              name="code"
              rules={[
                { required: true, message: '验证码不可为空' },
                { pattern: /^\d{6}$/, message: '请输入正确的验证码' }
              ]}
              className="login-item"
            >
              <Input placeholder="请输入验证码" />
            </Form.Item>
          </List.Item>
        </Form>
      </div>
    </div>
  )
}

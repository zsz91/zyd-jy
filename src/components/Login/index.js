import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import ModalHoc from 'hoc/ModalHoc';
import './index.scss';

import {
  Form,
  Icon,
  Input,
  Checkbox,
  Spin
} from 'antd';

@Form.create()
@inject('LoginStore', 'CommonStore')
@observer
@ModalHoc()
 class Login extends  Component {
  storeName = 'LoginStore';
  configName = 'modalConfig';
  componentDidMount() { this.props.LoginStore.loginInt() }
  render(){
    const {
      form: { getFieldDecorator },
      LoginStore: {
        handleSubmit,
        dataSource,
        spinning,
        config: {
          username,
          password,
          remember
        },
        onRegister,
          onForget
      },
      CommonStore
    } = this.props;
    return(
      <Form onSubmit={e=>handleSubmit(e, this.props.form, CommonStore)} className="login-form">
          <div className='login-content'>
            <Form.Item>
              {getFieldDecorator(username, {
                rules: [{ required: true, message: '请输入用户名' }],
                  initialValue: dataSource[username] || ''
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户名" />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator(password, {
                rules: [{ required: true, message: '请输入密码！' }],
                  initialValue: dataSource[password] || ''
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码" />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator(remember, {
                valuePropName: 'checked',
                initialValue: dataSource[remember],
              })(
                <Checkbox>记住密码</Checkbox>
              )}
              <a style={{float: 'right'}} onClick={onForget}>忘记密码</a>
              <button htmlType="submit" className="login-form-button">{ <Spin spinning={spinning} style={{marginRight: '10px'}}/>}登录</button>
            </Form.Item>
              <div className="sigin">还不是会员？点击<span onClick={onRegister}>单位注册</span></div>
          </div>
      </Form>
    )
  }
}

export  default Login

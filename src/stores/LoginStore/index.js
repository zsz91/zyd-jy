import React from 'react';
import { observable, action, toJS} from 'mobx';
import {
    setCookie,
    getCookie,
    clearCookie,
    md5
} from 'utils';
import { login, getUserInfo } from 'api';
import { message } from 'antd'
import router from 'umi/router';

 class LoginStore{

     config = { username:'username', password:'password', remember:'remember'}
     username = md5(this.config.username);
     password = md5(this.config.password);
     remember = md5(this.config.remember);
     @observable spinning = false;
     @observable modalConfig = {
      title: <span className='big-title center blue'>登录</span>,
      visible: false,
      onCancel: this.onCancel,
      footer:null
    }

    @observable dataSource = {
        username: '',
        password: '',
        remember: false
    }

    @action loginInt = () => {
        const username = getCookie(this.username);
        const password = getCookie(this.password);
        const remember = getCookie(this.remember);

        if(username !== '' && password !== '' && remember){
            const o = {[this.config.username]: username, [this.config.password]: password , [this.config.remember]: Boolean(remember)};
            this.dataSource = o;
        }

    }

    @action show = () => this.modalConfig.visible = true;
    @action onCancel = () => this.modalConfig.visible = false;

    @action handleSubmit = (e, form)=> {
      e.preventDefault();
      form.validateFields((err, values) => {
        if(err)return false;
        this.submit(values);
        if(values.remember){
            this.rememberPass(values)
        }else{
            clearCookie(toJS(this.username));
            clearCookie(toJS(this.password));
            clearCookie(toJS(this.remember))
        }
      })
    }

    @action rememberPass = (obj) => {
        const {username, password, remember} = this.config;
         setCookie(this.username, obj[username]);
         setCookie(this.password, obj[password]);
         setCookie(this.remember, obj[remember]+'');
     }
     async submit (values) {
        if(this.spinning)return;
        this.spinning = true;
        const res = await login(values);
        if(res && res.errcode){
            this.error(res)
        }else{
            this.loginSuccess(res)
        }
     }

     @action error = (res) => {
         this.spinning = false;
         message.error(res.errmsg, 3)
     }

     async loginSuccess  (res) {
            window.CommonStore.setIsLogin(true);
            window.CommonStore.setConfig(res);
            const user = await getUserInfo({token: res.access_token});
            if(user){
                window.CommonStore.setUserInfo(user);
            }else{
                message.error('用户数数据获取失败', 3)
            }
            this.onCancel();
            this.spinning = false;
            //登陆后强制刷新浏览器，以防止在其他页面登陆后无数据
            if ( window.location.hash.includes('Register')){
                router.push('/Home')
            }
     }

     @action onRegister = () => {
        this.onCancel()
         router.push('/Register');
     }

     onForget = () => {
         message.warning('请联系管理员！')
     }


}


export default  new LoginStore();

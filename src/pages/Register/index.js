import React, {Component} from 'react';
import './index.scss';
import Form from 'components/Form';
import  config from './config';
import {inject, observer} from "mobx-react";
import { Button, message,Alert} from 'antd';
import {getDictionary, getRegister, getPlace, isReg} from 'api';


@inject('LoginStore')
@observer
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            config: config,
            regDisabaled: false,
            isReg: false
        }
    }
    componentDidMount() {
        this.setConfig();
        isReg().then(res=>{
            if(res){
                let isReg = res.isEnableCompanyReg;
                this.setState({isReg: !isReg})
            }
        })
    }

    async setConfig () {
        const c = this.state.config;
        const res1 = await getDictionary('JY004');
        const res2 = await getDictionary('JY005');
        const res3 = await getDictionary('JY006');
        const res4 = await getDictionary('JY007');
        const res5 = await getDictionary('JY008');
        const res6 = await getPlace();
        c.data.map(item=>{
            if(item.key === 'financialTypeId' && res1){
                item.options = res1;
            }
            if(item.key === 'natureTypeId' && res2){
                item.options = res2;
            }
            if(item.key === 'industryTypeId' && res3){
                item.options = res3;
            }
            if(item.key === 'scaleId' && res4){
                item.options = res4;
            }
            if(item.key === 'regCapitalId' && res5){
                item.options = res5;
            }
            if(item.key === 'placeId' && res6){
                item.options = res6;
            }

        });
        this.setState({config: c})
    }

    onReset = () => {
        this.setState({regDisabaled: false});
        const form = this.refs.Form;
        form.reset()
    }
    onRegister = () => {
        const form = this.refs.Form;
        const data = form.submit();
        if(data){
            this.getRegister(data)
        }

    }
    async getRegister (data) {
        const  res = await getRegister(data);
        if(res){
            if(res === true){
                message.success('您已经注册成功，请耐心等待审核。');
                this.setState({regDisabaled: true})
            }else{
                let r = JSON.parse(res);
                if(r.errMsg && r.errMsg !==''){
                    let msg = r.errMsg.replace('password','密码').replace('userName','用户名');
                    message.error( msg, 3);
                }else{
                    message.error(  '注册失败，请联系管理员！');
                }
            }
        }else{
            message.error('非常抱歉，您注册失败了，请重试。');
        }
    }
    render() {
        const {
            LoginStore:{
                show
            }
        } = this.props;
        return (
            <div className="Register">
                <div className="reg-header">
                    <div className="reg-left">注册信息</div>
                    <div className="reg-right pointer" onClick={show}>已经注册？直接<span className="reg-login " >登陆</span></div>
                </div>
                <div className="reg-content">
                    {this.state.isReg  && <Alert message="您没有注册权限！" type="error" className={'top15'} showIcon/>}
                    <Form config={this.state.config} ref="Form"/>
                </div>
                {
                    !this.state.isReg && <div className="reg-button top20">
                        <Button type="primary" className="marRight-10" onClick={this.onReset}>重置</Button>
                        <Button className="reg-btn marLeft-10" onClick={this.onRegister} disabled={this.state.regDisabaled}>注册</Button>
                    </div>
                }

            </div>
        );
    }
}

export default Register;

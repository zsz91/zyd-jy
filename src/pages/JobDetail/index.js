import React, {Component} from 'react';
import Breadcrumbs from 'components/Breadcrumbs';
import './index.scss';
import {Button, Empty, message} from 'antd';
import router from 'umi/router';
import moment from 'moment';
import {jobCollect, resumeDelivery} from 'api';
import { inject, observer } from 'mobx-react';

@inject('LoginStore','CommonStore')
@observer
class Index extends Component {
    jobCollect = (id)=> {
        if(!this.props.CommonStore.isLogin){
            this.props.LoginStore.show();
        }else{
            jobCollect({jobId:id}).then(res=>{
                if(res){
                    message.success('职位收藏成功！')
                }
            }).catch(()=>{
                message.error('职位收藏失败！')
            })
        }

    }
    resumeDelivery = (id)=> {
        if(!this.props.CommonStore.isLogin){
            this.props.LoginStore.show();
        }else{
            resumeDelivery({jobId:id}).then(res=>{
                if(res){
                    message.success('投递成功！')
                }
            }).catch(()=>{
                message.error('投递失败！')
            })
        }
    }

    goBack = () => {
        router.goBack();
    }
    render() {
        if(!this.props.location.state){
            this.goBack();
            return null;
        };
        let state = this.props.location.state;
        let o = state.jobInfo;
        let c = state.companyInfo;
        // if(!o)return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
        // if(!c)return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
        return (
            <div className="JobDetail">
                <Breadcrumbs/>
                <div className="top20">
                    <div className="job-header">
                        <div className="time">{ o && o.pubTime ? moment(o.pubTime).format('YYYY-MM-DD hh-ss') : ''}发布</div>
                        <h4 className="title">{o && o.name}</h4>
                        <div className="money">
                            <span className="text">{o && o.salary} </span>元/月
                        </div>
                        <div className="detail">学历：{o && o.educRequiredName} | 经验：{o && o.workingLife}年 | 招聘人数：{o && o.count}人</div>
                        <div className="tool">
                            <p onClick={this.goBack} style={{padding:'10px 0',cursor:'pointer'}}>返回公司详情</p>
                            <Button type="primary" onClick={()=>this.jobCollect(o && o.id)}>收藏此职位</Button>
                            <Button className="active-button top20" onClick={()=>this.resumeDelivery(o && o.id)}>应聘此职位</Button>
                        </div>
                    </div>
                    <div className="job-functions">
                        <h4 className="title">职位职能</h4>
                        <p className="con">{o && o.jobDesc}</p>
                        <h4 className="title">职位要求</h4>
                        <p className="con">{o && o.jobRequire}</p>
                    </div>
                    <div className="job-detail">
                        <p>公司地址： {o && o.address}</p>
                        <p>邮政编码： {c && c.zipCode}</p>
                        <p>公司主页：</p>
                        <p>联 系 人： {o && o.contacts}</p>
                        <p>电 话： {o && o.phone}</p>
                    </div>
                    <div className="center">
                        <span onClick={this.goBack} style={{padding:'10px 20px',cursor:'pointer'}}>返回公司详情</span>
                        <Button type="primary" className="marLeft-10" onClick={()=>this.jobCollect(o && o.id)}>收藏此职位</Button>
                        <Button className="active-button top20 marLeft-10" onClick={()=>this.resumeDelivery(o && o.id)}>应聘此职位</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Index;
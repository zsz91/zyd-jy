import React,{Component} from 'react';
import {Icon} from 'antd';
import './index.scss';
import wx from 'assets/images/微信icon.png';
import xl from 'assets/images/微博icon.png';
import yx from 'assets/images/迎新网icon.png';
import { getFriendlyLink } from "api";
import config from 'config';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            links:[]
        }
    }

    componentDidMount() {
        this.getData()
    }
    async getData(){
        const res = await getFriendlyLink();
        if(res){
            this.setState({links: res})
        }
    }

    render() {
        return (
            <div className="zyd-footer">
                <div className="zyd-footer-top">
                    <a className="title" ><Icon type='link'/>友情链接：</a>
                    {
                        this.state.links.map(item => {
                            return (
                                <a target="_blank" key={item.id} className="item" href={item.domain}>{item.name}</a>
                            )
                        })
                    }
                    <div className="right">
                        {config.wx && <a className="img wx" target="_blank" href={config.wx}><img src={wx} alt="微信"/></a>}
                        {config.wb && <a className="img xl" target="_blank" href={config.wb}><img src={xl} alt="微博"/></a>}
                        {config.yx && <a className="img yx" target="_blank" href={config.yx}><img src={yx} alt="迎新"/></a>}
                    </div>
                </div>
            <div className="zyd-footer-bottom">
                <p>版权所有：{config.schoolName}就业招生处 | 招生电话：{config.schoolPhone}</p>
                <p>学校地址：{config.schoolAddress} | 邮编：{config.schoolMail} | Email：{config.schoolEamil}</p>
            </div>
            </div>
        )
    }
}

export default Index;

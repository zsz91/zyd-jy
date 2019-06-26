import React, {Component, Fragment} from 'react';
import  './index.scss';
import Table from 'components/Table';
import {JobDetail} from 'api';
import {setLocal, getLocal} from "utils";
import bg from 'assets/images/招聘公司背景.png'
import Breadcrumbs from 'components/Breadcrumbs';
import {message, Empty} from "antd";

let columns = [
    {title: '职位名称', dataIndex:'jobCategoryName'},
    {title: '学历要求', dataIndex:'educRequiredName'},
    {title: '招聘人数', dataIndex:'count'},
    {title: '薪资待遇', dataIndex:'salary'},
    {title: '工作地点', dataIndex:'address'},
    {title: '截止日期', dataIndex:'endTime',type:'date'},
];

class Index extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataSource:null,
            type:null
        }
    }
    componentWillMount() {
        let state = this.props.location.state;
        let dataSource = null;
        let type = null;
        if(state){
            if(state.status === 'suc' || state.id){
                setLocal('comenyData',JSON.stringify(state));
                setLocal('comenyType',JSON.stringify(this.props.location.type || 'null'));
                dataSource = state;
                type = this.props.location.type || null;
            }else{
                message.error('非常抱歉没有更多的数据！')
            }
        }else{
            dataSource = JSON.parse(getLocal('comenyData'));
            type = JSON.parse(getLocal('comenyType'));
        }
        this.setState({dataSource,type})
    }

    onItemClick = d =>JobDetail({jobId:d.id});
    render() {
        if(!this.state.dataSource)return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
        let o = null, jobInfo = [];
        if(this.state.type && this.state.type !== 'null'){
            o = this.state.dataSource;
        }else{
            o = this.state.dataSource.companyInfo;
            jobInfo = this.state.dataSource.jobInfo;
        }
        return (
            <div className="CompanyDetail">
                <Breadcrumbs/>
                {this.state.type && this.state.type !== 'null' ? <Fragment>
                    <div className="image-box top20" style={{background:`url(${bg})`, backgroundSize:'cover'}}>
                        <div className="comeny-info">
                            <h4 className="comeny">{o.meetingName}</h4>
                            <p className="">地址：{o.address}</p>
                            <p className="">时间：{o.hours}</p>
                        </div>
                    </div>
                    <div >
                        <h4 className="title">岗位说明</h4>
                        <p>{o.job}</p>
                        <h4 className="title">详细说明</h4>
                        <p dangerouslySetInnerHTML={{__html: o.meetingInfo || <div/>}}></p>
                    </div>
                </Fragment>  : <Fragment>
                        <div className="image-box top20" style={{background:`url(${bg})`, backgroundSize:'cover'}}>
                            <img className="image" src={o.logo} alt=""/>
                            <div className="comeny-info">
                                <h4 className="comeny">{o.name}</h4>
                                <p className="">地址：{o.address}</p>
                                <p className="">行业：{o.industryTypeName}</p>
                                <p className="">规模：{o.scaleName}</p>
                                <p className="">主页：</p>
                            </div>
                        </div>
                        <div className="top-cont">
                            <h4 className="title">公司介绍</h4>
                            <p className="content">{o.intro}</p>
                            <h4 className="title">产品信息</h4>
                            <p className="content">{o.product}</p>
                            <h4 className="title">经营范围</h4>
                            <p className="content">{o.scaleInfo}</p>
                        </div>
                        <div className="job-detail">
                            <p>公司地址： {o.address}</p>
                            <p>邮政编码： {o.zipCode}</p>
                            <p>公司主页：</p>
                            <p>联 系 人： {o.contactPerson}</p>
                            <p>电 话： {o.mobile}</p>
                        </div>
                        <div>
                            <h4 className="title">招聘职位</h4>
                            <Table dataSource={jobInfo}
                                   columns={columns}
                                   isHeader={true}
                                   isOddActive={true}
                                   onItemClick={this.onItemClick}
                                   isBreadcrumbs={false}
                                   tableHeight={260}
                            />
                        </div>
                    </Fragment>}
            </div>
        );
    }
}

export default Index;
import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {DatePicker, Button, Card, Badge, Empty} from 'antd';
import Breadcrumbs from 'components/Breadcrumbs';
import Table from 'components/Table';
import {toJS} from "mobx";
import moment from 'moment'
import {JobDetail} from 'api';
import total1 from 'assets/images/排名1.png';
import total2 from 'assets/images/排名2.png';
import total3 from 'assets/images/排名3.png';

@inject('ScheduleStore', 'HeaderStore')
@observer
class Index extends Component {
    componentDidMount() {
        const { HeaderStore, ScheduleStore, } = this.props;
        HeaderStore.setActive('null');
        ScheduleStore.init(this.props.location);
    }
    render() {
        const {
            ScheduleStore: {
                onSearch,
                onChange,
                currentDate,
                hotJobData,
                newJobData,
            }
        } = this.props;
        return (
            <div className="Schedule">
                <Breadcrumbs/>
                <div className="zyd-flex top20">
                    <div className="zyd-flex-item marRight-20">
                        <div className="sch-header">
                            <span>招聘日期： <DatePicker onChange={onChange} value={currentDate ? moment(currentDate, 'YYYY-MM-DD'): null}/></span>
                            <Button type="primary" className="active-button" style={{float:'right'}} onClick={onSearch}>搜索公司</Button>
                        </div>
                        <div>
                            <Table {...toJS(this.props.ScheduleStore)}/>
                        </div>
                    </div>
                    <div className="width-300">
                        <Card
                            title={<span className='big-title theme'>热门职位</span>}
                            size="small"
                            className={'zyd card-height'}
                        >
                            {
                                hotJobData.length > 0 ? hotJobData.map((item, index)=>(
                                    <div className="pointer" style={{padding:'4px 5px'}} onClick={e=>JobDetail({jobId:item.id})}>
                                        <span style={{
                                            display:'inline-block',
                                            width:'29px',
                                            height:'20px',
                                            background:`url(${index === 0 ? total1 : index===1 ? total2 : index === 2 ? total3 : '#fff'})`,
                                            lineHeight:'20px',
                                            textAlign:'center',
                                            fontSize:'14px',
                                            color:`${index >2 ? '#333' : '#fff'}`,
                                            backgroundSize:'cover',
                                            textIndent:'-6px',
                                            marginRight:'5px'
                                        }}>{index + 1}</span>{item.name}
                                    </div>
                                )) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                            }
                        </Card>
                        <Card
                            title={<span className='big-title theme'>最新职位</span>}
                            size="small"
                            className={'zyd card-height top30'}
                        >
                            {
                                newJobData.length > 0 ?  newJobData.map(item=>(
                                   <div style={{
                                       height:'25px',
                                       overflow:'hidden',
                                       textOverflow:'ellipsis',
                                       wordBreak:"break-all"
                                   }}
                                        className="pointer"
                                        onClick={e=>JobDetail({jobId:item.id})}
                                   ><Badge status="warning" />{item.jobCategoryName}</div>
                                )) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                            }
                        </Card>
                    </div>
                </div>


            </div>
        );
    }
}

export default Index;
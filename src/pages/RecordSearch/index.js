import React, {Component} from 'react';
import Breadcrumbs from 'components/Breadcrumbs';
import { Col, Input, Select, Button} from 'antd';
import {observer, inject} from "mobx-react";
import {toJS} from "mobx";
import Table from 'components/Table';

const Option = Select.Option;

@inject('RecordSearchStore','HeaderStore')
@observer
class Index extends Component {
    componentDidMount() {
        const { HeaderStore,RecordSearchStore } = this.props;
        HeaderStore.setActive(9);
        RecordSearchStore.init();
    }

    renderOptions = data => (data.map(item => (<Option value={item}>{item}</Option>)))
    render() {
        const {
            RecordSearchStore:{
                change,
                params,
                onSearch,
                onRest
            }
        } = this.props;
        return (
            <div className="RecordSearch">
                <Breadcrumbs/>
                <div className="year-header top20">
                    <div style={{height:'35px'}}>
                        <Col span={6}>
                            <Col span={6} style={{lineHeight:'30px',textAlign:'right'}}>姓名：</Col>
                            <Col span={12}>
                                <Input onChange={e=>change('studentName', e.target.value)} value={params.studentName || ''}/>
                            </Col>
                        </Col>
                        <Col span={6}>
                            <Col span={6} style={{lineHeight:'30px',textAlign:'right'}}>专业：</Col>
                            <Col span={12}>
                                <Input onChange={e=>change('majorName', e.target.value)} value={params.majorName || ''}/>
                            </Col>
                        </Col>
                        <Col span={6}>
                            <Col span={10} style={{lineHeight:'30px',textAlign:'right'}}>毕业年份：</Col>
                            <Col span={12}>
                                <Input onChange={e=>change('graduationYear', e.target.value)} value={params.graduationYear || ''}/>
                            </Col>
                        </Col>
                        <Col span={6} className="align-right">
                            <Button type="primary" onClick={onRest}>重置</Button>
                            <Button className="active-button marLeft-10" onClick={onSearch}>查询</Button>
                        </Col>
                    </div>
                    <p style={{color:'rgba(210,210,210,1)',fontSize:'14px',marginTop:'5px'}}>姓名、年级、专业都填写的情况下才能查询档案去向信息</p>
                </div>
                <div>
                    <Table {...toJS(this.props.RecordSearchStore)}/>
                </div>
            </div>
        );
    }
}

export default Index;
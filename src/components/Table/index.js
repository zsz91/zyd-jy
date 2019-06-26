import React, { Component } from 'react';
import {observer } from 'mobx-react';
import './index.scss';
import {Pagination, Empty, Spin, Card, Row} from 'antd';
import Breadcrumbs from 'components/Breadcrumbs';
import { format } from 'utils';

function TableContent(props) {
    const { dataSource, columns, onItemClick,} = props;
    const onClick = (item) => {
        onItemClick(item);
    }
    return(
        dataSource.map((item, i) => (
            <tr className="table-tr" key={i} onClick={()=>onClick(item)}>
                {
                    columns.map((c_item) => {
                        const { dataIndex } = c_item;
                        let value = item[dataIndex];
                        const type = c_item.type ? c_item.type : null;
                        if(type){
                            value = type === 'date' ?  format(value, 'date') :  type === 'time' ? format(value, 'time') : value;
                        }
                        if(c_item.render && typeof c_item.render === 'function'){
                            return <td style={{width: `${c_item.width}px`, textAlign: `${c_item.textAlign}`}} >{c_item.render(value, item)}</td>
                        }else{
                            return  <td style={{width: `${c_item.width}px`, textAlign: `${c_item.textAlign}`}} dangerouslySetInnerHTML={{__html:value}}></td>
                        }
                    })
                }
            </tr>
        ))
    )
}

function TableHeader(props){
    const { columns} = props;
    return(
        <tr  className="table-header">
            {
                columns.map(item=>(
                <th style={{paddingLeft:'10px'}}>{item.title}</th>
                ))
        }
        </tr>
    )
}

@observer
class TableBase extends Component{
    render() {
        const {
            pagination,
            dataSource,
            spinning,
            title,
            columns,
            isHeader,
            isBreadcrumbs,
            isOddActive,
            tableHeight
        } = this.props;
        const len = dataSource.length;
        const height = document.documentElement.clientHeight;
        return(
            <div className="zyd-table-box">
                { isBreadcrumbs !== false &&
                    <div className="zyd-table-header" >
                        <Breadcrumbs/>
                    </div>
                }
                <div className="zyd-table top10" style={{minHeight: `${tableHeight || height - 455}px`}}>
                        {len == 0  && !spinning &&  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} imageStyle={{width:'93px', height: '60px',margin:'0 auto'}} />}
                        <table className={`table ${ isOddActive && 'odd-active'}`}>
                            {
                                len > 0  && !spinning &&  <tbody>
                                {isHeader && <TableHeader columns={columns}/>}
                                    <TableContent {...this.props}/>
                                </tbody>
                            }
                        </table>
                        <div className="zyd-table-example" style={{display: `${spinning ? 'block' : 'none'}`}}>
                            <Spin className='spinning' spinning={spinning}/>
                        </div>
                    </div>
                <div className="zyd-pagination">
                    {len > 0  && pagination && <Pagination {...pagination}/>}
                </div>
            </div>
        )
    }
}

export default TableBase;
/*
            pagination, //分页
            dataSource,// 数据， 如果没有接口， 请使用 setDataSource 加载数据
            spinning, // 加载动画
            title, //标题
            columns:[ // 列配置
                {
                title:"列标题",
                dataIndex:"filed"，
                width: Number,
                type:'date | time',
                render:()=>{} // 覆盖列元素
            ],

            isHeader:true, 显示头部
            isBreadcrumbs: true 显示 面包屑，
            isOddActive: true 激活偶数背景色
* */

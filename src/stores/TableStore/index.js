import React, { Component } from 'react';
import {observable, action, toJS} from "mobx";
import { getData } from 'api';
import {message} from 'antd'

class TableStore {

    back_p = null;

    @observable oldData = [];
    @observable dataSource = [];
    @observable columns = [];
    @observable initUrl = '';
    @observable pageUrl = '';
    @observable params = { cid:'' };
    @observable spinning = false;
    @observable tableConfig = {
        columns: this.columns,
        dataSource: this.dataSource,
        rowKey: 'id',
    };
    @observable pagination = {
        current: 1, //当前页数
        hideOnSinglePage: false, // 只有一页时是否隐藏分页
        pageSize: 10, //每页条数
        showQuickJumper: true, // 是否可以快速跳转至某页
        showSizeChanger: false, // 是否可以改变 pageSize
        total: 0, // 数据总数
        onChange: this.onChange, // 页码改变的回调，参数是改变后的页码及每页条数
        onShowSizeChange: this.onShowSizeChange, //	pageSize 变化的回调
        itemRender: this.itemRender
    }

    init = () => {
        if(this.pageUrl !=='')  this.getPaga();
        if(this.initUrl !=='')this.getData();
    }
    @action setDataSource = data => {
        this.oldData = data;
        this.renderData();
    };

    async getData() {
        this.spinning = true;
        //获取数据
        const data = await getData(
            this.params,
            {
                cid: this.params.cid,
                pageNo: this.pagination.current + '',
                pageSize: this.pagination.pageSize + ''
            },
            this.initUrl
        );
        data ?  this.oldData = data :  message.error('加载失败，请刷新页面！');
        this.spinning = false;
        this.renderData()
    }
    renderData = () => {
        let d = [...toJS(this.oldData)];
        let data = null;
        const {pageSize, current} = toJS(this.pagination);
        if(d.length > pageSize){
            let s = (current - 1) * pageSize;
            let e =  pageSize;
            data = d.splice(s, e);
        }else{
            data = d;
        }
        this.dataSource  = data;
    }

    async getPaga(){
        //获取页数
        const  p  = await getData(
            this.params,
            { cid: this.params.cid },
            this.pageUrl, 1 );
        if(p){
            this.back_p = p;
            const pa = {...toJS(this.pagination)};
            pa.total =  parseInt(p.totalCount);
            pa.pageSize =  parseInt(p.pageSize);
            pa.current =  parseInt(p.pageNo);
            this.pagination = pa;

        };
    }

   itemRender = (current, type, originalElement) => {
        if (type === 'prev') {
            return <a className='table-prev'>上一页</a>;
        } if (type === 'next') {
            return <a className='table-next'>下一页</a>;
        }
        return originalElement;
    }


    //pageSize 变化的回调
    onShowSizeChange = (current, size) => {}

    //设置表格默认配置
    setTableConfig= obj => {
        this.tableConfig = {...toJS(this.tableConfig), ...obj}
    }

    //页码改变的回调，参数是改变后的页码及每页条数
    onChange = (page, pageSize) => {
        this.pagination.current = page;
        this.getData();
    }

   onItemClick = (data) => {}






}

export default  TableStore;



import React,{Component} from 'react';
import { getData } from 'api';
import {observable, action} from "mobx";

class MajorIntroduceStore extends  Component{

    @observable dataSource = []

    @action init = () => {
        this.getData()
    }
    async getData(){
        const  res = await getData(null,{cid: '61'}, '/api/admin/content/list');
        if(res) this.dataSource = res;
    }
}
export default  new MajorIntroduceStore();

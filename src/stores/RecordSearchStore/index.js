
import React from 'react';
import {getDossierInfo } from 'api';
import TableStore from 'stores/TableStore';
import {Modal, message} from "antd";

class YearAdmissionsStore extends  TableStore{
    dataSource = [];
    title = '专场招聘日程';
    isHeader = true;
    isBreadcrumbs = false;
    isOddActive = true;
    params = {};
    columns = [
        {
            title: '姓名',
            dataIndex: 'studentName',
            width:100,
        },
        {
            title: '性别',
            dataIndex: 'genderName',
            width:50,
        },
        {
            title: '毕业年份',
            dataIndex: 'graduateYear',
            width:100,
        },
        {
            title: '专业',
            dataIndex: 'majorName',
        },
        {
            title: '学历',
            dataIndex: 'educationBackgroundName',
        },
        {
            title: '状态',
            dataIndex: 'deliveryStatusName',
        },
        {
            title: '档案邮寄地址',
            dataIndex: 'dossierAddress',
        },
        {
            title: '档案转递号',
            dataIndex: 'dossierNum',
        },
        {
            title: '报到证号',
            dataIndex: 'registrationNum',
        }

    ]

    onItemClick = d => {};
    init = () => this.onRest();
    onSearch = ()=>{
        const d = this.params;
        if(!d.studentName || d.studentName === ''){
            message.warning("姓名不能为空！");
            return
        }
        if(!d.majorName || d.majorName === ''){
            message.warning("专业不能为空！");
            return
        }
        if(!d.graduationYear || d.graduationYear === ''){
            message.warning("毕业年份不能为空！");
            return
        }
        this.getData()
    };
    onRest =() => this.params = {};
    change =(key, value) => Object.assign(this.params, {[key]:value});
    async getData(){
        window.CommonStore.showSpi();
        const res = await getDossierInfo({...this.params});
        if(res){

            if(res.length === 0){
                Modal.warning({
                    title:'很遗憾 没有查到任何信息'
                })
            }
            this.setDataSource(res);
        }
        window.CommonStore.closeSpi();
    }



}
export default  new YearAdmissionsStore();

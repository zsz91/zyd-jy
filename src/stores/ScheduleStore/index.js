
import React from 'react';
import { EnrollmentGuideDetail,getEnrollmentGuide, getSocialRecruitment, getHotJob} from 'api';
import {observable} from "mobx";
import TableStore from 'stores/TableStore';

class ScheduleStore extends  TableStore{

        title = '专场招聘日程';
        dataSource = [];
        isHeader = true;
        isOddActive = true;
        isBreadcrumbs = false;
        params = {};
        columns =[
                {
                        title:'公司名称',
                        dataIndex:'meetingName',
                },
                {
                        title:'公司地点',
                        dataIndex:'address',
                },
                {
                        title:'时间',
                        dataIndex:'hours',
                        width:100,
                        textAlign: 'right'
                }
        ];
        @observable currentDate = null; // 当前从首页带回的日期
        @observable hotJobData = [];
        @observable newJobData = [];
        init = (location ) => {
             window.CommonStore.showSpi();
                this.currentDate = location.state ? location.state.date : '';
                this.getData();
                this.getHotJob();
                this.getNewJob();
        }
        onItemClick = d =>  EnrollmentGuideDetail({id:d.id});
        onSearch = () =>  this.getData(); //搜索
        onChange = (moment, value) =>  this.currentDate = value;      //日期
        async getData(){
                const res = await getEnrollmentGuide({hours: this.currentDate});
                if(res){
                        this.pagination.total = res.total || 0;
                        this.setDataSource(res.rows)
                }
                window.CommonStore.closeSpi();
        }

        async getHotJob(){
                const res = await  getHotJob();
                if(res){
                        this.hotJobData = res.rows.splice(0,5);
                }
        }
        async getNewJob (){
                const res = await  getSocialRecruitment();
                if(res){
                        this.newJobData = res.rows.splice(0,5);
                }
        }



}
export default  new ScheduleStore();


import React from 'react';
import TableStore from 'stores/TableStore';
import { getSocialRecruitment,ComenyDetail} from 'api';

class OnlineJobFairStore extends  TableStore{
   title= '网络招聘会';
   dataSource = [];
   isHeader = true;
   isOddActive = true;
   params = {type:'network'}
   columns =[
      {
         title:'公司名称',
         dataIndex:'companyName',
      },
      {
         title:'公司地点',
         dataIndex:'address',
      },
      {
         title:'时间',
         dataIndex:'beginTime',
         width:100,
         type:'date'
      }
   ]
   init = () => {
      window.CommonStore.showSpi();
      this.getData();
   }
   async getData(){
      const res = await getSocialRecruitment(this.params);
      if(res){
         this.pagination.total = res.total;
         this.setDataSource(res.rows)
      }
      window.CommonStore.closeSpi();
   }

   onItemClick = d => {
      ComenyDetail({companyId:d.companyId})
   }
}
export default  new OnlineJobFairStore();

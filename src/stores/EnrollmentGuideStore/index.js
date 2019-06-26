
import React from 'react';
import TableStore from 'stores/TableStore';
import { getEnrollmentGuide , EnrollmentGuideDetail} from 'api';

class EnrollmentGuideStore extends  TableStore{
   dataSource = [];
   title = '专场招聘会';
   isHeader = true;
   isOddActive = true;
   params = {}
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
   ]
   init = () => {
      window.CommonStore.showSpi();
      this.getData();
   }
   async getData(){
      const res = await getEnrollmentGuide();
      if(res){
         this.pagination.total = res.total;
         this.setDataSource(res.rows)
      }
      window.CommonStore.closeSpi();
   }

   onItemClick = d => {
      EnrollmentGuideDetail({id:d.id})
   }

}
export default  new EnrollmentGuideStore();

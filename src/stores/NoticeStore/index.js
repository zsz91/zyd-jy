
import React from 'react';
import TableStore from 'stores/TableStore';
import { getDetail } from 'api';

class NoticeStore extends  TableStore{
    title = '公告通知';
   initUrl = '/api/admin/content/list';
   pageUrl = '/api/admin/content/page';
   params = {
    cid:'71'
   }
   columns = [
       {
         title: '新闻摘要',
         dataIndex: 'title',
       },
       {
           title: '作者',
           dataIndex: 'userName',
           width: 100,
           textAlign: 'right',
           render: v => <span>作者: {v}</span>
       },
       {
           title: '浏览次数',
           dataIndex: 'views',
           width: 200,
           textAlign: 'left',
           render: v => <span style={{padding:'0 10px'}}>浏览次数: {v}</span>
       },
       {
         title: '时间',
         dataIndex: 'releaseDate',
         type: 'date',
         width:100,
         textAlign: 'right',
      }
   ]

   onItemClick = (data) => {
    getDetail(null,{id: data.id+'' });
   }
}


export default  new NoticeStore();

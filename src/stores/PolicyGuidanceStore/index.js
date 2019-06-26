
import React from 'react';
import TableStore from 'stores/TableStore';
import { getDetail } from 'api';

class PolicyGuidanceStore extends  TableStore{
   title= '政策指导';
   initUrl = '/api/admin/content/list';
   pageUrl = '/api/admin/content/page';
   params = {cid:'67'};
   columns = [
       {title: 'title',dataIndex: 'title'},
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
      {title:'releaseDate',dataIndex: 'releaseDate',type: 'date',width:100,textAlign: 'right'}];
   onItemClick = d => { getDetail(null,{id: d.id + '' })}
}
export default  new PolicyGuidanceStore();


import React from 'react';
import TableStore from 'stores/TableStore';
import { getDetail ,getContent} from 'api';
import { download } from 'utils';
import {Icon} from 'antd';


class DownloadStore extends  TableStore{
   title= '资料下载';
   initUrl = '/api/admin/content/list';
   pageUrl = '/api/admin/content/page';
   params = {cid:'63'};
   columns = [
       {title: 'title',dataIndex: 'title'},
      {title:'releaseDate',dataIndex: 'releaseDate',type: 'date',width:100,textAlign: 'right'},
      {
         title: 'views',
         dataIndex: 'views',
         width: 100,
         textAlign: 'right',
         render:(text, record) => (<div style={{cursor:'pointer'}} onClick={(e)=>{e.stopPropagation();this.getDownloadUrl(record)}}><Icon type="download" /> {text} 次</div>)
      }
      ];
   onItemClick = d => { getDetail(null,{id: d.id + '' })}
   async getDownloadUrl({id}){
      window.CommonStore.showSpi();
      const res = await getContent(null, {id: id + ''});
      let attachArr = res.attachArr;
      let url = res.siteUrl;
      for(let i = 0, len = attachArr.length; i < len; i++) {
         const {attachmentNames, attachmentPaths} = attachArr[i];
         url = url + attachmentPaths;
         window.open(url)
         window.CommonStore.closeSpi();
         // const res = await download(url, attachmentNames);
         // if(res === 'success'){
         //     message.success('文件下载成功！')
         // }else{
         //     message.success('文件下载失败！')
         // }
      }

   }
}
export default  new DownloadStore();

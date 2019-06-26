import React from 'react';
import { observable, action, toJS} from 'mobx';
import { Modal, message, Input} from 'antd';
import router from 'umi/router';
import {setLocal, getLocal} from 'utils';
import config from 'config';

class HeaderStore{

  //菜单数据
  @observable menuSource = [...config.barData];
  @observable activeIndex = 0
  @observable inputValue = ''
  @observable isActive = false
  @observable isFocus = false


  @action setActive = index =>this.activeIndex = index;
  @action selectItem = (key, path) => {
    setLocal('activeIndex', JSON.stringify(key))
    this.setActive(key);
    router.push(path)
  };
  @action getActive = () => parseInt(getLocal('activeIndex'));
  inputChange = e => {
    const value = e.target.value;
    this.inputValue = value
  }
  inputFocus = () =>  {
    this.isActive = true;
    this.isFocus = true;
  };
  inputBlur = () => {
    if(this.inputValue == ''){
      this.isActive = false;
    };
    this.isFocus = false;
  }
  mouseEnter = () => {
    this.isActive = true;
  }
  mouseLeave = () => {
    if(this.inputValue == '' && !this.isFocus )this.isActive = false;
  }

  //搜索
  searchHander = () => {

  }
  logout = (CommonStore) => {
    Modal.confirm({
      title:'确认退出系统？',
      cancelText:'取消',
      okText:'确认',
      onOk(){
        CommonStore.rest();
      }
    })
  }

  @action jumpBackstage = () => {
    Modal.confirm({
      title:'是否进入后台？',
      okText:'确认',
      cancelText:'取消',
      onOk:()=>{
        let url  = config.backgroundUrl;
        if(window.CommonStore.isLogin){
          url  = config.logWithToken;
          const c = JSON.parse(getLocal('config'));
          url += '?token=' + c.access_token + config.urlParmas;
        }

        window.open(url)
      }
    })
  }
  @action goZYD = () => {
    window.open(config.backHome)
  }



}


export default  new HeaderStore();

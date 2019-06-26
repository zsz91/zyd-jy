import React from  'react'
import {Modal} from 'antd';
const ModalHoc = (options = {}) => WarrperComponent => class extends WarrperComponent {
  render(){
    const store = this.props[this.storeName];
    return(
      <Modal {...store[this.configName]}>
        <WarrperComponent {...this.props}/>
      </Modal>
    )
  }
}
export  default  ModalHoc;

/*
* @params storeName { String}  当前装饰类的 Store Name
* @params configName { String} 在Store Name 里配置的变量名
*
* xxxStore[configName] = { 参考Antd Modal 配置}
* */

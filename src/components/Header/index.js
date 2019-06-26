import React, {Component} from 'react';
import { inject, observer } from 'mobx-react';
import './index.scss';
import { Icon} from 'antd';
import config from 'config';

function NavBarItem ({ data, activeIndex, selectItem}) {
    return(data.map(item => {
        let isTrue = false;
        let fLen = (item.key + '').length;
        let str = (activeIndex + '').substr(0, fLen);
        isTrue =  str == item.key;
        let isChiuldren = item.children;
        return (
            <li key={item.key} className={`zyd-item zyd-header-item-list ${(activeIndex === item.key || isTrue)  && 'active'}`} onClick={()=>{!isChiuldren && selectItem(item.key, item.path)}}>
                {item.value}
                {item.children &&
                <ul>
                    {
                        item.children.map(chilItem => {
                                return (
                                    <li className={( activeIndex === chilItem.key && isTrue) && 'active'}
                                        key={chilItem.key}
                                        onClick={(e)=>{e.stopPropagation();selectItem(chilItem.key, chilItem.path)}}>{chilItem.value}</li>
                                )
                            }
                        )
                    }
                </ul>}
            </li>
        )
    }))
}

@inject('HeaderStore', 'LoginStore', 'CommonStore')
@observer
 class Header extends Component {
  componentDidMount(){
    const {CommonStore: {checkLogin}} = this.props;
    checkLogin()
  }
  login = () => {
    const { LoginStore: { show } } = this.props;
    show()
  }

  render(){
    const {
      HeaderStore: {
        menuSource,
        activeIndex,
        inputValue,
        inputFocus,
        inputBlur,
        mouseEnter,
        mouseLeave,
        isActive,
        inputChange,
        searchHander,
        logout,
        jumpBackstage,
        selectItem,
          goZYD
      },
        CommonStore,
      CommonStore: {
          isLogin,
          userConfig,

      }
    } = this.props;
    return(
      <div className='zyd-header'>
        <div className="zyd-header-title" style={{background: `url(${config.backgroundImg})`}}>
            {(config.leftImg && config.leftImg!=='') && <img src={config.leftImg} className="left-img"/>}
            {(config.rightImg && config.rightImg!=='') && <img src={config.rightImg} className="right-img"/>}
        </div>
        <div className='zyd-NavBar' >
          <ul className={` zyd-nav active`}>
            <NavBarItem
                data={menuSource}
                activeIndex={activeIndex}
                selectItem={selectItem}
            />
          </ul>
          {/*<div className={`zyd-search ${isActive && 'active'}`}*/}
          {/*     onMouseEnter={mouseEnter}*/}
          {/*     onMouseLeave={mouseLeave}*/}
          {/*>*/}
          {/*  <input type="text"*/}
          {/*         value={inputValue}*/}
          {/*         onFocus={inputFocus}*/}
          {/*         onBlur={inputBlur}*/}
          {/*         onChange={inputChange}*/}
          {/*  />*/}
          {/*  <Icon type="search" className="el-icon-search" onClick={searchHander}  />*/}
          {/*</div>*/}
          <div className="zyd-logo"  onClick={goZYD}>
              <Icon type='home' className={"home"}/>
              <span className={"back-home"}>返回主站</span>
          </div>
            <div className="zyd-logo zyd-header-item-list" style={{right:"100px"}}>
                {isLogin ?
                    <span className='user-name'><Icon type="user"/>{ userConfig && userConfig.realname || '用户名'}</span> :
                    <span className='user-name' onClick={this.login}>登录</span>
                }
                <ul className={`${!isLogin && 'active'}`} >
                    <li onClick={jumpBackstage}>跳转后台</li>
                    {isLogin && <li onClick={()=> logout(CommonStore)}>退出登录</li>}
                </ul>
            </div>
        </div>
      </div>
    )
  }
}
export default Header


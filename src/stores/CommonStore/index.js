
import { observable, action, toJS} from 'mobx';
import { setLocal, getLocal, remLocal} from "utils";
import { notification } from 'antd';

class CommonStore {
   @observable isLogin = false;
   @observable userConfig = null;
   @observable config = null;
   @observable spinning = false;

   @action setIsLogin = b => this.isLogin = b;
   @action setSpinning = b => this.spinning = b;
   @action showSpi = () => this.spinning = true;
   @action closeSpi = () => this.spinning = false;
   @action setConfig = obj => {
       if(obj){
           this.config = obj;
           setLocal('config', JSON.stringify(obj))
       }else{
           remLocal('config')
       }

   }
    @action getConfig = () => {
        const c = getLocal('config');
        return this.config ? this.config : c ? JSON.parse(c) : null;
    }

    @action setUserInfo = obj => {
       if(obj){
           this.userConfig = obj;
           setLocal('userInfo', JSON.stringify(obj))
       }else{
           remLocal('userInfo')
       }

    }

    @action getUserInfo = () => {
        const u = getLocal('userInfo');
        return this.userConfig ? this.userConfig : u ? JSON.parse(u) : null;
    }

   @action checkLogin = () => {
       const config = this.getConfig();
       const user = this.getUserInfo();
       if(config)this.config = config;
       if(user){
           this.userConfig = user;
           this.isLogin = true;
       }else{
           this.isLogin = false;
       }
   }

   @action rest = () => {
       this.setUserInfo(null);
       this.setConfig(null);
       this.setIsLogin(false);
   }

    notification = o => {//处理错误提醒之提醒一次
        if(this.timer)clearTimeout(this.timer);
        this.timer = setTimeout(()=>{
            notification.error(o)
        },300)
    }



 }


export default  new CommonStore();

import { observable, action, toJS} from 'mobx';
import { getData, getEnrollmentGuide, getSocialRecruitment, getDossierInfo, getScheduleInfo} from 'api';
import moment from 'moment';
import router from 'umi/router';
import {Modal, Row, Col, message} from 'antd';
import config from 'config';

class HomeStore {
    @observable height = 0;
    @observable carouselData = [];

    @observable Notice = [];//公告通知
    @observable JobAlertsData = [];//就业快讯
    @observable SpecialRecruitmentData = [];//供需见面会
    @observable EnrollmentGuideData = [];//专场招聘会
    @observable DownloadData = [];//资料下载
    @observable SocialRecruitmentData = [];//社会招聘（公司注册发布）
    @observable OnlineJobFairData = [];//网络招聘会
    @observable PolicyGuidanceData = [];//政策指导
    @observable WorkGuideData = [];//办事指南
    @observable calendarValue = moment(new Date()); //当前日期
    @observable hasMsgDay = '';
    @observable fileToParmas = {};
    format = 'YYYY-MM-DD';
    /*
    * 初始化数据
    * */
    @action initData = () => {
        window.CommonStore.setSpinning(true);
        this.requireLogin();
        this.getCarouserData();
        this.JobAlerts();
        this.SpecialRecruitment();
        this.EnrollmentGuide();
        this.getDownload();
        this.getNotice();
        this.getSocialRecruitment();
        this.getOnlineJobFair();
        this.getPolicyGuidance();
        this.getWorkGuide();
        this.getScheduleInfo();//日程
    }
    requireLogin = () => {
        if(window.location.hash.includes('token')){
            let token = window.location.hash.split('?token=')[1];
            window.LoginStore.loginSuccess({access_token: token});
        }
    }
    @action fileToChange = (key, value) => {
        Object.assign(this.fileToParmas, {[key]: value})
    }
    fileToSearch = () => {
        const d = toJS(this.fileToParmas);
        if(!d.studentName || d.studentName === ''){
            message.error('姓名不能为空！');
            return
        }
        if(!d.majorName || d.majorName === ''){
            message.error('专业不能为空！');
            return
        }
        if(!d.graduationYear || d.graduationYear === ''){
            message.error('毕业年份不能为空！');
            return
        }
        this.getDossierInfo();
    }
    fileToRest  = () => {
        this.fileToParmas = {};
    }

    setHeight = (n) => {
        let getEl = () => {
            let car = document.getElementById('Carousel');
            if(car){
                let img = car.getElementsByClassName('car-img');
                return img;
            }
            return false;
        }
        let getHeight = el => el  ? el[0].height : getEl()[0].height;
        setTimeout(() => {
            let el = getEl();
            if(el && el.length >0){
                let h = getHeight(el);
                this.height =  h == 0 ? getHeight(el) - n : h - n;
            }
        },300)

    }
    onCalendar = (o) => {//选择日期
        const day = moment(o._d).format(this.format);
        this.calendarValue = o;
        let currentDay = toJS(this.hasMsgDay);
        if(Array.isArray(currentDay)){
            currentDay.map(item=>{
                if(day === moment(item.hours).format(this.format)){
                    router.push({
                        pathname:'/Schedule',
                        state:{date: day}
                    })
                }
            })
        }
    }

    dateFullCellRender = (o) => {
        const day = moment(o._d).format('DD');
        const time = moment(o._d).format(this.format);
        const current = moment(this.calendarValue._d).format(this.format);
        let cday = toJS(this.hasMsgDay);
        let isActive = false;
        if(Array.isArray(cday)){
            cday.map(item=>{
                if(time === moment(item.hours).format(this.format)){
                    isActive = true;
                }
            })
        }else{
            isActive = time ===  cday;
        }
        return <div className={`date-cell ${isActive && 'active'} ${current === time && 'select'}`}>
            <span>{day}</span>
        </div>

    }
    async getCarouserData(){
        const res = await getData(null,{cid: '73'}, '/api/admin/content/list');
        if(res){
            let data  = [];
            res.map(item=> {
                data.push({
                    title: item.title,
                    img: config.httpServer + item.typeImg
                })
            });
            this.carouselData = data;
            setTimeout(()=>{
                this.setHeight(0)
            },300)
        }
    }

    async JobAlerts(){
        const  res = await getData(null,{cid: '70'}, '/api/admin/content/list');
        if(res) this.JobAlertsData = res;
    }

    async SpecialRecruitment(){
        const  res = await getData(null,{cid: '60'}, '/api/admin/content/list');
        if(res) this.SpecialRecruitmentData = res;
    }

    async EnrollmentGuide(){
        const  res = await getEnrollmentGuide();
        if(res) this.EnrollmentGuideData = res.rows;
    }


    async getNotice(){
        const  res = await getData(null,{cid: '71'}, '/api/admin/content/list');
        if(res) this.Notice = res;
        window.CommonStore.setSpinning(false)
    }
    async getDownload(){
        const  res = await getData(null,{cid: '63'}, '/api/admin/content/list');
        if(res) this.DownloadData = res;
        window.CommonStore.setSpinning(false)
    }
    async getSocialRecruitment(){
        const  res = await getSocialRecruitment({type:'society'});
        if(res) this.SocialRecruitmentData = res.rows;
        window.CommonStore.setSpinning(false)
    }
    async getOnlineJobFair(){
        const  res = await getSocialRecruitment({type:'network'});
        if(res) this.OnlineJobFairData = res.rows;
        window.CommonStore.setSpinning(false)
    }
    async getPolicyGuidance(){
        const  res = await getData(null,{cid: '67'}, '/api/admin/content/list');
        if(res) this.PolicyGuidanceData = res;
        window.CommonStore.setSpinning(false)
    }
    async getWorkGuide(){
        const  res = await getData(null,{cid: '68'}, '/api/admin/content/list');
        if(res) this.WorkGuideData = res;
        window.CommonStore.setSpinning(false)
    }
    async getDossierInfo (){
        const res = await getDossierInfo({...toJS(this.fileToParmas)});
        if(res){
            if(res.length === 0){
                Modal.error({
                    title:'没有更多的数据。'
                });
                return false;
            }
            const d = res[0];
            Modal.success({
                title:'查询结果',
                content:<div>
                    <Row className="top15">
                        <Col span={10} className="align-right bold" style={{paddingRight:'10px'}}>姓名：</Col>
                        <Col span={12} >{d.studentName}</Col>
                    </Row>
                    <Row className="top15">
                        <Col span={10} className="align-right bold" style={{paddingRight:'10px'}}>学号：</Col>
                        <Col span={12} >{d.studentNum}</Col>
                    </Row>
                    <Row className="top15">
                        <Col span={10} className="align-right bold" style={{paddingRight:'10px'}}>专业：</Col>
                        <Col span={12} >{d.majorName}</Col>
                    </Row>
                    <Row className="top15">
                        <Col span={10} className="align-right bold" style={{paddingRight:'10px'}}>档案邮寄地址：</Col>
                        <Col span={12} >{d.dossierAddress}</Col>
                    </Row>
                    <Row className="top15">
                        <Col span={10} className="align-right bold" style={{paddingRight:'10px'}}>档案转递号：</Col>
                        <Col span={12}>{d.dossierNum}</Col>
                    </Row>
                </div>,
                width:600
            })
        }else{
            Modal.error({
                title:'没有更多的数据。'
            });
        }

    }
    async getScheduleInfo(){
        const res  = await getScheduleInfo();
        if(res){
            this.hasMsgDay = res;
        }
    }


}
export default  new HomeStore();

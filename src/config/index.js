
const SystemConfig = window.specialImportantSystemConfig || {} ;
const isDev = process.env.NODE_ENV === 'development';
const baseUrl  = isDev ? 'http://scjoyedu.eicp.net:52334': window.location.origin;
const baseImgPathname = isDev ? '/' : window.location.pathname;


const headerConfig = {
    backgroundImg: `${baseUrl}/config/public/menhu/logo-jy.png`,
    logo:null,
    rightImg:null,
    barData:[
        {key: 0, value: '首页', path: '/Home'},
        {key: 1, value: '院系专业介绍', path: '/MajorIntroduce'},
        {key: 2, value: '公告通知', path: '/Notice'},
        {key: 3, value: '就业快讯', path: '/JobAlerts'},
        {key: 4, value: '双选会', path: '/TwoWay'},
        {key: 5, value: '专场招聘会', path: '/EnrollmentGuide'},
        {key: 6, value: '供需见面会', path: '/SpecialRecruitment'},
        {key: 7, value: '资料下载', path: '/Download'},
        {key: 8, value: '政策指南', path: '/PolicyGuidelines',
            children:[
                {key: 80, value: '政策指导', path: '/PolicyGuidelines/PolicyGuidance'},
                {key: 81, value: '办事指南', path: '/PolicyGuidelines/WorkGuide'}
            ]
        },
        {key: 9, value: '档案查询', path: '/RecordSearch'},
    ]
}

export default {
    _site_id_param:"4",
    urlParmas:'&systemCode=jy',//返回后台系统需要
    backgroundUrl:`${baseUrl}/zyd/#/jy/home`,//跳转后台
    logWithToken: `${baseUrl}/zyd/#/user/loginWithToken`,
    backHome:`${baseUrl}/xgPortal/#/Home`,//返回主站
    yx: `${baseUrl}/yxPortal/#/index`,//迎新网地址
    wx:'',//微信
    wb:'',//微博
    schoolName: '成都中医药大学',
    ...headerConfig,
    ...SystemConfig
}



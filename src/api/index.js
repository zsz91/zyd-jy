import request from 'request';
import config from 'config';
import moment from  'moment';
import router from 'umi/router';

//获取数据的基本参数配置
const baseConfig = {
    _site_id_param:config._site_id_param,
    cid:"",
    siteId:config._site_id_param,
    containDisabled:"false",
    queryRecommend:"false",
    queryOrderBy:"4",
    queryTopLevel:"false"
}
/*
* 登陆
* */
export async function login ( params ){
    return request(`${config.oauthServer}/oauth/token`, {
        method: 'POST',
        body: {
            oauth: true,
            nouaa: true,
            grant_type:'password',
            ...params,
        },
    });
}
/*
获取用户信息
* */
export async function getUserInfo ( params ){
    return request(`${config.permServer}/SysUserApi/queryCurrent`, {
        method: 'POST',
        body:params,
    });
}

/*
*
* 获取新闻相关数据
* */
export async function getData ( params={}, p={}, url='', n) {
    const pStr = {...baseConfig, ...p};
    return request(`${config.httpServer}/CmsApi/${n == 1 ? 'getObject' : 'getArray'}?oauthPub=true`, {
        method: 'POST',
        body:{url: config.cmsSvc + url ,p: JSON.stringify(pStr), ...params},
    })
}

export async function getContent  (params={}, p={}) {
    return request(`${config.httpServer}/CmsApi/getObject?oauthPub=true`, {
        method: 'POST',
        body:{url: config.cmsSvc + '/api/admin/content/get' ,p: JSON.stringify(p), ...params},
    })
}


/*
* 获取栏目内容
* */


export async function getChannel (params={}, p={}) {
    return request(`${config.httpServer}/CmsApi/getObject?oauthPub=true`, {
        method: 'POST',
        body:{url: config.cmsSvc + '/api/admin/channel/get' ,p: JSON.stringify(p), ...params},
    })
}

/*
* 获取文章详情页
* */
export async function getDetail (params={}, p={}){
    window.CommonStore.setSpinning(true)
    const c = {
        title: '',
        time: '',
        isBreadcrumb: true,
        content:'',
    }
    const res = await getContent(params, p);
    window.CommonStore.setSpinning(false)
    if(res){
        c.title = res.title;
        c.tiem =  moment(res.releaseDate).format('YYYY-MM-DD');
        c.content = res.txt;
        router.push({
            pathname: '/ArticleDetail',
            state: c,
        })
    }
}


//获取省份等数据
export async function getEnrollment( params = {}){
    return request(`${config.httpServer}/admissionsApi/admissionsAnalysisInit?oauthPub=true`, {
        method: 'POST',
        body:params,
    });
}

/*
* 获取专场招聘会数据
* */
export async function getEnrollmentGuide( params = {}){
    return request(`${config.httpServer}/JYPortalApi/getSpecialRecruitmentMeetingPage?oauthPub=true`, {
        method: 'POST',
        body:params,
    });
}

/*
* 获取社会招聘
* */

export async function getSocialRecruitment( params = {}){
    return request(`${config.httpServer}/JYPortalApi/getJobPage?oauthPub=true`, {
        method: 'POST',
        body:params,
    });
}

/*
* 查询毕业生档案去向
* */
export async function getDossierInfo( params = {}){
    return request(`${config.httpServer}/JYPortalApi/queryDossierInfo?oauthPub=true`, {
        method: 'POST',
        body:params,
    });
}

/*
* 获取职位详情
* */
export async function getJobDetail( params = {}){
    return request(`${config.httpServer}/JYPortalApi/queryJobDetailInfo?oauthPub=true`, {
        method: 'POST',
        body:params,
    });
}
//跳转到职位详情
export async function JobDetail( params = {}){
    window.CommonStore.showSpi();
    const res  = await getJobDetail(params);
    if(res){
        window.CommonStore.closeSpi();
        router.push({
            pathname:'/JobDetail',
            state:res
        })
    }
}

/*
* 获取单位详情
* */
export async function getComenyDetail( params = {}){
    return request(`${config.httpServer}/JYPortalApi/queryCompanyDetailInfo?oauthPub=true`, {
        method: 'POST',
        body:params,
    });
}
//跳转到单位详情
export async function ComenyDetail( params = {}){
    window.CommonStore.showSpi();
    const res  = await getComenyDetail(params);
    if(res){
        window.CommonStore.closeSpi();
        router.push({
            pathname:'/CompanyDetail',
            state:res
        })
    }
}

/*
* 职位收藏
* */
export async function jobCollect( params = {}){
    return request(`${config.httpServer}/JYPortalApi/jobCollect`, {
        method: 'POST',
        body:params,
    });
}

/*
* 建立投递
* */
export async function resumeDelivery( params = {}){
    return request(`${config.httpServer}/JYPortalApi/resumeDelivery`, {
        method: 'POST',
        body:params,
    });
}

/*
* 专场招聘日程信息
* */

export async function getScheduleInfo( params = {}){
    return request(`${config.httpServer}/JYPortalApi/getSpecialRecruitmentMeetingStatisticsByMonth?oauthPub=true`, {
        method: 'POST',
        body:params,
    });
}

/*
* 热门职位
* */
export async function getHotJob( params = {}){
    return request(`${config.httpServer}/JYPortalApi/getHotJobPage?oauthPub=true`, {
        method: 'POST',
        body:params,
    });
}


/**
 * 通用的数据字典方法
 *
 * */
export function getDictionary(v) {
    return request(`${config.httpServer}/DictionaryApi/getChildList?oauthPub=true`,
        {
            method: 'POST',
            body: { pCode: v, dType: v },
        }
    )
}
/*
* 专场招聘会详情
* */
export function getEnrollmentGuideDetail (params = {}) {
    return request(`${config.httpServer}/JYPortalApi/querySpecialRecruitmentMeetingDetailInfo?oauthPub=true`, {
        method: 'POST',
        body:params,
    });
}

//跳转专场招聘会详情
export async function EnrollmentGuideDetail( params = {}){
    window.CommonStore.showSpi();
    const res  = await getEnrollmentGuideDetail(params);
    if(res){
        window.CommonStore.closeSpi();
        router.push({
            pathname:'/CompanyDetail',
            state:res,
            type:'1'
        })
    }
}

/*
* 单位注册
* */
export async function getRegister( params = {}){
    return request(`${config.httpServer}/JYPortalApi/companyRegister?oauthPub=true`, {
        method: 'POST',
        body:params,
    });
}

/*
* 获取友情链接
* */
export async function getFriendlyLink (p = {}) {
    const pStr = {...baseConfig,...p};
    return request(`${config.httpServer}/CmsApi/getArray?oauthPub=true`, {
        method: 'POST',
        body:{url: config.cmsSvc + '/api/front/friendlink/list' ,p: JSON.stringify(pStr)},
    })
}

/*
获取注册协议
* */

export async function getDeal( params = {}){
    return request(`${config.httpServer}/JYPortalApi/queryCompanyRegisterAgreement?oauthPub=true`, {
        method: 'POST',
        body:params,
    });
}

/*?
* 获取注册页面省市
* */

export async function getPlace( params = {}){
    return request(`${config.httpServer}/JYPortalApi/getPlaceInfo?oauthPub=true`, {
        method: 'POST',
        body:params,
    });
}


/*
* 验证是否可以注册
* */
export async function isReg( params = {}){
    return request(`${config.httpServer}/JYPortalApi/queryIsEnableCompanyReg?oauthPub=true`, {
        method: 'POST',
        body:params,
    });
}











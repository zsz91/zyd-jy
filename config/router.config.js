export default [
    {
        path: '/',
        component: '../layout',
        name: '您当前的位置：',
        routes: [
            {
                path: '/Home',
                name: '首页',
                component: './Home',
            },
            {
                path:'/Notice',
                name:'公告通知',
                component: './Notice',
            },
            {
                path:'/MajorIntroduce',
                name:'院系专业介绍',
                component: './MajorIntroduce',
            },
            {
                path:'/JobAlerts',
                name:'就业快讯',
                component: './JobAlerts',
            },
            {
                path:'/TwoWay',
                name:'双选会',
                component: './TwoWay',
            },
            {
                path:'/EnrollmentGuide',
                name:'专场招聘会',
                component: './EnrollmentGuide',
            },
            {
                path:'/SpecialRecruitment',
                name:'供需见面会',
                component: './SpecialRecruitment',
            },
            {
                path:'/Download',
                name:'资料下载',
                component: './Download',
            },
            {
                path:'/PolicyGuidelines',
                name:'政策指南',
                routes: [
                    {
                        path:'/PolicyGuidelines/PolicyGuidance',
                        name:'政策指导',
                        component: './PolicyGuidance',
                    },
                    {
                        path:'/PolicyGuidelines/WorkGuide',
                        name:'办事指南',
                        component: './WorkGuide',
                    }
                ]
            },
            {
                path:'/RecordSearch',
                name:'档案查询',
                component: './RecordSearch',
            },
            {
                path:'/SocialRecruitment',
                name:'社会招聘（公司注册发布）',
                component: './SocialRecruitment',
            },
            {
                path:'/OnlineJobFair',
                name:'网络招聘会',
                component: './OnlineJobFair',
            },
            {
                path:'/Register',
                name:'注册单位',
                component: './Register',
            },
            {
                path:'/ArticleDetail',
                name:'新闻详情',
                component: './ArticleDetail',
            },
            {
                path:'/Schedule',
                name:'专场招聘日程',
                component: './Schedule',
            },
            {
                path:'/JobDetail',
                name:'职位详情',
                component: './JobDetail',
            },
            {
                path:'/CompanyDetail',
                name:'公司详情',
                component: './CompanyDetail',
            },
            {
                path: '/404',
                name:'404',
                component: './404',
            },
            {
                path: '/500',
                name:'500',
                component: './500',
            }
        ]
    }
]
import config from 'config';
import Deal from 'components/Deal';
export  default {
    updateUrl:'/DispatchUnitApi/saveOrUpdate',
    nameSpan: 9,
    valueSpan: 10,
    sign:'after',
    data:[
        {
            title: '单位名称：', key: 'name', type: 'input',
            width:260,
            rules: {
                required: true,
            }
        },
        {
            title: '用户名：', key: 'userName', type: 'input',
            width:260,
            rules: {
                required: true,
            }
        },
        {
            title: '密码：', key: 'password', type: 'password',
            width:260,
            rules: {
                required: true,

            }
        },
        {
            title: '确认密码：', key: 'password2', type: 'password',
            width:260,
            rules: {
                required: true,
                relevance:{
                    key:'password',
                    condition:'=',
                    message:'两次密码输入不正确。'
                }
            }
        },
        {
            title: '手机号码：', key: 'mobile', type: 'input',
            width:260,
            rules: {
                required: true,
                pattern: /^1[34578]\d{9}$/
            }
        },
        {
            title: '电子邮箱：', key: 'email', type: 'email',
            width:260,
            rules: {
                required: true,
            }
        },
        {
            title: '邮政编码：', key: 'zipCode', type: 'inputNumber',
            width:260,
            rules: {
                required: true,
            }
        },
        {
            title: '联系地址：', key: 'address', type: 'textArea',
            width:260,
            rules: {
                required: true,
            }
        },
        {
            title: '单位网址：', key: 'url', type: 'input',
            width:260,
            rules: {
                required: false,
                pattern: /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/
            }
        },
        {
            title: '单位经济类型：', key: 'financialTypeId', type: 'select',
            width:260,
            filedKey:'id',
            filedValue:'title',
            options:[],
            rules: {
                required: true,
            }
        },
        {
            title: '单位性质：', key: 'natureTypeId', type: 'select',
            width:260,
            filedKey:'id',
            filedValue:'title',
            options:[],
            rules: {
                required: true,
            }
        },
        {
            title: '所属行业：', key: 'industryTypeId', type: 'select',
            width:260,
            filedKey:'id',
            filedValue:'title',
            options:[],
            rules: {
                required: true,
            }
        },
        {
            title: '单位规模：', key: 'scaleId', type: 'select',
            width:260,
            options:[],
            filedKey:'id',
            filedValue:'title',
            rules: {
                required: true,
            }
        },
        {
            title: '注册资金：', key: 'regCapitalId', type: 'select',
            width:260,
            options:[],
            filedKey:'id',
            filedValue:'title',
            rules: {
                required: true,
            }
        },
        {
            title: '成立日期：', key: 'foundTime', type: 'date',
            width:260,
            rules: {
                required: true,
            }
        },
        {
            title: '统一社会信用代码：', key: 'creditCode', type: 'input',
            width:260,
            url: config.httpServer,
            rules: {
                required: true,
            }
        },
        {
            title: '公司LOGO：', key: 'logo', type: 'update',
            rules: {
                required: true,
                type:'png|jpg|jpeg'
            }
        },

/*        {
            title: '组织机构图片：', key: 'organizationCodeImg', type: 'update',
            rules: {
                required: true,
                type:'png|jpg|jpeg'
            }
        },
        {
            title: '营业执照号码：', key: 'businessLicence', type: 'input',
            width:260,
            rules: {
                required: true,
            }
        },
        {
            title: '营业执照图片：', key: 'businessLicenceImg', type: 'update',
            rules: {
                required: true,
                type:'png|jpg|jpeg'
            }
        },*/
        {
            title: '单位联系人：', key: 'contactPerson', type: 'input',
            width:260,
            rules: {
                required: true,
            }
        },
        {
            title: '固定电话：', key: 'phone', type: 'input',
            width:260,
            rules: {
                required: true,
            }
        },
        {
            title: '传真号码：', key: 'fax', type: 'input',
            width:260,
            rules: {
                required: false,
            }
        },
        {
            title: 'QQ号码：', key: 'qq', type: 'inputNumber',
            width:260,
            rules: {
                required: false,
            }
        },
        {
            title: '所在省市：', key: 'placeId', type: 'cascader',
            width:260,
            options:[],
            rules: {
                required: true,
            }
        },
        {
            title: '单位简介：', key: 'intro', type: 'textArea',
            width:260,
            rules: {
                required: true,
            }
        },
        {
            title: '产品信息：', key: 'product', type: 'textArea',
            width:260,
            rules: {
                required: true,
            }
        },
        {
            title: '产品经营范围：', key: 'scaleInfo', type: 'textArea',
            width:260,
            rules: {
                required: true,
            }
        },
        {
            title: '验证码：', key: 'verCode', type: 'code',
            width:260,
            rules: {
                required: true,
            }
        },
        {
            title: '', key: 'subscriber', type: 'checkbox',
            smallTitle:<span>我已阅读 <span className="subscriber"><Deal>《注册协议》</Deal></span></span>,
            rules: {
                type:'deal'
            }
        },
    ]
}

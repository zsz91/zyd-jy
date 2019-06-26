import React, {Component, Fragment} from 'react';
import GVerify from 'components/GVerify';
import {
    Row,
    Col,
    Input,
    InputNumber,
    Select,
    DatePicker,
    Radio,
    Checkbox,
    message,
    Cascader,
    Icon,
    Upload,
    notification
} from 'antd';
import request from 'utils/request';
import config from 'config';
import moment from "moment";

const uploadUrl = config.uploadUrl + '/uploadFileApi/uploadPub?oauthPub=true';
const Option = Select.Option;
const RadioGroup = Radio.Group;
const sign = <i style={{color:'red',padding:'0 3px',position:'absolute',left:'270px',top:'5px'}}>*</i>;
const signUpdate = <i style={{color:'red',padding:'0 3px',position:'absolute',left:'115px',top:'5px'}}>*</i>;
const TextArea = Input.TextArea;

function regEmail(n) {
    const reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
    return reg.test(n);
}

function beforeUpload(file) {
    const isImage = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isImage) {
        message.error('请上传正确图片格式 ‘png，jpg，jpeg’');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('图片不得大于 2M');
    }
    return isImage && isLt2M;
}

const Span = ({ children, valueSpan, style }) => {
    return (
        <Col span={valueSpan}
             style={{...style}}
        >
            {children}
        </Col>)
}

class Form extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource:{},
            loading:false
        }
    }
    componentWillMount() {
        this.__initState();
    }
    GVer = null;
    reset = () => {
        const data = {...this.state.dataSource};
        for(let key in data){
            data[key] = ''
        }
        this.setStates({dataSource:data});

    }
    gVerifys = GVer => this.GVer = GVer;
    setStates = params => this.setState(() => ({ ...params }));
    __handelChange = (value, key) => {
        const data = this.state.dataSource;
        Object.assign(data, { [key]: value });
        this.setStates({ dataSource: data ,btnDisabled:false});
    }
    __remaind = msg => message.warning(msg);
    submit = () => {
        const {config, config:{data, autoSubmit, updateUrl}, dataSource } = this.state;
        let item = null,
            value = null,
            type = null;
        for (let i = 0, len = data.length; i < len; i++) {
            item = data[i];
            value = dataSource[item.key];
            type = item.type;
            if (item.rules && item.rules.required) {
                if ((value !== 0 && !value) ||  value === '') {
                    this.__remaind(
                        <div>
                            {item.title}
                            不能为空
                        </div>
                    );
                    return false;
                }
                if (item.rules.min || (item.rules.min == 0 && value < item.rules.min)) {
                    this.__remaind(
                        <div>
                            {item.title}
                            的内容不能小于
                            {item.rules.min}
                        </div>
                    );
                    return false;
                }
                if (item.rules.len || (item.rules.len == 0 && value.length < parseInt(item.rules.len))) {
                    this.__remaind(
                        <div>
                            {item.title}
                            的内容不能小于
                            {item.rules.len}
                            字符
                        </div>
                    );
                    return false;
                }
                if (item.rules.max || (item.rules.max == 0 && value > item.rules.max)) {
                    this.__remaind(
                        <div>
                            {item.title}
                            的内容不能大于
                            {item.rules.max}
                        </div>
                    );
                    return false;
                }
                if (item.rules.len || (item.rules.len == 0 && value.length > parseInt(item.rules.len))) {
                    this.__remaind(
                        <div>
                            {item.title}
                            的内容不能大于
                            {item.rules.len}
                            字符
                        </div>
                    );
                    return false;
                }
                if (type === 'email' && !regEmail(value)) {
                    this.__remaind(
                        <div>
                            请填写正确的
                            {item.title}
                        </div>
                    );
                    return false;
                }
                if (item.rules.pattern && !item.rules.pattern.test(value)) {
                    this.__remaind(
                        <div>
                            {item.rules.message || (
                                <span>
                                    请填写正确的
                                    {item.title}
                                </span>
                            )}
                        </div>
                    );
                    return false;
                }
                let relevance = item.rules.relevance;
                if(relevance && relevance.key){
                    for (let j = 0, len = data.length; j < len; j++) {
                        if(data[j].key === relevance.key){
                            let v = dataSource[relevance.key];
                            if(relevance.condition){
                                if(relevance.condition === '=' && value !== v){
                                    this.__remaind(<div>{relevance.message}</div>);
                                    return false;
                                }
                                if(relevance.condition === '>' && parseInt(value) <= parseInt(v)){
                                    this.__remaind(<div>{relevance.message}</div>);
                                    return false;
                                }
                                if(relevance.condition === '<' && parseInt(value) >= parseInt(v)){
                                    this.__remaind(<div>{relevance.message}</div>);
                                    return false;
                                }
                            }
                        }
                    }


                }
            }

            if(item.type === 'code' && !this.GVer.validate(dataSource[item.key])){
                message.error('验证码输入错误！');
                return false
            }
            if(item.rules && item.rules.type === 'deal' && !dataSource[item.key]){
                message.error('请确认您已经认真阅读注册协议书！');
                return false
            }
        }
        return dataSource;
    }
    update (params, url){
        return new Promise((resolve, inject)=>{
            const data = {...this.state.oldDataSource, ...params};
            request(config.httpServer + url,{
                method:'POST',
                body: data
            }).then((res)=>{
                message.success('保存成功！');
                this.setStates({loading: false, btnDisabled:true});
                this.props.onSubmitSuccess && this.props.onSubmitSuccess(res, this)
                resolve('success')
            }).catch((res)=>{
                message.error('保存失败！');
                this.setStates({loading: false, btnDisabled:false});
                this.props.onSubmitError && this.props.onSubmitError(res, this);
                inject('error')
            })
        })

    }
    updateChange = (info, key, item) => {

        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            const response = info.file.response;
            if (response.errCode === '' || response.errCode === null) {
                const { url } = response;
                this.setStates({loading: false});
                this.__handelChange(url, key)
            } else {
                notification.error({
                    message: '上传失败', description: response.errMsg,
                });
            }
        }
    }
    __initState = () =>{
        const state = {
            config:{...this.props.config},
            loading:false,
            btnDisabled:true,
        };
        Object.assign(this.state ? this.state : {}, state);
        this.__setData();
    }
    async  __setData (){
        const state = this.state;
        const { config: {initUrl, params, data} } = state;
        const isData = JSON.stringify(state.dataSource) === '{}';
        const source = {};
        if(initUrl && initUrl !== ''){
            const res = await request(apiUrl+initUrl,{
                method:'POST',
                body: params
            });
            if(res){
                data.map(({ key }) => Object.assign(source, { [key]: res[key] }));
                state.dataSource = source;
                state.oldDataSource =  res;
            }
        }else{
            data.map(({ key }) => Object.assign(source, { [key]: '' }));
            if(this.props.dataSource){
                Object.assign(source, {...this.props.dataSource});
            }
        }
        if(isData )state.dataSource = source;
        this.setStates({ ...state });
    }
    render() {
        const { state } = this;
        const uploadButton = (
            <div>
                <Icon type={state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">上传</div>
            </div>
        );
        return (
            <Row>
                { state.config &&  state.config.data.map(item => {
                    const { key, title, type } = item;
                    const value = state.dataSource[key];
                    let required = false;
                    let disabled = false;
                    if(item.rules ){
                        if(item.rules.required)required = true;
                        if(item.rules.disabled)disabled = true;
                    }
                    return (
                        <Fragment>
                            <Span valueSpan={item.nameSpan || state.config.nameSpan || 10} style={{textAlign:'right',marginTop:'15px',minHeight:'33px'}}>
                                <div style={{ lineHeight: `${(type === 'checkbox' || type === 'radio') ? '22px' : '30px'}` }}>
                                    {required  && (!state.config.sign || state.config.sign === 'before' ) && sign}{title}
                                </div>
                            </Span>
                            <Span valueSpan={item.valueSpan || state.config.valueSpan || 12} style={{textAlign:'left',marginTop:'15px',minHeight:'33px',paddingLeft:'10px',position:'relative'}}>
                                {type === 'input' ? (
                                    <Input
                                        className='form-width'
                                        value={value}
                                        disabled={disabled}
                                        style={{width:`${item.width+'px' || '100%'}`}}
                                        onChange={e => this.__handelChange(e.currentTarget.value, key)}
                                    />
                                ) : type === 'select' ? (
                                    <Select
                                        style={{width:`${item.width+'px' || '100%'}`}}
                                        defaultValue={value}
                                        disabled={disabled}
                                        onChange={value => this.__handelChange(value, key)}
                                    >
                                        {item.options && item.options.map((o) => (
                                            <Option value={o[item.filedKey]}>{o[item.filedValue]}</Option>
                                        ))}
                                    </Select>
                                ) : type === 'date' ? (
                                    <div style={{ width: '100%', display: 'inline-block' }}>
                                        <DatePicker
                                            placeholder="请选择日期"
                                            style={{width:`${item.width+'px' || '100%'}`}}
                                            format={item.dateFormat}
                                            disabled={disabled}
                                            defaultValue={value ? moment(value, item.dateFormat) : null }
                                            onChange={(e, value) => this.__handelChange(value, key)}
                                        />
                                    </div>
                                ) : type === 'inputNumber' ? (
                                    <InputNumber
                                        style={{width:`${item.width+'px' || '100%'}`}}
                                        value={value}
                                        disabled={disabled}
                                        onChange={value => this.__handelChange(value, key)}
                                    />
                                ) : type === 'checkbox' ? (
                                    <Checkbox
                                        checked={value}
                                        disabled={disabled}
                                        onChange={e =>{ this.__handelChange(e.target.checked, key);e.stopPropagation()}}
                                    >
                                        <span className='form-smallTitle'>{item.smallTitle}</span>
                                    </Checkbox>
                                ) : type === 'radio' ? (
                                    <RadioGroup
                                        onChange={e => this.__handelChange(e.target.value, key)}
                                        disabled={disabled}
                                        value={value}>
                                        {
                                            item.options.map(o=>(<Radio value={o[item.filedKey]}>{o[item.filedValue]}</Radio>))
                                        }
                                    </RadioGroup>
                                ) : type === 'password' ? (
                                    <Input.Password
                                        style={{width:`${item.width+'px' || '100%'}`}}
                                        value={value}
                                        disabled={disabled}
                                        onChange={e => this.__handelChange(e.currentTarget.value, key)}
                                    />
                                ) : type === 'email' ? (
                                    <Input
                                        style={{width:`${item.width+'px' || '100%'}`}}
                                        value={value}
                                        type="email"
                                        disabled={disabled}
                                        onChange={e => this.__handelChange(e.currentTarget.value, key)}
                                    />
                                ) : type === 'textArea' ? (
                                    <TextArea row={item.row || 3}
                                              style={{width:`${item.width+'px' || '100%'}`}}
                                              value={value}
                                              disabled={disabled}
                                              onChange={e => this.__handelChange(e.currentTarget.value, key)}
                                    />
                                ):  type === 'cascader' ? (
                                    <Cascader options={item.options || []}
                                              // value={this.getCascaderValue(value, item.options)}
                                              onChange={value => {
                                                  let v = value[value.length - 1];
                                                  this.__handelChange(v, key)
                                              }}
                                              placeholder={'请选择'}
                                              style={{width:`${item.width+'px' || '100%'}`}}
                                              disabled={disabled}
                                    />
                                ) : type === 'update' ? (
                                    <Upload
                                        name="file"
                                        listType="picture-card"
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        action={uploadUrl}
                                        onChange={info=>this.updateChange(info, key, item)}
                                        beforeUpload={beforeUpload}
                                    >
                                        {value && value !=='' ? <img src={value} alt="avatar" /> : uploadButton}
                                    </Upload>
                                ) : type === 'code' ? (
                                    <div>
                                        <Input
                                            style={{width:'120px',verticalAlign:'top',marginRight:'10px'}}
                                            value={value}
                                            disabled={disabled}
                                            onChange={e => this.__handelChange(e.currentTarget.value, key)}
                                        />
                                        <GVerify  gVerify={this.gVerifys}/>
                                    </div>
                                ) : (
                                    <Input
                                        style={{width:`${item.width+'px' || '100%'}`}}
                                        value={value}
                                        disabled={disabled}
                                        onChange={e => this.__handelChange(e.currentTarget.value, key)}
                                    />
                                )}
                                {required && state.config.sign === 'after' &&  (type === 'update' ?  signUpdate : sign)}
                            </Span>
                        </Fragment>
                    );
                })}
            </Row>
        )
    }
}

export default Form;

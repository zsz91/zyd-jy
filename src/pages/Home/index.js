import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {Button, Row, Col, Card,  Carousel, Calendar, Input, Empty} from 'antd';
import { format, setLocal } from 'utils';
import './index.scss';
import {getDetail, ComenyDetail, EnrollmentGuideDetail} from 'api';
import router from 'umi/router';
import image from 'assets/images/双选会banner.png';
import image1 from 'assets/images/大学生职业测评与规划系统banner.png';

function CardItem ({data, onClick, height}) {
    return (
        <div className="CardItem" style={{height:`${height}px`}}>
            {
                data.length > 0 ? data.map((item, index) => (
                <div className="zyd-card-content-item" key={index} onClick={()=>onClick(item)}>
                    <span className="text">{item.title}</span>
                    <span className="time">{format(item.releaseDate, 'date')}</span>
                </div>
            )) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            }
        </div>
    )
}
function GuideCardItem({data, onClick, height, titleKey, timeKey}){
    return (
        <div className="CardItem" style={{height:`${height}px`}}>
            {
                data.length > 0 ?  data.map((item, index) => (
                <div className="zyd-card-content-item" key={index} onClick={()=>onClick(item)}>
                    <span className="text">{item[titleKey]}</span>
                    <span className="time">{format(item[timeKey], 'date')}</span>
                </div>
            )) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            }
        </div>
    )
}
function RenderCard({title, url, index, data, height, isLeft}){
    return (
        <div className={`zyd-flex-item ${ isLeft && 'marLeft-15'}`}>
            <Card
                title={<span className='big-title theme'>{title}</span>}
                size="small"
                extra={<a className='title-more' onClick={()=>{router.push(url);setLocal('activeIndex', index)}}>更多></a>}
                className={'zyd card-height'}
            >
                <CardItem data={data} onClick={item=>getDetail(null, {id: item.id+''})} height={height}/>
            </Card>
        </div>
    )
}

@inject('HomeStore','HeaderStore')
@observer
class Home extends Component {
    componentWillMount() {
        this.props.HomeStore.initData();
    }
    componentDidMount() {
        const {
            HeaderStore,
            HomeStore: {
                setHeight
            }
        }  = this.props;
        HeaderStore.setActive(0);
        window.onresize = function () {
            setHeight(0);
        }
    }
    componentWillUnmount(){
        window.onresize = null;
    }
    render() {
        const {
            HomeStore:{
                carouselData,
                height,
                onCalendar,
                Notice,
                JobAlertsData,
                SpecialRecruitmentData,
                EnrollmentGuideData,
                dateFullCellRender,
                DownloadData,
                SocialRecruitmentData,
                OnlineJobFairData,
                PolicyGuidanceData,
                WorkGuideData,
                fileToChange,
                fileToSearch,
                fileToRest,
                fileToParmas
            }
        } = this.props;

        let firstHeight = 319;
        let allHeihgt = 177;
        return (
            <div className="Home">
                <div className="carousel" style={{height:height + 'px'}} id={"Carousel"}>
                    <Carousel autoplay  height={height+'px'} easing="liner">
                        {
                            carouselData.map((item, index) => (
                                <img  key={index} className='car-img'  width='100%' height={400} src={item.img}/>
                            ))
                        }
                    </Carousel>
                </div>
                <Row className="top20 zyd-flex">
                    <RenderCard title={'公告通知'} url={'/Notice'} index={'2'} data={Notice} height={firstHeight} isLeft={false}/>
                    <div className="zyd-flex-item marLeft-15">
                        <Card
                            title={<span className='big-title theme'>专场招聘日程</span>}
                            size="small"
                            extra={<a className='title-more' onClick={()=>{router.push('/Schedule');setLocal('activeIndex', 'null')}}>所有招聘></a>}
                            className={'zyd card-height'}
                        >
                            <Calendar fullscreen={false} onSelect={onCalendar}  dateFullCellRender={dateFullCellRender}/>
                        </Card>

                    </div>
                </Row>
                <Row className="top20 zyd-flex pointer">
                    <img src={image} alt="" style={{width:'100%'}}/>
                </Row>

                <Row className="top20 zyd-flex">
                    <RenderCard title={'就业快讯'} url={'/JobAlerts'} index={'3'} data={JobAlertsData} height={allHeihgt} isLeft={false}/>
                    <RenderCard title={'供需见面会'} url={'/SpecialRecruitment'} index={'6'} data={SpecialRecruitmentData} height={allHeihgt} isLeft={true}/>
                    <div className="zyd-flex-item marLeft-15">
                        <Card
                            title={<span className='big-title theme'>毕业生档案去向</span>}
                            size="small"
                            className={'zyd card-height'}
                        >
                            <Row className="top10">
                                <Col span={8} className="align-right">姓名：</Col>
                                <Col span={10}><Input value={fileToParmas.studentName || ''}
                                                      onChange={e=>fileToChange('studentName', e.target.value)}/></Col>
                            </Row>
                            <Row className="top5">
                                <Col span={8} className="align-right">专业：</Col>
                                <Col span={10}><Input value={fileToParmas.majorName || ''}
                                                      onChange={e=>fileToChange('majorName', e.target.value)}/></Col>
                            </Row>
                            <Row className="top5">
                                <Col span={8} className="align-right">毕业年份：</Col>
                                <Col span={10}><Input value={fileToParmas.graduationYear || ''}
                                                      placeholder={'格式如： 2019'}
                                                      onChange={e=>fileToChange('graduationYear', e.target.value)}/></Col>
                            </Row>
                            <Row className="top5 center" style={{marginBottom:'10px'}}>
                                <Button className="button-reset marRight-5" onClick={fileToRest}>重置</Button>
                                <Button className="button-search marLeft-5" onClick={fileToSearch}>查询</Button>
                            </Row>
                        </Card>
                    </div>
                </Row>


                <Row className="top20 zyd-flex">
                    <div className="zyd-flex-item">
                        <Card
                            title={<span className='big-title theme'>专场招聘会</span>}
                            size="small"
                            extra={<a className='title-more' onClick={()=>{router.push('/EnrollmentGuide');setLocal('activeIndex', '5')}}>更多></a>}
                            className={'zyd card-height'}
                        >
                            <GuideCardItem data={EnrollmentGuideData}
                                           height={allHeihgt}
                                           titleKey={'meetingName'}
                                           timeKey={'hours'}
                                           onClick={d=>EnrollmentGuideDetail({id:d.id})}/>
                        </Card>
                    </div>

                    <div className="zyd-flex-item marLeft-15">
                        <Card
                            title={<span className='big-title theme'>社会招聘（公司注册发布）</span>}
                            size="small"
                            extra={<a className='title-more' onClick={()=>{router.push('/SocialRecruitment');setLocal('activeIndex', 'null')}}>更多></a>}
                            className={'zyd card-height'}
                        >
                            <GuideCardItem data={SocialRecruitmentData}
                                           height={allHeihgt}
                                           titleKey={'companyName'}
                                           timeKey={'beginTime'}
                                           onClick={d=>ComenyDetail({companyId:d.companyId})}/>
                        </Card>
                    </div>
                    <div className="zyd-flex-item marLeft-15">
                        <Card
                            title={<span className='big-title theme'>网络招聘会</span>}
                            size="small"
                            extra={<a className='title-more' onClick={()=>{router.push('/OnlineJobFair');setLocal('activeIndex', 'null')}}>更多></a>}
                            className={'zyd card-height'}
                        >
                            <GuideCardItem data={OnlineJobFairData}
                                           height={allHeihgt}
                                           titleKey={'companyName'}
                                           timeKey={'beginTime'}
                                           onClick={d=>ComenyDetail({companyId:d.companyId})}/>
                        </Card>
                    </div>
                </Row>


                <Row className="top20 zyd-flex">
                    <RenderCard title={'资料下载'} url={'/Download'} index={'7'} data={DownloadData} height={allHeihgt} isLeft={false}/>
                    <RenderCard title={'政策指导'} url={'/PolicyGuidelines/PolicyGuidance'} index={'80'} data={PolicyGuidanceData} height={allHeihgt} isLeft={true}/>
                    <RenderCard title={'办事指南'} url={'/PolicyGuidelines/WorkGuide'} index={'81'} data={WorkGuideData} height={allHeihgt} isLeft={true}/>
                </Row>
                <Row className="top20 zyd-flex pointer">
                    <img src={image1} alt="" style={{width:'100%'}}/>
                </Row>
            </div>
        )
    }
}
export default Home;


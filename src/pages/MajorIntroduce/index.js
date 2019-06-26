import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PhotoCard from 'components/PhotoCard';
import { getDetail } from 'api';
import Breadcrumbs from 'components/Breadcrumbs';

@inject('MajorIntroduceStore', 'HeaderStore')
@observer
class MajorIntroduce extends Component {
    componentDidMount() {
        const {
            MajorIntroduceStore,
            HeaderStore
        } = this.props;
        HeaderStore.setActive(1);
        MajorIntroduceStore.init();
    }
    render() {
        const {
            MajorIntroduceStore:{
                dataSource
            }
        } = this.props;
        return (
            <div className='MajorIntroduce'>
                <Breadcrumbs/>
                {
                    dataSource.map((item, index)=>(
                        <PhotoCard {...item} key={index} onClick={data=>getDetail(null, {id: data.id+''})}/>
                    ))
                }
            </div>
        )
    }
}
export default MajorIntroduce;

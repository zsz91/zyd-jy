import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { toJS } from "mobx";
import Table from 'components/Table';

@inject('SocialRecruitmentStore', 'HeaderStore')
@observer
class SocialRecruitment extends Component {
    componentDidMount() {
        const { HeaderStore, SocialRecruitmentStore, } = this.props;
        HeaderStore.setActive(HeaderStore.getActive());
        SocialRecruitmentStore.init();
    }
    render() {
        return (
            <div className='SocialRecruitment'>
                <Table {...toJS(this.props.SocialRecruitmentStore)}/>
            </div>
        )
    }
}
export default SocialRecruitment;

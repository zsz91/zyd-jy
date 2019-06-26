import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { toJS } from "mobx";
import Table from 'components/Table';

@inject('SpecialRecruitmentStore', 'HeaderStore')
@observer
class SpecialRecruitment extends Component {
    componentDidMount() {
        const { HeaderStore, SpecialRecruitmentStore, } = this.props;
        HeaderStore.setActive(6);
        SpecialRecruitmentStore.init();
    }
    render() {
        return (
            <div className='SpecialRecruitment'>
                <Table {...toJS(this.props.SpecialRecruitmentStore)}/>
            </div>
        )
    }
}
export default SpecialRecruitment;

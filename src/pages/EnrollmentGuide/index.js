import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { toJS } from "mobx";
import Table from 'components/Table';

@inject('EnrollmentGuideStore', 'HeaderStore')
@observer
class EnrollmentGuide extends Component {
    componentDidMount() {
        const { HeaderStore, EnrollmentGuideStore, } = this.props;
        HeaderStore.setActive(5);
        EnrollmentGuideStore.init();
    }
    render() {
        return (
            <div className='EnrollmentGuide'>
                <Table {...toJS(this.props.EnrollmentGuideStore)}/>
            </div>
        )
    }
}
export default EnrollmentGuide;

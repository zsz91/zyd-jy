import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { toJS } from "mobx";
import Table from 'components/Table';

@inject('WorkGuideStore', 'HeaderStore')
@observer
class WorkGuide extends Component {
    componentDidMount() {
        const { HeaderStore, WorkGuideStore, } = this.props;
        HeaderStore.setActive(81);
        WorkGuideStore.init();
    }
    render() {
        return (
            <div className='WorkGuide'>
                <Table {...toJS(this.props.WorkGuideStore)}/>
            </div>
        )
    }
}
export default WorkGuide;

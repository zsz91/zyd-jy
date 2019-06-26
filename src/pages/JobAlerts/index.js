import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { toJS } from "mobx";
import Table from 'components/Table';

@inject('JobAlertsStore', 'HeaderStore')
@observer
class JobAlerts extends Component {
    componentDidMount() {
        const { HeaderStore, JobAlertsStore, } = this.props;
        HeaderStore.setActive(3);
        JobAlertsStore.init();
    }
    render() {
        return (
            <div className='JobAlerts'>
                <Table {...toJS(this.props.JobAlertsStore)}/>
            </div>
        )
    }
}
export default JobAlerts;

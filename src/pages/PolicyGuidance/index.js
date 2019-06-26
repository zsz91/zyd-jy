import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { toJS } from "mobx";
import Table from 'components/Table';

@inject('PolicyGuidanceStore', 'HeaderStore')
@observer
class PolicyGuidance extends Component {
    componentDidMount() {
        const { HeaderStore, PolicyGuidanceStore, } = this.props;
        HeaderStore.setActive(80);
        PolicyGuidanceStore.init();
    }
    render() {
        return (
            <div className='PolicyGuidance'>
                <Table {...toJS(this.props.PolicyGuidanceStore)}/>
            </div>
        )
    }
}
export default PolicyGuidance;

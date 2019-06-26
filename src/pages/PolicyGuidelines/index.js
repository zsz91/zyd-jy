import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { toJS } from "mobx";
import Table from 'components/Table';

@inject('PolicyGuidelinesStore', 'HeaderStore')
@observer
class PolicyGuidelines extends Component {
    componentDidMount() {
        const { HeaderStore, PolicyGuidelinesStore, } = this.props;
        HeaderStore.setActive(HeaderStore.getActive());
        PolicyGuidelinesStore.init();
    }
    render() {
        return (
            <div className='PolicyGuidelines'>
                <Table {...toJS(this.props.PolicyGuidelinesStore)}/>
            </div>
        )
    }
}
export default PolicyGuidelines;

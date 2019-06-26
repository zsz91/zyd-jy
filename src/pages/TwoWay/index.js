import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { toJS } from "mobx";
import Table from 'components/Table';

@inject('TwoWayStore', 'HeaderStore')
@observer
class TwoWay extends Component {
    componentDidMount() {
        const { HeaderStore, TwoWayStore, } = this.props;
        HeaderStore.setActive(4);
        TwoWayStore.init();
    }
    render() {
        return (
            <div className='TwoWay'>
                <Table {...toJS(this.props.TwoWayStore)}/>
            </div>
        )
    }
}
export default TwoWay;

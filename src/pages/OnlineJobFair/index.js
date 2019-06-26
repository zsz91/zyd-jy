import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { toJS } from "mobx";
import Table from 'components/Table';

@inject('OnlineJobFairStore', 'HeaderStore')
@observer
class OnlineJobFair extends Component {
    componentDidMount() {
        const { HeaderStore, OnlineJobFairStore, } = this.props;
        HeaderStore.setActive(HeaderStore.getActive());
        OnlineJobFairStore.init();
    }
    render() {
        return (
            <div className='OnlineJobFair'>
                <Table {...toJS(this.props.OnlineJobFairStore)}/>
            </div>
        )
    }
}
export default OnlineJobFair;

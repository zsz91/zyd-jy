import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {toJS} from "mobx";
import Table from 'components/Table';

@inject('NoticeStore', 'HeaderStore')
@observer
class Notice extends Component {
    componentDidMount() {
        const { HeaderStore, NoticeStore } = this.props;
        HeaderStore.setActive(2);
        NoticeStore.init();
    }
    render() {
        return (
            <div className='Notice'>
                <Table {...toJS(this.props.NoticeStore)}/>
            </div>
        )
    }
}
export default Notice

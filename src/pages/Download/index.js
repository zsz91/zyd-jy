import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { toJS } from "mobx";
import Table from 'components/Table';

@inject('DownloadStore', 'HeaderStore')
@observer
class Download extends Component {
    componentDidMount() {
        const { HeaderStore, DownloadStore, } = this.props;
        HeaderStore.setActive(7);
        DownloadStore.init();
    }
    render() {
        return (
            <div className='Download'>
                <Table {...toJS(this.props.DownloadStore)}/>
            </div>
        )
    }
}
export default Download;

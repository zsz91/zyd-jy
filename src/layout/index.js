import React,{ Component, Fragment} from 'react';
import Redirect from 'umi/redirect';
import {observer, Provider} from 'mobx-react';
import stores from 'stores';
import { BackTop, Spin} from 'antd';
import 'src/index.scss';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Login from 'components/Login';
import './index.scss';
import config from '../config/index';

@observer
 class BasicLayout extends Component {

    componentDidMount() {
        document.title = config.schoolName + "就业网";
    }
    render() {
        const height = document.documentElement.clientHeight;
        let children  = this.props.children;
        if (this.props.location.pathname === '/')return(<Redirect to="/Home"/>);//根路径时指定为Home
        return (
            <Provider {...stores}>
                <Fragment>
                    <Header/>
                    <div className="app-container" style={{minHeight: `${height - 288}PX`}}>{ children }</div>
                    <Footer/>
                    <Login/>
                    <BackTop/>
                    <Spin size="large" spinning={window.CommonStore.spinning} style={{position:'absolute',left:'50%',top:'400px',zIndex:'99999'}}/>
                </Fragment>
            </Provider>
        )
    }
}

export default BasicLayout;

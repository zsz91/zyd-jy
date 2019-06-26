import React, {Component, Fragment} from 'react';
import {getDeal} from 'api';
import {Modal} from "antd";

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deal:''
        }
    }

    componentDidMount() {
    this.init();
    }
    async init(){
        const  deal = await getDeal();
        if(deal){
            this.setState({deal})
        }
    }
    show = e => {
        let deal = this.state.deal;
        e.stopPropagation();
        Modal.info({
            title:deal.remark || '单位注册协议书',
            content: deal.value || ''
        })
    };

    render() {
        return (
            <span onClick={this.show}>
                {this.props.children}
            </span>
        );
    }
}

export default Index;

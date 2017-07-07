import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Link} from 'react-router-dom';
import {Route} from 'react-router-dom';

import api from '../../common/api.js';
import Home from './HomePage';

import 'whatwg-fetch';
require('pubsub-js/src/pubsub.js');

let timer = null;

class Address extends Component{
    constructor() {
        super();
        this.state = {
            keyword: '',
            addressData: '',
            offset: 0,
            limit: 20,
            address: ''
        }
    }

    render(){
        return (
            <ReactCSSTransitionGroup transitionName={{
				appear: 'slideInRight',
				appearActive: 'slideInRight'
			}} transitionAppear={true} transitionAppearTimeout={500}
                                     transitionEnter={false} transitionLeave={false}>
                <div id="address">
                    <div className="returnHeader">
                        <div className="return">
                            <i className="iconfont" onClick={this.goBack.bind(this)}>
                            </i>
                            <span>选择地址</span>
                        </div>
                        <div>
                            <input ref="in" className="search" type="text" placeholder="请输入地址" onChange={this.inputHandle.bind(this)}/>
                        </div>
                    </div>
                    <div className="addressContent">
                        {
                            this.state.addressData == '' ? '' : this.state.addressData.map((item, index) => {
                                return (
                                    <div className="addresscell"  key={index} onClick={this.change.bind(this, item.longitude, item.latitude)}>
                                        <p className="addresscell1">{item.name}</p>
                                        <p className="addresscell2">{item.address}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

            </ReactCSSTransitionGroup>

        )
    }
    change(item1, item2) {
        PubSub.publish('data', {positionInfo: {item1, item2}});
        this.props.history.goBack();
    }
    inputHandle() {
        var val = this.refs.in.value;
        clearTimeout(timer);
        timer = setTimeout(() => {
            if (val) {
                fetch(`${api.searchAddress}?keyword=${val}&offset=${this.state.offset}&limit=${this.state.limit}`)
                    .then((response)=>{
                        return response.json();
                    })
                    .then((jsonData)=>{
                        this.setState({addressData: jsonData, address: val});
                    });
            } else {
                this.setState({address: '', addressData: ''});
            }
        }, 500);
    }

    goBack(){
        const addressEle = document.querySelector('#address');
        addressEle.className = 'slideOutRight';
        setTimeout(()=>{
            this.props.history.goBack();
        }, 500);
    }
}

export default Address;
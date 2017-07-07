import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import DetailHead from '../components/DetailHead.js';
import ShopDetail from '../components/ShopDetail';
import {Route} from 'react-router-dom';

import MenuviewLeft from '../components/MenuviewLeft';
import MenuviewRight from '../components/MenuviewRight';

import api from '../../common/api.js';
import 'whatwg-fetch';

class Detail extends Component{
    constructor() {
        super();
        this.state = {
            positionInfo: '',
            listData: '',
            menuData: ''
        }
    }

    componentWillMount() {
        let positionInfo = this.props.location.state.positionInfo;
        let id = this.props.location.state.id;

        let {longitude: l, latitude: t} = (positionInfo === undefined ?  '' : positionInfo);
        this.setState({positionInfo: positionInfo});

        //请求列表数据
        fetch(`${api.detail}/${id}?longitude=${l}&latitude=${t}&extras[]=activities&extras[]=albums&extras[]=license&extras[]=identification`)
            .then((response)=>{
                return response.json();
            })
            .then((jsonData)=>{
                this.setState({listData: jsonData});
            });

        fetch(`${api.menu}?restaurant_id=${id}`)
            .then((response)=>{
                return response.json();
            })
            .then((jsonData)=>{
                this.setState({menuData: jsonData});
            });
    }

    render(){
        return (
            <ReactCSSTransitionGroup transitionName={{
                appear: 'slideInRight',
                appearActive: 'slideInRight'
            }} transitionAppear={true} transitionAppearTimeout={500}
                                     transitionEnter={false} transitionLeave={false}>
                <div id="detail">
                    <div className="detail-head">
                        <div className="back">
                            <i className="iconfont arrowLeft2" onClick={this.goBack.bind(this)}>
                            </i>
                        </div>
                        <DetailHead data={this.state.listData}/>
                    </div>
                    <div className="shop-tab">
                        <div className="shop-tab-left">
                            <span className="shop-tab-left-title">
                                商品
                            </span>
                        </div>
                        <div className="shop-tab-right">
                            <span className="shop-tab-title">
                                评价
                            </span>
                        </div>
                    </div>
                    <div className="menuview">
                        <MenuviewLeft data={this.state.menuData}/>
                        <MenuviewRight data={this.state.menuData}/>
                    </div>
                    <div className="shop-bottom">
                        <span className="shop-cart">
                            <i className="iconfont"></i>
                        </span>
                        <div className="shop-bottom-c">
                            <p>￥0</p>
                            <p>配送费￥4</p>
                        </div>
                        <a href="#" className="enter">￥30起送</a>
                    </div>
                </div>
                <Route path="/home/shop/detail" component={ShopDetail} />
            </ReactCSSTransitionGroup>

        )
    }

    goBack(){
        const addressEle = document.querySelector('#detail');
        addressEle.className = 'slideOutRight';
        setTimeout(()=>{
            this.props.history.goBack();
        }, 500);
    }
}

export default Detail;
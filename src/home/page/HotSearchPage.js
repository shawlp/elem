/**
 * Created by Administrator on 2017/6/21 0021.
 */
import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Route} from 'react-router-dom';

import List from '../components/HotSearchList.js';

import api from '../../common/api.js';
import Detail from './DetailPage';
import 'whatwg-fetch';

class HotSearch extends Component{
    constructor() {
        super();
        this.state = {
            keyword: '',
            listData: [],
            offset: 0,
            limit: 20,
            homeScroll: null
        };
    }

    componentWillMount() {
        let positionInfo = this.props.location.state.positionInfo;
        let {longitude: l, latitude:t} = positionInfo;

        console.log(`${api.keylist}?keyword=${this.props.location.state.word}&longitude=${l}&latitude=${t}&offset=${this.state.offset}&limit=${this.state.limit}&search_item_type=2&extra[]=activities`);

        //请求列表数据
        fetch(`${api.keylist}?keyword=${this.props.location.state.word}&longitude=${l}&latitude=${t}&offset=${this.state.offset}&limit=${this.state.limit}&search_item_type=2&extra[]=activities`)
            .then((response)=>{
                return response.json();
            })
            .then((jsonData)=>{
                console.log(jsonData['0'].restaurant_with_foods);
                this.setState({listData: jsonData['0'].restaurant_with_foods});
            });

        this.setState({
            keyword: this.props.location.state.word
        });
    }

    componentDidMount(){
        const homeEle = this.refs.hotSearch;

        const homeScroll = new IScroll(homeEle, {

        });
        this.setState({homeScroll: homeScroll});
    }


    render(){
        return (
            <ReactCSSTransitionGroup transitionName={{
				appear: 'slideInRight',
				appearActive: 'slideInRight'
			}} transitionAppear={true} transitionAppearTimeout={500}
                                     transitionEnter={false} transitionLeave={false}>
                <div ref="hotSearch" id="hotSearch">
                    <div>
                        <div className="searchHeader">
                            <div className="return">
                                <i className="iconfont arrowLeft" onClick={this.goBack.bind(this)}>
                                </i>
                                <input ref="in" value={this.state.keyword} className="headerInput" type="text" placeholder="请输入商品名称" onChange={this.inputHandle}/>
                            </div>
                        </div>
                        <List refresh={this.scrollRefresh.bind(this)} data={this.state.listData} positionInfo={this.props.location.state.positionInfo}/>
                    </div>
                </div>
                <Route path="/home/hotsearch/shop" component={Detail} />
            </ReactCSSTransitionGroup>

        )
    }

    scrollRefresh(){
        if(this.state.homeScroll){
            this.state.homeScroll.refresh();
        }
    }

    inputHandle() {
        var val = this.refs.in.value;

        //setInterval(() => {
        //
        //}, 1000);
    }

    goBack(){
        const addressEle = document.querySelector('#hotSearch');
        addressEle.className = 'slideOutRight';
        setTimeout(()=>{
            this.props.history.goBack();
        }, 500);
    }
}

export default HotSearch;
import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Link} from 'react-router-dom';
import {Route} from 'react-router-dom';

import api from '../../common/api.js';
import HotSearch from './HotSearchPage';
import 'whatwg-fetch';

class Search extends Component{
    constructor() {
        super();
        this.state = {
            keyword: '',
            addressData: {},
            offset: 0,
            limit: 20,
            hotwords: [],
            word: '',
            isAni: true,
            history: localStorage.getItem("history") ? JSON.parse(localStorage.getItem("history")) : []
        };
    }
    componentWillMount() {
        this.setState({
            hotwords: this.props.location.state.hotwords
        });
    }
    componentDidMount(){
        this.setState({isAni:false});
    }
    render(){

        return (
            <ReactCSSTransitionGroup transitionName={{
				appear: 'slideInRight',
				appearActive: 'slideInRight'
			}} transitionAppear={this.state.isAni} transitionAppearTimeout={500}
                                     transitionEnter={false} transitionLeave={false}>
                <div id="search">
                    <div className="searchHeader">
                        <div className="return">
                            <i className="iconfont arrowLeft" onClick={this.goBack.bind(this)}>
                            </i>
                            <input ref="in" className="headerInput" type="text" placeholder="请输入商品名称" onChange={this.changeAction.bind(this)}/>
                            <button onClick={this.inputHandle.bind(this)}><Link to={{
                                pathname: '/home/search/hotsearch',
                                state: {
                                    word: this.state.word,
                                    positionInfo: this.props.location.state.positionInfo
                                }
                            }}>搜索</Link></button>
                        </div>
                    </div>
                    <div className="hot-search">
                        {
                            this.state.history.length == 0 ? '' : <div className="del"><h3>历史搜索</h3><button onClick={this.del.bind(this)}>del</button></div>
                        }
                        <ul className="words">
                            {
                                this.state.history.length == 0 ? '' : this.state.history.map((item, index) => {
                                    return  <li key={index}><Link to={{
                                        pathname: '/home/search/hotsearch',
                                        state: {
                                            word: item,
                                            positionInfo: this.props.location.state.positionInfo
                                        }
                                    }}>{item}</Link></li>
                                })
                            }
                        </ul>
                    </div>
                    <div className="hot-search">
                        <h3>热门搜索</h3>
                        <ul className="words">
                            {
                                this.state.hotwords.map((item, index) => {
                                    return <li key={index}><Link to={{
                                        pathname: '/home/search/hotsearch',
                                        state: {
                                            word: item.word,
                                            positionInfo: this.props.location.state.positionInfo
                                        }
                                    }}>{item.word}</Link></li>
                                })
                            }
                        </ul>
                    </div>
                    <Route path="/home/search/hotsearch" component={HotSearch} />
                </div>

            </ReactCSSTransitionGroup>

        )
    }

    del() {
        this.setState({history: ''});
        localStorage.removeItem('history');
    }

    changeAction() {
        var val = this.refs.in.value;
        setTimeout(() => {
            this.setState({word:val});
        },1000);
    }

    inputHandle() {
        var val = this.refs.in.value;

        var showHistory = localStorage.getItem("history") ? JSON.parse(localStorage.getItem("history")) : [];
        var isExist = false;
        showHistory.map(function(item, index) {
            if (item == val) {
                isExist = true;
            }
        });

        if (!isExist) {
            showHistory.push(val);
        }

        localStorage.setItem("history", JSON.stringify(showHistory));
        this.setState({history: showHistory});
    }

    goBack(){
        const addressEle = document.querySelector('#search');
        addressEle.className = 'slideOutRight';
        setTimeout(()=>{
            this.props.history.goBack();
        }, 500);
    }
}

export default Search;
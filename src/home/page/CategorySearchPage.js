/**
 * Created by Administrator on 2017/6/22 0022.
 */
import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Route} from 'react-router-dom';

import List from '../components/CategorySearchList.js';

import api from '../../common/api.js';
import Detail from './DetailPage';
import 'whatwg-fetch';

class CategorySearch extends Component{
    constructor() {
        super();
        this.state = {
            listData: [],
            offset: 0,
            limit: 20,
            homeScroll: null,
            name: ''
        };
    }

    componentWillMount() {
        this.setState({name: this.props.location.state.name});

        let positionInfo = this.props.location.state.positionInfo;
        let {longitude: l, latitude:t} = positionInfo;

        let restaurant_category_ids = this.props.location.state.restaurant_category_ids;

        console.log(`${api.listApi}?keyword=&longitude=${l}&latitude=${t}&offset=${this.state.offset}&limit=${this.state.limit}&extra[]=activities${restaurant_category_ids}`);

        //请求列表数据
        fetch(`${api.listApi}?keyword=&longitude=${l}&latitude=${t}&offset=${this.state.offset}&limit=${this.state.limit}&extra[]=activities${restaurant_category_ids}`)
            .then((response)=>{
                return response.json();
            })
            .then((jsonData)=>{
                console.log(jsonData);
                this.setState({listData: jsonData});
            });

    }

    componentDidMount(){
        const homeEle = this.refs.categorySearch;

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
                <div ref="categorySearch" id="categorySearch">
                    <div>
                        <div className="returnHeader">
                            <div className="return">
                                <i className="iconfont arrowLeft1" onClick={this.goBack.bind(this)}>
                                </i>
                                {this.state.name}
                            </div>
                        </div>
                        <List refresh={this.scrollRefresh.bind(this)} data={this.state.listData} positionInfo={this.props.location.state.positionInfo}/>
                    </div>
                </div>
                <Route path="/home/categorysearch/shop" component={Detail} />
            </ReactCSSTransitionGroup>

        )
    }

    scrollRefresh(){
        if(this.state.homeScroll){
            this.state.homeScroll.refresh();
        }
    }

    goBack(){
        const addressEle = document.querySelector('#categorySearch');
        addressEle.className = 'slideOutRight';
        setTimeout(()=>{
            this.props.history.goBack();
        }, 500);
    }
}

export default CategorySearch;
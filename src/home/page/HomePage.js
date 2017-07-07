import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import Header from '../components/HomeHeader.js';
import Banner from '../components/HomeBanner.js';
import List from '../components/HomeList.js';

import api from '../../common/api.js';
import 'whatwg-fetch';

import '../../style/home.css';

import Address from './AddressPage.js';
import Search from './SearchPage';
import HotSearch from './HotSearchPage';
import CategorySearch from './CategorySearchPage';
import Detail from './DetailPage';

require('pubsub-js/src/pubsub.js');

class Home extends Component{
	constructor(){
		super();
		this.state = {
			weatherData: {},
			address: '',
			hotwords: [],
			bannerData: [],
			offset: 0,
			limit: 20,
			listData: [],
			homeScroll: null,
			positionInfo: {}
		}
	}

	componentWillMount(){

		let positionInfo = this.props.positionInfo;
		if(positionInfo == undefined){
			positionInfo = this.props.location.state.positionInfo;
		}
		let {longitude: l, latitude: t} = positionInfo;
		this.setState({positionInfo: positionInfo});

		//请求天气数据
		fetch(`${api.weatherApi}?longitude=${l}&latitude=${t}`)
			.then((response)=>{
				return response.json();
			})
			.then((jsonData)=>{
				this.setState({weatherData: jsonData});
			});

		//请求地址信息
		fetch(`${api.geoApi}?longitude=${l}&latitude=${t}`)
			.then((response)=>{
				return response.json();
			})
			.then((jsonData)=>{
				this.setState({address: jsonData.address});
			});

		//请求热门词汇
		fetch(`${api.hotwordsApi}?longitude=${l}&latitude=${t}`)
			.then((response)=>{
				return response.json();
			})
			.then((jsonData)=>{
				this.setState({hotwords: jsonData});
			});

		//请求轮播图数据
		fetch(`${api.bannerApi}?longitude=${l}&latitude=${t}&templates[]=main_template`)
			.then((response)=>{
				return response.json();
			})
			.then((jsonData)=>{
				this.setState({bannerData: jsonData[0].entries});
			});

		//请求列表数据
		fetch(`${api.listApi}?longitude=${l}&latitude=${t}&offset=${this.state.offset}&limit=${this.state.limit}`)
			.then((response)=>{
				return response.json();
			})
			.then((jsonData)=>{
				this.setState({listData: jsonData});
			});
	}

	componentDidMount(){
		const homeEle = this.refs.home;

		const homeScroll = new IScroll(homeEle, {

		});
		this.setState({homeScroll: homeScroll});

		PubSub.subscribe('data', (eventName, param) => {
			console.log('pageHome' + param.positionInfo.item1 + ','+ param.positionInfo.item2);

			let positionInfo = param.positionInfo;

            let {item1: l, item2: t} = positionInfo;


            //请求天气数据
            fetch(`${api.weatherApi}?longitude=${l}&latitude=${t}`)
                .then((response)=>{
                    return response.json();
                })
                .then((jsonData)=>{
                    this.setState({weatherData: jsonData});
                });
            //请求地址信息
            fetch(`${api.geoApi}?longitude=${l}&latitude=${t}`)
                .then((response)=>{
                    return response.json();
                })
                .then((jsonData)=>{
                    this.setState({address: jsonData.address});
                });

            //请求热门词汇
            fetch(`${api.hotwordsApi}?longitude=${l}&latitude=${t}`)
                .then((response)=>{
                    return response.json();
                })
                .then((jsonData)=>{
                    this.setState({hotwords: jsonData});
                });

            //请求轮播图数据
            fetch(`${api.bannerApi}?longitude=${l}&latitude=${t}&templates[]=main_template`)
                .then((response)=>{
                    return response.json();
                })
                .then((jsonData)=>{
                    this.setState({bannerData: jsonData[0].entries});
                });

            //请求列表数据
            fetch(`${api.listApi}?longitude=${l}&latitude=${t}&offset=${this.state.offset}&limit=${this.state.limit}`)
                .then((response)=>{
                    return response.json();
                })
                .then((jsonData)=>{
                    this.setState({listData: jsonData});
                });
		})
	}


	render(){
		return (
			<div>
				<div ref="home" id="home">
					<div className="home-wrap">
						<Header {...{
							weatherData: this.state.weatherData,
							address: this.state.address,
							hotwords: this.state.hotwords,
							imgHost: api.imgHost,
							positionInfo: this.state.positionInfo
						}}/>
						<Banner data={this.state.bannerData} positionInfo={this.state.positionInfo}/>
						<List refresh={this.scrollRefresh.bind(this)} data={this.state.listData} positionInfo={this.state.positionInfo}/>
					</div>
				</div>

				<Route path="/home/address" component={Address} />
				<Route path="/home/search" component={Search} />
				<Route path="/home/hotsearch" component={HotSearch} />
				<Route path="/home/categorysearch" component={CategorySearch} />
				<Route path="/home/shop" component={Detail} />
			</div>
		)
	}

	scrollRefresh(){
		if(this.state.homeScroll){
			this.state.homeScroll.refresh();
		}
	}
}

export default Home;

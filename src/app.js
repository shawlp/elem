import React, {Component} from 'react'

import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom'

import Home from './home/page/HomePage.js'
import Discover from './discover/page/DiscoverPage.js'
import Order from './order/page/OrderPage.js'
import Me from './me/page/MePage.js'

require('pubsub-js/src/pubsub.js');

//console.log(Router)

class App extends Component{
	constructor(){
		super();
		this.state = {
			tabsData: [
				{title: '外卖', icon:"icon-eleme", com: Home, path: '/home'},
				{title: '发现', icon:"icon-discover", com: Discover, path: '/discover'},
				{title: '订单', icon:"icon-order", com: Order, path: '/order'},
				{title: '我的', icon:"icon-me", com: Me, path: '/me'}
			],
			positionInfo: {}
		}
	}
	
	componentWillMount(){
		console.log('定位。。。。');
		//如果有原生的接口，H5+
		//H5 定位
//		navigator.geolocation.getCurrentPosition(
//			(location)=>{
//				alert('定位成功');
//				let info = {
//					longitude:location.coords.longitude,
//					latitude:location.coords.latitude
//				}
//				this.setState({positionInfo: info});
//			},
//			(error)=>{
//				//定位失败
//				alert('定位失败');
//				let info = {
//					longitude:114.059563,
//					latitude:22.54286
//				}
//				this.setState({positionInfo: info});
//			}
//		);
		let info = {
					longitude:114.059563,
					latitude:22.54286
				};
		this.setState({positionInfo: info});
		
	}


	componentDidMount(){
		PubSub.subscribe('data', (eventName, param) => {
			console.log('app' + param.positionInfo.item1 + ','+ param.positionInfo.item2);
			this.setState({positionInfo:param.positionInfo});
		})
	}


	
	render(){
		return (
			<Router>
				<div>
					<Route exact path="/" render={()=>{
						return <Home positionInfo={this.state.positionInfo}/>
					}}/>
					{
						this.state.tabsData.map((item, index)=>{
							return (
								<Route key={index} path={item.path} component={item.com}/>
							)
						})
					}
					
					<nav className="tabs">
					{
						this.state.tabsData.map((item, index)=>{
							const name = "iconfont "+item.icon;
							const activeName = "iconfont "+item.iconOn;
							return (
								<NavLink key={index} to={{
									pathname: item.path,
									state: {
										positionInfo: this.state.positionInfo
									}
								}} isActive={this.getTabsActive.bind(this, index)}>
									<em className={name}></em>
									<span>{item.title}</span>
								</NavLink>
							)
						})
					}
					</nav>
				</div>
			</Router>
		)
	}
	
	getTabsActive(index, match, location){
		if(location.pathname == '/' && index == 0){
			return true;
		}
		else if(!match){
			return false;
		}
		else{
			return true;
		}
	}
}

export default App;

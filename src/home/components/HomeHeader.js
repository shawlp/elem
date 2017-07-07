import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

class Header extends Component{
	render(){
		let img = this.props.weatherData.image_hash;
		let imgP1, imgP2;
		if (img) {
			imgP1 = img.slice(0, 1);
			imgP2 = img.slice(1, 3);
			img = img.slice(3);
		}
		let wrappWidth = 0;
		const lis = this.props.hotwords.map((item, index)=>{
			wrappWidth += item.word.length * 12 + 20;
			return <li key={index}><Link to={{
				pathname: '/home/hotsearch',
				state: {
					word: item.word,
					positionInfo: this.props.positionInfo
				}
			}} style={{color: '#fff'}}>{item.word}</Link></li>
		});


		return (
			<header className="header">
				<div className="info">
					<i className="iconfont icon-dingwei" style={{color: '#fff'}}>
					</i>
					<span><Link to="/home/address" style={{color: '#fff'}}>{this.props.address}</Link></span>
					<span className="arrow">
					</span>
					<img style={{float: 'right', width: '36px'}} src={`${this.props.imgHost}/${imgP1}/${imgP2}/${img}.png?imageMogr/format/webp/thumbnail/!69x69r/gravity/Center/crop/69x69/`}  />
					<span style={{float: 'right', marginTop: '-3px'}}>{`${this.props.weatherData.temperature}°`}</span>
					<span style={{float: 'right', color: '#fff', fontSize: '10px', marginRight: '-20px', marginTop: '20px'}}>{this.props.weatherData.description}</span>
				</div>
				<Link to={{
					pathname:'/home/search',
					state: {
						hotwords: this.props.hotwords,
						positionInfo: this.props.positionInfo
					}
				}}><input className="search" type="text" placeholder="搜索商家、商品"/></Link>
				<div className="hot-words">
					<ul className="wrap" style={{
						width: wrappWidth+'px'
					}}>
						{ lis }
					</ul>
				</div>
			</header>
		)
	}
	
}

Header.propTypes = {
	address: PropTypes.string,
	weatherData: PropTypes.object,
	hotwords: PropTypes.array
};

export default Header;
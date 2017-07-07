import React, {Component} from 'react'

import ReactSwipe from 'react-swipe';
import {Link} from 'react-router-dom';

import api from '../../common/api.js'

class Banner extends Component{
	render(){
		let arr = this.props.data.map((item) => {
			return item;
		});
		let pages = [];
		while (arr.length > 0){
			let newArr = arr.splice(0, 8);
			pages.push(newArr);
		}

		return (
			<div>
			<ReactSwipe key={pages.length} className="banner-wrapper" swipeOptions={{continuous: true}}>
				{
					pages.map((list, i)=>{
						return (
							<ul className="banner-list" key={i}>
								{
									list.map((item, j)=>{
										let link = this.convertLink(item.link);
										return (
											<li className="banner-item" key={j}>
												<Link to={{
														pathname: '/home/categorysearch',
														state: {
															name: item.name,
															positionInfo: this.props.positionInfo,
															restaurant_category_ids: link
														}
													}}>
														<img src={`${api.imgHost}/${item.image_hash}.jpeg`}/>
														<span>{item.name}</span>
												</Link>
											</li>
										)
									})
								}
							</ul>
						)
					})
				}
			</ReactSwipe>
				<div>
				</div>
			</div>
		)
	}

	convertLink(Str){
		let str = decodeURIComponent(Str);
		let str1 = str.substring(str.indexOf('"restaurant_category_id'), str.lastIndexOf("]") + 1);
		let str2 = str1.substring(str1.indexOf('[')+1, str1.lastIndexOf(']')).split(",");

		var str3 = '';
		for (let i = 0; i < str2.length; i++) {
			str3 += '&restaurant_category_ids[]='+ str2[i];
		}
		return str3;
	}
}

export default Banner;
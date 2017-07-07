/**
 * Created by Administrator on 2017/6/21 0021.
 */
import React, {Component} from 'react'
import {Link} from 'react-router-dom';

import api from '../../common/api.js'

class HotSearchList extends Component{
    render(){
        return (
            <div className="list">
                <ul className="list-wrap">
                    {
                        this.props.data.map((item, index)=>{
                            item = item.restaurant;
                            const hz = item.image_path.endsWith('png')? 'png': 'jpeg';
                            const imgSrc = `${api.imgHost}/${item.image_path}.${hz}`;
                            return (
                                <Link to={{
                                    pathname: '/home/hotsearch/shop',
                                    state: {
                                        id: item.id,
                                        positionInfo: this.props.positionInfo
                                    }
                                }} key={index}>
                                <li className="list-item">
                                    <img src={imgSrc}/>
                                    <div className="img-detail">
                                        <section className="index-line">
                                            <h3 className="index-shopname">{item.name}</h3>
                                            <div className="index-support">
                                                {
                                                    item.supports == '' ? '' : item.supports.map((item, index) => {
                                                        return <span className="activity" key={index}>{item.icon_name}</span>
                                                    })
                                                }
                                            </div>
                                        </section>
                                        <section className="index-line">
                                            <div className="index-rate">
                                                <div className="rating">
                                                    <i className="iconfont"></i>
                                                    <i className="iconfont"></i>
                                                    <i className="iconfont"></i>
                                                    <i className="iconfont"></i>
                                                    <i className="iconfont"></i>
                                                    <div style={{width: 75 - item.rating / 5 * 75}}></div>
                                                </div>
                                                <span className="index-rating">{item.rating}</span>
                                                <span>月售{item.recent_order_num}单</span>
                                            </div>
                                            <div className="index-delivery">
                                                {
                                                    item.supports == '' ? '' : item.supports.map((item, index) => {
                                                        switch(item.id){
                                                            case 7:
                                                                return (<span className="index-iconDelivery2" key={index}>
																			<span>蜂鸟专送</span>
																		</span>);
                                                            case 9:
                                                                return 	<span className="index-iconDelivery1" key={index}>准时达</span>;
                                                            default:
                                                                return;
                                                        }
                                                    })
                                                }
                                            </div>
                                        </section>
                                        <section className="index-line">
                                            <div className="index-moneylimit">
                                                <span>¥{item.float_minimum_order_amount}起送/ 配送费¥{item.float_delivery_fee}/ {item.average_cost}</span>
                                            </div>
                                            <div className="index-timedistance">
                                                <span className="distance">{item.distance < 1000 ? item.distance + 'm' : (item.distance / 1000).toFixed(2) + 'km'}</span>
                                                <span className="time">{item.order_lead_time == 0 ? '' : '/ ' + item.order_lead_time + '分钟'}</span>
                                            </div>
                                        </section>
                                    </div>
                                </li>
                                </Link>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }

    componentDidMount(){
        //console.log(this.props);
        this.props.refresh();
    }

    componentDidUpdate(){
        this.props.refresh();
    }



}

export default HotSearchList;
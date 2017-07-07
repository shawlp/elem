/**
 * Created by Administrator on 2017/6/23 0023.
 */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import api from '../../common/api.js'

class DetailHead extends Component{
    render(){
        //console.log('detailhead'+this.props.data);
        let obj = this.props.data;
        let img = this.props.data.image_path;
        let imgP1, imgP2, imgSrc, data;
        if (img) {
            imgP1 = img.slice(0, 1);
            imgP2 = img.slice(1, 3);
            img = img.slice(3);
            const hz = img.endsWith('png') ? 'png' : 'jpeg';
            //console.log(`${api.imgHost}/${imgP1}/${imgP2}/${img}.${hz}?imageMogr/format/webp/thumbnail/!69x69r/gravity/Center/crop/69x69/`)

            imgSrc = `${api.imgHost}/${imgP1}/${imgP2}/${img}.${hz}?imageMogr/format/webp/thumbnail/!69x69r/gravity/Center/crop/69x69/`;
            data = obj;
        }
        return (
            <div>
                <div className="img-desc">
                    <img className="shopImg" src={imgSrc} alt=""/>
                    <Link to={{
                        pathname: '/home/shop/detail',
                        state: {
                            data:  this.props.data
                        }
                    }}>
                        <div className="shopDesc">
                            <h2 className="shopname">{obj.name}</h2>
                            <p className="send">
                                <span className="delivery">{obj.delivery_mode === undefined ? '商家配送' : obj.delivery_mode.text}/{obj.order_lead_time}分钟送达/{obj.piecewise_agent_fee === undefined ? '' : obj.piecewise_agent_fee.description}</span>
                                &gt;
                            </p>
                            <p className="gonggao">公告:{obj.promotion_info}
                            </p>
                        </div>
                    </Link>
                </div>
                <div className="detail-activity">
                    <span><i>新</i>{obj.activities === undefined ? '' : obj.activities[0].tips}</span>
                    <span>{obj.activities === undefined ? '' : obj.activities.length}个活动</span>
                </div>
            </div>
         )
    }


}

export default DetailHead;
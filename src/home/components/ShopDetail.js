/**
 * Created by Administrator on 2017/6/23 0023.
 */
import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import api from '../../common/api.js';

class ShopDetail extends Component{
    constructor() {
        super();
        this.state = {
            keyword: '',
            addressData: '',
            offset: 0,
            limit: 20,
            address: ''
        }
    }

    render(){
        let obj = this.props.location.state.data;
        return (
            <ReactCSSTransitionGroup transitionName={{
                appear: 'slideInRight',
                appearActive: 'slideInRight'
            }} transitionAppear={true} transitionAppearTimeout={500}
                                     transitionEnter={false} transitionLeave={false}>
                <div id="ShopDetail">
                    <div className="returnHeader">
                        <div className="return">
                            <i className="iconfont arrowLeft1" onClick={this.goBack.bind(this)}>
                            </i>
                            商家详情
                        </div>
                    </div>
                    <div className="shop-info">
                        <section className="section">
                            <h3 className="section-title">
                                活动与属性
                            </h3>
                            <div>
                                {
                                    obj.activities.map((item, index) => {
                                        return (
                                            <div className="activity-container" key={index}>
                                                <i className="activity-activityIcon">
                                                    {item.icon_name}
                                                </i>
                                                <span className="activity-description">
                                                    {item.tips}
                                                </span>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                        </section>
                        <section className="shop-album section">
                            <h3 className="section-title">
                                商家实景
                            </h3>
                            <div>
                                {
                                   obj.albums === undefined ? '' : obj.albums.map((item, index) => {
                                        let img = item.cover_image_hash;
                                        let imgP1, imgP2, imgSrc;
                                        if (img) {
                                            imgP1 = img.slice(0, 1);
                                            imgP2 = img.slice(1, 3);
                                            img = img.slice(3);
                                            const hz = img.endsWith('png') ? 'png' : 'jpeg';
                                            //console.log(`${api.imgHost}/${imgP1}/${imgP2}/${img}.${hz}?imageMogr/format/webp/thumbnail/!69x69r/gravity/Center/crop/69x69/`)

                                            imgSrc = `${api.imgHost}/${imgP1}/${imgP2}/${img}.${hz}?imageMogr/format/webp/thumbnail/!69x69r/gravity/Center/crop/69x69/`;
                                        }

                                        return (
                                            <a className="adescription" key={index}>
                                                <img src={imgSrc} alt=""/>
                                                <span className="album-description">
                                                    {item.name}({item.count})张
                                                </span>
                                            </a>
                                        )
                                    })
                                }

                            </div>
                        </section>
                        <section className="section">
                            <h3 className="section-title">
                                商家信息
                            </h3>
                            <ul className="detail-list">
                                <li>地址：{obj.address}</li>
                                <li>营业时间：{obj.opening_hours[0]}</li>
                            </ul>
                        </section>
                    </div>
                </div>
            </ReactCSSTransitionGroup>

        )
    }

    goBack(){
        const addressEle = document.querySelector('#ShopDetail');
        addressEle.className = 'slideOutRight';
        setTimeout(()=>{
            this.props.history.goBack();
        }, 500);
    }
}

export default ShopDetail;
/**
 * Created by Administrator on 2017/6/23 0023.
 */
import React, {Component} from 'react';
import api from '../../common/api.js'


class MenuviewRight extends Component{

    render(){
        let obj = this.props.data;
        return (
            <div className="menuview-right">
                {
                    obj === '' ? '' : obj.map((item, index) => {
                        return (<dl className="menuview-data" key={index}>
                            <dt className="menuview-data-heading">
                                <div className="menuview-data-category">
                                    <strong className="category-name">{item.name}</strong>
                                    <span className="category-description">{item.description}</span>
                                </div>
                            </dt>
                            {
                                item.foods.map((item, index) => {

                                    let img = item.image_path;
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
                                        <dd className="menuview-data-item" key={index}>
                                            <span className="foodImg">
                                                <img src={imgSrc} alt="" />
                                            </span>
                                            <div className="foodInfo">
                                                <p className="foodtitle">{item.name}</p>
                                                <p className="fooddescription">{item.description}</p>
                                                <p className="foodsales">
                                                    <span>月售{item.month_sales}份</span>
                                                    <span>好评率{item.satisfy_rate}%</span>
                                                </p>
                                                <p className="foodactivity">
                                                    <span>{item.activity === null ? '' : item.activity.image_text}</span>
                                                </p>
                                                <div className="fprice">
                                                    <div className="foodprice">￥{item.specfoods[0].price}</div>
                                                    <button className="cartbutton">+</button>
                                                </div>
                                            </div>
                                        </dd>
                                    )
                                })
                            }
                        </dl>)
                    })
                }
            </div>
        )
    }


}

export default MenuviewRight;
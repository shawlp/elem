/**
 * Created by Administrator on 2017/6/23 0023.
 */
import React, {Component} from 'react';


class MenuviewLeft extends Component{

    render(){
        let obj = this.props.data;
        return (
            <ul className="menuview-left">
                {
                    obj === '' ? '' : obj.map((item, index) => {
                        return  <li key={index} className="menuview-li">{item.name}</li>
                    })
                }
            </ul>
        )
    }


}

export default MenuviewLeft;
import React, {Component} from 'react';

import Img from '../images/ic_product.png';

class ListItem extends Component {
    constructor(props) {
        super(props);

        this.props = {
            coupon: []
        }
    }

    render() {
        const {coupon} = this.props;
        return ( <div>
                {
                    coupon.map((item, index) => {
                        return (
                            <div key={index}
                                 className={`coupons_box ${item.type == 1 ? 'total-coupon' : 'single-coupon'}` }>
                                <div className="coupons_box_l">
                                    <em>
                                        <img src={Img}/>
                                        <b>
                                            {item.type == 1 ? item.storeName : 乐虎劵}
                                        </b>
                                    </em>xw
                                    <span>{item.ticketActivityName}</span>
                                    <p>{item.useEndTime}</p>
                                </div>
                                <div className="coupons_box_r">
                                    {
                                        item.type == 1 ? '<em>满<b>' + item.condition1 + '</b>送<b>' + item.condition2 + '</b></em>' : '<em><b>￥' + item.condition2 + '</b>现金券</em>'
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )

    }

}


export default ListItem;
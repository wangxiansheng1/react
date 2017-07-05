import React, {Component} from 'react';

class GoodsDescripts extends Component {
    constructor(props) {
        super(props);
        this.props = {
            goods: []
        }
    }

    render() {
        return (
            <div className="goodslist">
                <ul>
                    {
                        this.props.goods.map((item, index) => {
                             return  (<li key={index}>
                                 <a href="javascript:;"><img src={item.originImgUrl}/></a>
                                <div className="goodslist-item">
                                    <div className="goodslist-item-title">
                                        {item.title}
                                    </div>
                                    <span className="goodslist-item-price"><i>¥{item.originId}</i><del>{item.originName}</del></span>
                                    <span className="goodslist-item-taxes">税费:¥{item.originName}</span>
                                </div>
                            </li>)
                        })
                    }
                </ul>
            </div>
        )
    }

}

export default GoodsDescripts;
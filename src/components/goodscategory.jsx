import React, { Component } from 'react';

import api from '../config/api';

import $ from 'jquery';

require('./style/classify.css');

class GoodsList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			GoodsList: [1, 2, 3],
			GoodsName: [2, 3, 4]
		}

		//事件处理
		this.handleClick = (index, event) => {

			$('.classify-type-list a').removeClass('list-active');
			$('.classify-type-list a').eq(index).addClass('list-active');
		}

	}

	componentDidMount() {

		let params = {
			"url": 'http://mobile.vision-world.cn:8080/mobile-web-trade/ws/mobile/v1/goods/catList',
			"method": 'post',
			"params": {
				"catId": 0,
				"strUserId": "",
				"strToken": ""
			}
		};

		api(params).then((data) => {
			console.log(2);
			console.log(data.response.category[0].category);
			this.setState({
				GoodsList: data.response.category,
				GoodsName: data.response.category[0].category
			})
		})

	}

	render() {

		return(
			<div className="classify-type">
                <div className="classify-type-list">
                    {
                        this.state.GoodsList.map((item, index) => {
                            if (index == 0) {
                                return <a data-catId = { item.catId} onClick={this.handleClick.bind(this, index)} key={index} href="javascript:;"
                                          className="list-active">{item.catName}</a>;
                            }
                            else {
                                return <a data-catId = { item.catId} onClick={this.handleClick.bind(this, index)} key={index}
                                          href="javascript:;">{item.catName}</a>;
                            }
                        }, this)
                    }
                </div>
                <div className="classify-type-goods">
                    {
                        this.state.GoodsName.map((item, index) => {
                            return <a href="javascript:;" key={index}><img src={item.catImgUrl}/><span>{item.catName}</span></a>
                        })
                    }
                </div>
            </div>
		)
	}
}

export default GoodsList;
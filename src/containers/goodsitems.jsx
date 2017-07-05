import React, {
	Component
} from 'react';
import $ from 'jquery';
import api from '../config/api';

import { fetchPosts } from '../redux/actions/index';
import { connect } from 'react-redux';
import { Link } from 'react-router';

require('../style/goodslist.css');

import GoodsDescripts from '../components/goodsdescripts';

class GoodsItem extends Component {

	constructor(props) {
		super(props);

		this.props = {
			goods: []
		}
	}

	componentDidMount() {

		const {
			dispatch,
			goods
		} = this.props;

		$('.tabs a').on('click', function() {
			$('.tabs .active').removeClass('active');
			let Index = $(this).index();
			$('.tabs a').eq(Index).addClass('active');
		})

		let params = {
			"url": 'http://mobile.vision-world.cn:8080/mobile-web-trade/ws/mobile/v1/goods/originList',
			"method": 'post',
			"params": {
				"userId": 0,
			}
		};

		dispatch(fetchPosts(params));

	}

	render() {
		const {
			goods
		} = this.props;
		return(
			<div >
                <div className="tabs">
                    <a href="javascript:void (0)" className="active">默认222</a>
                    <a href="javascript:void (0)" className="tabs-price">价格</a>
                    <a href="javascript:void (0)"><Link  to = "/" >销量</Link></a>
                </div>
                <GoodsDescripts goods={ goods.items }/>
            </div>
		)
	}

}

function select(state) {
	return {
		goods: state.goodslist
	}
}
//react-redux 提供了两个重要的对象， Provider 和 connect ，前者使 React 组件可被连接（connectable），后者把 React 组件和 Redux 的 store 真正连接起来。
export default connect(select)(GoodsItem)
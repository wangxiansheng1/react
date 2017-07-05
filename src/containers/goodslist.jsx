
import React, {Component} from 'react';

import { addgoodslist } from '../redux/actions/index';

import { connect } from 'react-redux';

require('../style/goodslist.css');

class GoodsList extends Component {
    constructor(props) {
        super(props);

        this.handleClick = () => {

            //定义 名称  es6 严格模式
            const { dispatch,goodslist } = this.props;
            let Input = this.refs.Input;
            let InputValue = Input.value;

            //出发点击事件，改变todos状态里的数据
            dispatch(addgoodslist(InputValue));

            Input.value = "";

        }

    }

    componentDidMount(){

    }

    render() {
        const { goodslist } = this.props;
        return (

            <div>
                <div className="tabs">
                    <a href="javascript:;" className="active">默认</a>
                    <a href="javascript:;" className="tabs-price" value="0">价格</a>
                    <a href="javascript:;">销量</a>
                </div>
                <div className="goodslist">
                    <input type="text" ref="Input" placeholder="请输入电话号码" /><input type="button" ref="Button" onClick={this.handleClick.bind(this)}/>
                    <ul>
                        {
                            goodslist.map(function (item,index) {
                                return <a className = { 'all' + index } href="javascript:;" key={index}>{item.text}</a>
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }

}

//connect() 的唯一参数是 selector。此方法可以从 Redux store 接收到全局的 state，然后返回组件中需要的 props。
function select(state) {
    return {
        goodslist : state.todos
    }
}
//通过 react-redux 提供的 connect() 方法将包装好的组件连接到Redux。任何一个从 connect() 包装好的组件都可以得到一个 dispatch 方法作为组件的 props，以及得到全局 state 中所需的任何内容。 connect() 的唯一参数是 selector。此方法可以从 Redux store 接收到全局的 state，然后返回组件中需要的 props。最简单的情况下，可以返回一个初始的 state （例如，返回认证方法），但最好先将其进行转化。
export default  connect(select)(GoodsList)
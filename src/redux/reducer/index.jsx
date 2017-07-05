import Immutable from 'immutable';

import {combineReducers} from 'redux';

//引入action名称
import {ADD_GOODSLIST, REQUEST_POSTS, RECEIVE_POSTS} from '../actions/index';

//注意每个 reducer 只负责管理全局 state 中它负责的一部分。每个 reducer 的 state 参数都不同，分别对应它管理的那部分 state 数据。
//现在看起来好多了！随着应用的膨胀，我们还可以将拆分后的 reducer 放到不同的文件中, 以保持其独立性并用于专门处理不同的数据域。
const defaultlState = Immutable.fromJS({data: {}, isFetching: false})
//数据不可变

//最后，Redux 提供了 combineReducers() 工具类来做上面 todoApp 做的事情，这样就能消灭一些样板代码了。有了它，可以这样重构 todoApp：

// state 是个数组  数据以对象形式存在
function todos(state = [], action) {
    //根据action来return state
    switch (action.type) {
        case ADD_GOODSLIST:
            console.log(action.text);
            return [
                ...state,// es6...state 指的是所有之前的参数 [1,2,3]  ...state  console.log(...state)  //1,2,3
                {text: action.text}
            ];
        //如果没有事件就返回出事状态
        default:
            return state
    }
}


export const goodslist = function (state = {
    isPromise:false, items: []}, action) {
    switch (action.type) {
        case REQUEST_POSTS:
            return state;
        case RECEIVE_POSTS:
            return Object.assign({}, state, {
                items: action.json,
                isPromise: true
            });//返回一个新的state
        default:
            return state
    }
}


//combineReducers() 所做的只是生成一个函数，这个函数来调用你的一系列 reducer，每个 reducer 根据它们的 key 来筛选出 state 中的一部分数据并处理，然后这个生成的函数再将所有 reducer 的结果合并成一个大的对象。没有任何魔法。
//ES6 用户使用注意

//combineReducers 接收一个对象，可以把所有顶级的 reducer 放到一个独立的文件中，通过 export 暴露出每个 reducer 函数，然后使用 import * as reducers 得到一个以它们名字作为 key 的 object：

// const rootReducer = combineReducers({
//     todos,
//     goodslist
// });
//
// export default rootReducer;
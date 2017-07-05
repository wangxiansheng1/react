import {createStore, getState , combineReducers, applyMiddleware} from 'redux';

import * as reducer from '../reducer/index';

import thunkMiddleware from 'redux-thunk';

//创建一个 Redux store 来以存放应用中所有的 state，应用中应有且仅有一个 store。

let store = createStore(
    combineReducers(reducer),
    applyMiddleware(thunkMiddleware)
);

export default store;
import React, {Component, ProTypes} from 'react';

import {Router, Route, Redirect, IndexRoute, browersHistory, hashHistory} from 'react-router';


//动画效果 very important
import {RouteTransition} from 'react-router-transition';

import  Index from '../containers/index';
import Area from '../containers/area';
import Coupon from '../containers/coupon';

class Roots extends Component {

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

const classify = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/classify').default)
    }, 'classify')
};

const goodsItems = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/goodsitems').default)
    }, 'goodsItems')
};

//注册
const register= (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../components/register').default)
    }, 'register')
};

//登录
const login= (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../components/login').default)
    }, 'login')
};


const RouteConfig = (
    <Router history={hashHistory}>
        <Route path="/" component={Roots}>
            //定向"/"路由
            <IndexRoute component={Area}/>//首页
            <Route path="goodsItems" getComponent={goodsItems}/>
            <Route path="register" getComponent={register}/>
            <Route path="login" getComponent={login}/>
            <Redirect from='*' to='/'/>
        </Route>
    </Router>
);

export default RouteConfig;


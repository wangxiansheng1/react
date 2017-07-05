import React , { Component } from 'react';
import ReactDOM, { render } from 'react-dom';

import { Provide } from 'react-redux';

import store from './redux/store/index';


import './config/rem';
import FastClick from 'fastclick';

import router from './router/Router';

import Provider from "react-redux/src/components/Provider";


require('./style/common.css');

require('./style/header.css');
require('./style/top.css');
require('./style/download.css');



if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

store.subscribe(() => { //监听state变化
    console.log(store.getState())
});


// print store

//首先，我们需要获取从之前安装好的 react-redux 提供的 Provider，并且在渲染之前将根组件包装进 <Provider>。
let app = document.getElementById('app');
render(
    <Provider  store={store} >
        {router}
    </Provider>,
    app
);
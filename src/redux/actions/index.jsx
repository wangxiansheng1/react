import api from '../../config/api';

/*
 * action 类型
 * */

//公开动作名称  添加动作action
export const ADD_GOODSLIST = 'ADD_GOODSLIST';

//action for goodsList

//success
export const CHSNGE_GOODSLIST = 'CHSNGE_GOODSLIST';


export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';

//创建函数，生成action方法，
//"action" 和"action创建函数" 这两个概念很容易混在一起，使用时最好注意区分
//开始获取数据
const requestPosts = data => {
    return {
        type: REQUEST_POSTS,
        data
    }
};

//获取数据成功
const receivePosts = (json) => {
    return {
        type: RECEIVE_POSTS,
        json
    }
};


// 页面初次渲染时获取数据
export const fetchPosts = (data) => {

    return dispatch => {
        dispatch(requestPosts(data));
        return api(data)
            .then(json => {
                dispatch(receivePosts(json.response.origin));
            })
            .catch(error => console.log(error))
    }
};

//redux 中的action 创建函数只是简单的返回一个aciton
export function addgoodslist(text) {
    return {
        type: ADD_GOODSLIST,
        text
    }
}

export function changegoodslist(text) {
    return {
        type: CHSNGE_GOODSLIST,
        text
    }
}


//商品列表页action

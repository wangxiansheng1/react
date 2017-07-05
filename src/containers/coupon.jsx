
import React , { Component } from 'react';
import $ from 'jquery';
import Api from '../config/api';

import Header from '../components/header/header';
import ListItem from '../components/coupon';

import '../style/coupon.css';

class Coupon extends Component{
    constructor(props){
        super(props);
        this.state = {
            flag:0,
            coupon: []
        }
    }

    componentDidMount(){
        //init
        this.getCoupon(0);
    }

    handleCoupon(event){
        const { dispatch } = this.props;
        let element = event.target;
        $('.coupons_category .active').removeClass('active');
        $(element).addClass('active');
        let FLAG = $(element).attr('data-flag');
        this.setState({
            flag: FLAG
        });
        dispatch(FLAG);
    }

    getCoupon(flag){

        let params = {
            url: 'http://mobile.vision-world.cn:8080/mobile-web-market/ws/mobile/v1/ticketCenter/list',
            method: 'post',
            params: {
                "flag":flag,
                "pageRows":10,
                "toPage":1,
                "userId":"",
                "strUserId":"",
                "strToken":""
            }
        };

        Api(params)
            .then(data => {
                if (data.code == 1){
                    console.log(data.response);
                }
                else {
                    console.log(data.msg);
                }
            } )
            .catch(error => {
                console.log(error);
            })
    }

    render(){
        return (
            <div>
                <Header name="领券中心"/>
                <div className="coupons_category">
                    <a onClick={this.handleCoupon.bind(this)} data-flag="0" href="javascript:void (0)"  className="active">乐虎券</a>
                    <a onClick={this.handleCoupon.bind(this)} data-flag="1" href="javascript:void (0)">店铺券</a>
                </div>

            </div>
        )

    }
}

export default Coupon;
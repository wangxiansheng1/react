import React, { Component } from 'react';

import api from '../config/api';
import $ from 'jquery';

import { Link } from 'react-router';

require('../style/classify.css');

class Classify extends Component{
    constructor(props){
        super(props);
        this.state = {
            countryList:[{
                originName:2
            }]
        }

    }

    componentDidMount(){

        let params = {
            "url": 'http://mobile.vision-world.cn:8080/mobile-web-trade/ws/mobile/v1/goods/originList',
            "method": 'post',
            "params": {
                "userId": 0,
            }
        };

        api(params)
            .then((data) => {
                this.setState({countryList: data.response.origin});
            })
            .catch((error) =>{
                console.log(error);
            });

        $('.tabs a').on('click',function () {
            $('.tabs .active').removeClass('active');
            let Index = $(this).index();
            $('.tabs a').eq(Index).addClass('active');
            if(Index == 0){
                $('.classify-type').show();
                $('.classify-city').hide();
            }
            else if(Index == 1){
                $('.classify-type').hide();
                $('.classify-city').show();
            }
        })


    }

    render(){
        return(
            <div>
                <div className="tabs">
                    <a href="javascript:void (0)" className="active"><Link to="/goodsItems">分类</Link></a>
                    <a href="javascript:void (0)" >国家</a>
                </div>
                <div className="classify-type">22222</div>
            </div>
        )
    }

}

export default Classify;
//login

import React, {Component} from 'react';

import { Link,hashHistory } from 'react-router';

import $ from 'jquery';

import Api from '../config/api';

import '../style/login.css';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loginBysms : false,
            userNameLength:0,
            passwordLength:0,
            captchaLength:0
        }

    }

    componentDidMount(){

        let that = this;

        //init
        this.bindEvent();

        // login
        $('.login-tab span').on('click',function () {

            $('.login-tab span').removeClass('active');
            $(this).addClass('active');

            if($('.login-tab-sms').hasClass('active')){
                that.setState({
                    loginBysms: true
                });
                $('.item.item-password').hide();
                $('.item.item-sms-captcha').show();
                $('.btn-login').addClass('btn-disabled');
                $('.txt-password').val("");
            }
            else {
                that.setState({
                   loginBysms: false
                });
                $('.item.item-password').show();
                $('.item.item-sms-captcha').hide();
                $('.btn-login').addClass('btn-disabled');
                $('.txt-sms-captcha').val("");
            }
        })


    }

    bindEvent(){
        let that = this;
        $('.txt-username').on('keyup',function () {
            that.setState({
                userNameLength : $(this).val().length
            });
            that.enableLogin();
        });

        $('.txt-password').on('keyup',function () {
            that.setState({
                passwordLength: $(this).val().length
            });
            that.enableLogin();
        });

        $('.txt-sms-captcha').on('keyup',function () {
            that.setState({
                captchaLength: $(this).val().length
            });
            that.enableLogin();
        })

    }

    enableLogin(){

        const { loginBysms ,userNameLength, passwordLength, captchaLength } = this.state;

        if(loginBysms){
            if(userNameLength > 0 && captchaLength > 0 ){
                $('.btn-login').removeClass('btn-disabled');
            }
            else {
                $('.btn-login').addClass('btn-disabled');
            }
        }
        else {
            if(userNameLength > 0 && passwordLength > 0){
                $('.btn-login').removeClass('btn-disabled');
            }
            else {
                $('.btn-login').addClass('btn-disabled');
            }
        }

    }


    handleBack(){
        alert(2);
    }

    //密码显示btn
    handleOff(event){
        let element = event.target;
        if($(element).hasClass('btn-on')){
            $(element).removeClass('btn-on');
            $(element).prev().attr('type','password');
        }
        else {
            $(element).addClass('btn-on');
            $(element).prev().attr('type','text');
        }
    }

    handleLogin(event){
        const { loginBysms } = this.state;
        let element = event.target;
        let that = this;
        if($(element).hasClass('btn-disabled')){
            return false;
        }

        let userName = $('.txt-username').val();
        let passWord = $('.txt-password').val();
        let captcha = $('.txt-sms-captcha').val();

        if(userName == ""){
            $('.error-msg').text("手机号码不能为空!").parent().css("display","block");
            return false;
        }

    //    如果是验证码登录走另一个分支
        if(loginBysms){
            this.loginSms(userName,captcha);
            return false;
        }

        let params = {
            url: 'http://121.196.208.98:28080/mobile-web-user/ws/mobile/v1/user/login',
            method:'post',
            params:{
                'phoneCode':userName,
                'password': passWord,
                'type': '0',
                'origin': '5',
                'phoneToken': ''
            }
        }
        Api(params)
            .then( data => {
                if(data.code == 1){
                    alert(data.response)
                }
                else {
                    alert(data.msg);
                }
            })
            .catch( error => {
                alert(error);
            })

    }

    //验证码login
    loginSms(userName,captcha){
        let that = this;
        if(captcha == ''){
            $('.error-msg').text('验证码不能为空!').parent().css('display','block');
            return false;
        }

        let params = {
            url: 'http://121.196.208.98:28080/mobile-web-user/ws/mobile/v1/user/login',
            method: 'post',
            params: {
                'phoneCode': userName,
                'identifyingcode': captcha,
                'type': '1',
                'origin': '5',
                'phoneToken': ''
            }
        }

        Api(params)
            .then(data => {
                if(data.code == 1){
                    alert(data.response);
                }
            })
            .catch(error => {
                alert(error);
            })

    }

    //发送验证码
    handleSmit(event){
        let that = this;
        let element = event.target;

        if($(element).hasClass('btn-retransmit-disabled')){
            return false;
        }
        let userName = $('.txt-username').val();

        if(userName == "" ){
            $('.error-msg').text('手机号码不能为空').parent().css('display','block');
            console.log(2);
            return false;
        }

        let params = {
            url: 'http://121.196.208.98:28080/mobile-web-user/ws/mobile/v1/user/getIdentifyingCode',
            method: 'post',
            params: {
                'phoneCode': userName
            }
        };

        Api(params)
            .then(function (data) {
                if(data.code == 1){
                    that.countdown(60);
                    $('.item-tips').css('display','none');
                }
                else {
                    $('.error-msg').text(data.msg).css('display','block');
                }
            })
            .catch( error => {
                alert(error);
            })


    }

    //倒计时
    countdown(time){
        let that = this;
        setTimeout(() =>{
            if(time > 0 ){
                time--;
                $('.btn-retransmit').text(time + 's').addClass('btn-retransmit-disabled');
                that.countdown(time);
            }
            else {
                $('.btn-retransmit-disabled').text('获取验证码').removeClass('btn-retransmit-disabled');
            }
        },1000);
    }

    //页面跳转传参数
    handleClick(){
        hashHistory.push({
            pathname: '/register',
            // query: {
            //     title:2,
            //     time:3,
            //     text:4
            // },
        })
    }

    render() {
        return (
            <div>
                <header className="header">
                    <a href="javascript:void (0)" className="back" onClick={this.handleBack.bind(this)}></a>
                    <div className="login-tab">
                        <span className="login-tab-psd active">密码登录</span>
                        <span className="login-tab-sms">验证码登录</span>
                    </div>
                </header>

                <section className="login-main">

                    <div className="item item-tips">
                        <div className="error-msg">用户名不存在</div>
                    </div>

                    <div className="login-form">

                        <div className="item item-username">
                            <i className="icon-tel"></i>
                            <input className="txt-input txt-username" type="number" pattern="\d*"
                                   placeholder="请输入手机号码"/>
                        </div>

                        <div className="item item-password">
                            <i className="icon-pwd"></i>
                            <input className="txt-input txt-password" type="password" autocomplete="off"
                                   placeholder="请输入密码"/>
                            <b onClick={this.handleOff.bind(this)} className="tp-btn btn-off"></b>
                        </div>

                        <div className="item item-tab item-sms-captcha" style={{display: 'none'}}>
                            <i className="icon-sms"></i>
                            <input className="txt-input txt-sms-captcha" type="tel" autocomplete="off"
                                   placeholder="请输入验证码"/>
                            <a onClick={this.handleSmit.bind(this)} href="javascript:void (0)" className="btn-retransmit">获取验证码</a>
                        </div>

                        <div className="item item-btns item-login">
                            <a onClick={this.handleLogin.bind(this)} className="btn-login btn-disabled" href="javascript:void (0)">登录</a>
                        </div>

                        <div className="item item-res">
                            <a onClick={this.handleClick.bind(this)} className="btn-res btn-disabled" href="javascript:void (0)">注册</a>
                        </div>

                        <div className="item item-login-option">
                            <span className="retrieve-password">
                                 <a href="javascript:void (0)">忘记密码？</a>
                            </span>
                        </div>
                    </div>
                </section>
            </div>

        )
    }

}

export default Login;
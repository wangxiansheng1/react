//register

import React, {Component} from 'react';

import $ from 'jquery';

import Api from '../config/api';

class Register extends Component {
    constructor(props) {
        super(props);

        //获取url后的query
        console.log(this.props.location.query);

        this.state = {
            userNameLength:0,
            passwordLength:0,
            captchaLength:0
        }
    }

    componentDidMount(){

        //init
        this.bindEvent();

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

    bindEvent(){
        let that = this;
        $('.txt-phone').on('keyup',function () {
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
        const { userNameLength, passwordLength, captchaLength } = this.state;
        if(userNameLength > 0 && passwordLength > 0 && captchaLength > 0 ){
            $('.btn-login').removeClass('btn-disabled');
        }
        else {
            $('.btn-login').addClass('btn-disabled');
        }

    }

    //发送验证码
    handleSmit(event){
        let that = this;
        let element = event.target;

        if($(element).hasClass('btn-retransmit-disabled')){
            return false;
        }
        let userName = $('.txt-phone').val();

        if(userName == "" ){
            $('.error-msg').text('手机号码不能为空').parent().css('display','block');
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
            .then(data => {
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

    forceInput(event){
        $('.item-tips').css('display','none');
    }

    //register
    handleRegister(event){
        let that = this;
        let element = event.target;
        if($(element).hasClass('btn-disabled')){
            return false;
        }

        let userName = $('.txt-phone').val();
        let password = $('.txt-password').val();
        let captcha = $('.txt-sms-captcha').val()

        if(userName == ""){
            $('.error-msg').text('手机号码不能为空!').parent().css('display','block');
            return false;
        }
        if(captcha == ""){
            $('.error-msg').text('验证码不能为空!').parent().css('display','block');
            return false;
        }
        if(password ==""){
            $('.error-msg').text('密码不能为空!').parent().css('display','block');
            return false;
        }
        if(password.length < 7){
            $('.error-msg').text('密码不能小于8位数!').parent().css('display','block');
            return false;
        }

        let params = {
            url: 'http://121.196.208.98:28080/mobile-web-user/ws/mobile/v1/user/register',
            method: 'post',
            params: {
                'phoneCode': userName,
                'password': password,
                'identfyingcode': captcha,
                'phoneToken': '',
                'origin': '5'
            }
        };

        Api(params)
            .then(data => {
                if(data.code ==1 ){
                    alert(data.response);
                }
                else {
                    alert(data.msg);
                }
            })
            .catch(error => {
                alert(error);
            })

    }

    render() {
        return (
            <div>
                <header className="header">
                    <a href="javascript:;" className="back"></a>
                    <h2>注册</h2>
                </header>

                <section className="login-main">
                    <div className="item item-tips">
                        <div className="error-msg">用户名不存在</div>
                    </div>
                    <div className="login-form">

                        <div className="item item-phone">
                            <i className="icon-tel"></i>
                            <input onFocus={this.forceInput.bind(this)} className="txt-input txt-phone" type="tel" placeholder="请输入手机号码" autofocus required/>
                        </div>

                        <div className="item item-sms-captcha">
                            <i className="icon-sms"></i>
                            <input  onFocus={this.forceInput.bind(this)}  className="txt-input txt-sms-captcha" type="tel" autocomplete="off"
                                   placeholder="请请输入验证码"/>
                            <a onClick={this.handleSmit.bind(this)} href="javascript:;" className="btn-retransmit">发送验证码</a>
                        </div>

                        <div className="item item-password">
                            <i className="icon-pwd"></i>
                            <input  onFocus={this.forceInput.bind(this)}  className="txt-input txt-password" type="password" autocomplete="off"
                                   placeholder="请设置密码（8-20个字符）" required/>
                            <b onClick={this.handleOff.bind(this)}  className="tp-btn btn-off"></b>
                        </div>

                        <div className="item item-reg-option">
                            <span className="reg-protocol reg-protocol-selected">
                            <i></i><a href="" target="-blank">注册视为同意汇银乐虎<span>《用户协议》</span></a>
                            </span>
                        </div>

                        <div className="item item-btns">
                            <a className="btn-login btn-disabled" href="javascript:;" onClick={this.handleRegister.bind(this)}>注册</a>
                        </div>
                    </div>
                </section>
            </div>
        )
    }

}

export default Register;
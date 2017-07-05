//返回顶部组件

import React, { Component } from 'react';

class Top extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        let TOP = this.refs.top;
        window.addEventListener('scroll',function () {
            let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            if(scrollTop > clientHeight){
                TOP.style.display = 'block';
            }
            else {
                TOP.style.display = 'none';
            }
        },false);
    }

    handleTop(){
        window.scroll(0,0);
        let TOP = this.refs.top;
        TOP.style.display = "none";
    }

    render(){
        return(
            <div ref="top" className="fix-go-top" onClick={this.handleTop.bind(this)}></div>
        )
    }

}

export default Top;
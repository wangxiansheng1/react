

import React , { Component } from 'react';


class Country extends Component{
    constructor(props){
        super(props);
        this.props = {
            country : []
        }

    }

    render(){

        return (
            <div className="classify-city" style = {{'display':'none'}}>
                {
                    this.props.country.map((item,index) => {
                        return (<a href="javascript:;" key={index}><img src={item.originImgUrl}/><span>{item.originName}</span></a> )
                    })
                }
            </div>
        )
    }

}

export default Country;
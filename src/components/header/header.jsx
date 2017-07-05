//  页面导航

import React, { Component } from 'react';

class Header extends Component {
	constructor(props) {
		super(props);
	}

	handleBack() {
		alert(2);
	}

	render() {
		return(
			<header className="header"><a href="javascript:;" onClick={this.handleBack.bind(this)} className="back"></a><h2>{this.props.name}</h2></header>
		)
	}

}

export default Header
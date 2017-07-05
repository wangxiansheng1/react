// 下载组件

import React, {Component} from 'react';
//图片引入方法
import Shortcut from '../../images/Shortcut_114_114.png'


class Download extends Component {
    constructor(props) {
        super(props);

    }

    static defaultProps = {
        title: '打开京东App购物',
        descript: '新人领188元红包'
    };

    render() {
        const {title, descript} = this.props;
        return (
            <div className="download-app">
                <div className="download-content">
                    <a href="javascript:void (0)" className="download-close"></a>
                    <span className="logo-download"><img src={ Shortcut } /></span>
                    <div className="download-cl">
                        <p className="download-clr1">{title}</p>
                        <p className="download-clr2">{descript}</p>
                    </div>
                    <a className="download-cp" href="javascript:void (0)">立即打开</a>
                </div>
            </div>
        )

    }

}

export default Download;
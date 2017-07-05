import React, {Component} from 'react';

import Header from '../components/header/header';
import Top from '../components/footer/top';
import Download from '../components/download/download';

let Swiper = require('../lib/swiper.min');

require('../lib/swiper.min.css');

class ImageSwiper extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {

        new Swiper('.more_bottom .swiper-container', {
            loop: true,
            pagination: '.swiper-pagination',
            paginationClickable: true,
            autoplay: 2000,
            autoplayDisableOnInteraction: false,
        });

    }

    render() {
        return (
            <div>
                <Download/>
                <Header name = "限时折扣"/>
                <div className="more_bottom">
                    <div className="swiper-container">
                        <div className="swiper-wrapper">
                            <div className="lightbox swiper-slide">1</div>
                            <div className="lightbox swiper-slide">2</div>
                            <div className="lightbox swiper-slide">3</div>
                            <div className="lightbox swiper-slide">4</div>
                        </div>
                        <div className="swiper-pagination"></div>
                    </div>
                </div>
                <Top/>
            </div>
        )
    }

}

export default ImageSwiper;
import React from 'react';
import './homeCarousel.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ban1 from '../../assets/banner1.png';
import card1 from '../../assets/card1.png';
import card2 from '../../assets/card2.png';
import card3 from '../../assets/card3.png';

const HomeCarousel = () => {

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 600 },
            items: 2,
            slidesToSlide: 2
        },
        mobile: {
            breakpoint: { max: 600, min: 0 },
            items: 1,
            slidesToSlide: 2
        }
    };

    const items = [
        { id: 1, url: ban1 },
        { id: 2, url: card1 },
        { id: 3, url: card2 },
        { id: 4, url: card3 },
        { id: 5, url: ban1 },
        { id: 6, url: card2 },
        { id: 7, url: card3 },
        { id: 8, url: card1 },
        { id: 9, url: ban1 },
        { id: 10, url: card2 },
    ]

    let userName = JSON.parse(localStorage.getItem('user'));

    return (
        <div className='home-carousel-container'>
            {/* <div> */}
            <div className="hello-text">Hello!</div>
            <div className="user-name">{userName && userName.name}</div>
            {/* </div> */}
            <div className="multi-carousel">
                <div className="carousel-home">
                    <Carousel showDots={true} responsive={responsive} removeArrowOnDeviceType={["tablet", "mobile", "desktop"]} containerClass="carousel-container" itemClass="carousel-item-padding-40-px">
                        {items.map(items => <img src={items.url} className='carousel-img' alt='' key={items}/>)}
                        {/* <div><img src={banner2} alt="" className='carousel-img'/></div>
                    <div><img src={banner3} alt="" className='carousel-img'/></div>
                    <div><img src={banner2} alt="" className='carousel-img'/></div> */}
                    </Carousel>
                </div>
            </div>
        </div>
    )
}

export default HomeCarousel;

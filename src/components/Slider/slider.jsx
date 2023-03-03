import React from 'react'
import './slider.css';
import { useState } from 'react';
import learn from '../../assets/learnEngage.png';
import seamless from '../../assets/seamless.png';
import tracking from '../../assets/tracking.png';

const Slider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const slides = [
        { url: learn, title: "Learner Engagement", description: "Interactive features mirror the traditional classroom experience and learners receive feedback to increase long-term retention, tripling learning efficacy over standard video." },
        { url: tracking, title: "Accountable Tracking", description: "Receive immediate, accessible data (both performance and behavior-based) to effectively remediate concepts, automatically assign grades, and address deficiencies." },
        { url: seamless, title: "Seamless Workflow", description: "Sync rosters, create and assign impactful video experiences, enrich your flipped classroom, and streamline tedious grading." },
    ]

    const goToNextSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    }
    return (
        <div className='carousel'>
            <div className="carousel-inner" style={{ backgroundImage: `url(${slides[currentIndex].url})` }}></div>
            <div className="carousel-info">
                <div className="img-title">{slides[currentIndex].title}</div>
                <div className="img-desciption">{slides[currentIndex].description}</div>
            </div>
            <div className="dots">
                {slides.map((slide, slideIndex) => (
                    <div className='slider-dots' onClick={() => goToNextSlide(slideIndex)}></div>
                ))}
            </div>
        </div>
    );
}

export default Slider;
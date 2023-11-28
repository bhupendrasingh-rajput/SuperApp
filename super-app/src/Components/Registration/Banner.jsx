import React from 'react'
import './Registration.css';
import BannerImage from '../../Assets/BannerImage.png';

const Banner = () => {
    return (
        <div className="image-container">
            <img src={BannerImage} alt="Registration Image" />
            <div id="image-text">Discover new things on Superapp</div>
        </div>
    )
}

export default Banner;
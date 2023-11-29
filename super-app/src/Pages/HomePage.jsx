import React from 'react'
import '../Components/HomePage/HomePage.css';
import Profile from '../Components/HomePage/Profile';
import Weather from '../Components/HomePage/Weather';


const HomePage = () => {
    return (
        <div className='home-page'>
            <div className="left-container">
                <div className="upper">
                    <div className="left-box">
                        <Profile/>
                        <Weather/>
                    </div>
                    <div className="right-box"></div>
                </div>
                <div className="lower"></div>
            </div>
            <div className="right-container"></div>
        </div>
    )
}

export default HomePage
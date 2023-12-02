import React from 'react'
import '../Components/HomePage/HomePage.css';
import Profile from '../Components/HomePage/Profile';
import Weather from '../Components/HomePage/Weather';
import News from '../Components/HomePage/News';
import Notes from '../Components/HomePage/Notes';
import TimerCard from '../Components/HomePage/TimerCard';


const HomePage = () => {
    return (
        <div className='home-page'>
            <div className="left-container">
                <div className="upper">
                    <div className="left-box">
                        <Profile/>
                        <Weather/>
                    </div>
                    <div className="right-box">
                        <Notes/>
                    </div>
                </div>
                <div className="lower">
                    <TimerCard/>
                </div>
            </div>
            <div className="right-container">
                <News/>
            </div>
        </div>
    )
}

export default HomePage
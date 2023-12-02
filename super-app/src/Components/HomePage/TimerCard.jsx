import React, { useEffect, useState } from 'react';
import Increment from '../../Assets/Increment.png';
import Decrement from '../../Assets/Decrement.png';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import TimerAudio from '../../Assets/TimerAudio.mp3';
import { Link } from 'react-router-dom';

const TimerCard = () => {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [isStart, setIsStart] = useState(false);
    const [audio] = useState(new Audio(TimerAudio));
    const [buttonLabel, setButtonLabel] = useState('Start');

    const calculateDuration = () => {
        return hours * 3600 + minutes * 60 + seconds;
    };

    const changeValue = (type, value) => {
        if (!isStart) {
            if (type === 'hours') {
                setHours((prevHours) => Math.max(0, prevHours + value));
            } else if (type === 'minutes') {
                setMinutes((prevMinutes) => Math.max(0, prevMinutes + value));
            } else if (type === 'seconds') {
                setSeconds((prevSeconds) => Math.max(0, prevSeconds + value));
            }
        }
    };

    const handleStartStop = () => {
        if (isStart) {
            setIsStart(false);
            setHours(0);
            setMinutes(0);
            setSeconds(0);
            setButtonLabel('Start');
        } else {

            setIsStart(true);
            setButtonLabel('Stop');

        }
    };

    const onComplete = ({ remainingTime }) => {
        audio.play().catch((error) => console.error('Error playing audio:', error));
        setHours(0);
        setMinutes(0);
        setSeconds(0);
        setIsStart(false);
        setButtonLabel('Start');
    };



    const children = ({ remainingTime }) => {
        const remainingHours = remainingTime > 0 ? Math.floor(remainingTime / 3600) : 0;
        const remainingMinutes = remainingTime > 0 ? Math.floor((remainingTime % 3600) / 60) : 0;
        const remainingSeconds = remainingTime > 0 ? remainingTime % 60 : 0;

        return `${remainingHours < 10 ? `0${remainingHours}` : remainingHours}:${remainingMinutes < 10 ? `0${remainingMinutes}` : remainingMinutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
    };



    return (
        <div className="timercard-page">
            <div id="timer-circle" style={isStart ? { animation: 'boxShadowAnimation 1s infinite ease-in-out' } : {}}>
                <CountdownCircleTimer
                    isPlaying={isStart}
                    duration={calculateDuration()}
                    colors={['#FF6A6A']}
                    size={165}
                    strokeWidth={6}
                    onComplete={onComplete}
                    children={children}
                />
            </div>
            <div id="timer-box">
                <div className="set-timer">
                    <div className="time-box" id="hours">
                        <p id="hh-mm-ss">Hours</p>
                        <img id='inc-dec' src={Increment} onClick={() => changeValue('hours', 1)}></img>
                        <p id="timer-value">{hours < 10 ? `0${hours}` : `${hours}`}</p>
                        <img id='inc-dec' src={Decrement} onClick={() => changeValue('hours', -1)}></img>
                    </div>
                    <p id="colon">:</p>
                    <div className="time-box" id="minutes">
                        <p id="hh-mm-ss">Minutes</p>
                        <img id='inc-dec' src={Increment} onClick={() => changeValue('minutes', 1)}></img>
                        <p id="timer-value">{minutes < 10 ? `0${minutes}` : `${minutes}`}</p>
                        <img id='inc-dec' src={Decrement} onClick={() => changeValue('minutes', -1)}></img>
                    </div>
                    <p id="colon">:</p>
                    <div className="time-box" id="seconds">
                        <p id="hh-mm-ss">Seconds</p>
                        <img id='inc-dec' src={Increment} onClick={() => changeValue('seconds', 1)}></img>
                        <p id="timer-value">{seconds < 10 ? `0${seconds}` : `${seconds}`}</p>
                        <img id='inc-dec' src={Decrement} onClick={() => changeValue('seconds', -1)}></img>
                    </div>
                </div>
                <button id="timer-start-stop" onClick={handleStartStop}>
                    {isStart ? 'Stop' : 'Start'}
                </button>
            </div>

            <Link to='entertainment' className='browse-btn'>Browse</Link>
        </div>
    );
};

export default TimerCard;



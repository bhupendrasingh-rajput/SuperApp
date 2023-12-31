import React, { useEffect, useState } from 'react';
import './HomePage.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const formattedDate = (newsDate) => {
    newsDate = new Date(newsDate);
    return `${newsDate.getMonth()}-${newsDate.getDate()}-${newsDate.getFullYear()}`;
}

const formattedTime = (newsTime) => {
    newsTime = new Date(newsTime);
    let hours = newsTime.getHours() % 12 || 12;
    hours = hours < 10 ? '0' + hours : hours;
    let minutes = newsTime.getMinutes < 10 ? '0' + newsTime.getMinutes() : newsTime.getMinutes();
    let AmPm = newsTime.getHours() >= 12 ? 'PM' : 'AM';
    return `${hours}:${minutes} ${AmPm}`
}

const News = () => {
    const [newsData, setNewsData] = useState([]);

    const headers = {
        'apikey': 'jawrEKjcpdYDvmWcD3rfqiGAYZJeovyk',
    };

    const params = {
        'source-countries': 'us,in',
    };

    const getNews = async () => {
        try {
            const response = await axios.get('https://api.apilayer.com/world_news/search-news', {headers ,params});
            const newsArray = response.data.news.map((item) => ({
                newsImage: item.image,
                newsHeading: item.title,
                newsDescription: item.text,
                newsPublishedAt: item.publish_date,
            }));
            setNewsData(newsArray);
        } catch (e) {
            console.error("Error in fetching News :", e);
            toast.error("Error in fetching News!",)
        }
    }


    useEffect(() => {
        getNews()
    }, []);


    const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % newsData.length);
        }, 30000);
        return () => clearInterval(intervalId);
    }, [newsData]);

    const currentNews = newsData[currentNewsIndex];

    const requiredDate = currentNews ? formattedDate(currentNews.newsPublishedAt) : '';
    const requiredTime = currentNews ? formattedTime(currentNews.newsPublishedAt) : '';


    return (
        <div className='news-page'>
            <div className="news-head" >
                <img id='news-image' src={currentNews?.newsImage} alt="news-image" />
                <div className="news-overlay" >
                    <div id="news-heading">{currentNews?.newsHeading}</div>
                    <div id="news-timing">{`${requiredDate} | ${requiredTime}`}</div>
                </div>
            </div>
            <div id="news-content">{currentNews?.newsDescription}</div>

        </div>
    )

};

export default News;
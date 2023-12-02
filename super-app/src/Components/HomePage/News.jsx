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
    // console.log(hours, minutes, AmPm);
    return `${hours}:${minutes} ${AmPm}`
}

const News = () => {
    const [newsData, setNewsData] = useState([]);

    var url = 'https://newsapi.org/v2/top-headlines?' +
        'country=us&' +
        'apiKey=e97142b4176643abb7f7e6081808c9e7';

    const getNews = async () => {
        try {
            const response = await axios.get(url);
            const newsArray = response.data.articles.map((item) => ({
                newsImage: item.urlToImage,
                newsHeading: item.title,
                newsDescription: item.description,
                newsPublishedAt: item.publishedAt,
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
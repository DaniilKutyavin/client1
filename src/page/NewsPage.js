import React, { useState, useContext, useEffect } from 'react';
import '../style/news.css';
import arrowDown from '../img/стрелка вниз.svg';
import { Link } from 'react-router-dom';
import Store from '../componenets/Store';
import Shkal from '../componenets/Shkal';
import { Context } from '..';
import { getNews } from '../http/newsApi';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale'; 

const News = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [localNews, setLocalNews] = useState([]);
  const { news } = useContext(Context);
  const [showNext, setShowNext] = useState(true); // Измените начальное состояние на true

  useEffect(() => {
    getNews()
      .then(data => {
        news.setNews(data);
        setLocalNews(data);
      })
      .catch(error => {
        console.error("Ошибка при загрузке новостей:", error);
      });
  }, [news]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? localNews.length - 1 : prevIndex - 1));
    setShowNext(false);
    setTimeout(() => setShowNext(true), 300);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === localNews.length - 1 ? 0 : prevIndex + 1));
    setShowNext(false);
    setTimeout(() => setShowNext(true), 300);
  };

  if (localNews.length === 0) {
    return <p>Загрузка новостей...</p>;
  }

  const currentNews = localNews[currentIndex];
  const formattedDate = currentNews
    ? format(new Date(currentNews.createdAt), 'dd MMMM yyyy', { locale: ru })
    : '';
    
  const nextIndex = (currentIndex + 1) % localNews.length;
  const nextNews = localNews[nextIndex];

  return (
    <>
      <div className="header">
        <div className="title-block">
          <h1>Новости</h1>
          <p className="pod">Будьте в курсе всех событий</p>
        </div>
      </div>
      <div className="news-section">
        <div className="news-content">
          <div className="news-circle">
            <div className="news-text">
              <span className="news-date">{formattedDate}</span>
              <h2>{currentNews.title}</h2>
            </div>
            <img
              src={process.env.REACT_APP_API_URL + '/news/' + currentNews.img}
              className="news-image"
              alt={currentNews.title}
            />
          </div>
          <div className={`next-news-text ${showNext ? 'show' : ''}`}>
            {nextNews && (
              <>
                <span className="next-news-date">
                  {format(new Date(nextNews.createdAt), 'dd MMMM yyyy', { locale: ru })}
                </span>
                <h2 className="next-news-title">
                  {nextNews.title}
                </h2>
              </>
            )}
          </div>
        </div>
        <div className="news-info">
          <button className="news-button" onClick={handlePrevious}>
            <img src={arrowDown} alt="Предыдущий" className="arrow-icon rotate-left" />
          </button>
          <Link to={`/news/${currentNews.id}`}>
            <button className="read-button">Читать</button>
          </Link>
          <button className="news-button" onClick={handleNext}>
            <img src={arrowDown} alt="Следующий" className="arrow-icon rotate-right" />
          </button>
        </div>
      </div>
      <Store />
      <Shkal />
    </>
  );
};

export default News;

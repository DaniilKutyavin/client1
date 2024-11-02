import React, { useEffect, useContext } from 'react';
import '../style/newss.css';
import Store from '../componenets/Store';
import Shkal from '../componenets/Shkal';
import { getNewsOne } from '../http/newsApi';
import { Context } from '..';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

const NewsArticle = () => {
  const { news } = useContext(Context);
  const { id } = useParams(); // Получение id из URL

  useEffect(() => {
    // Загружаем данные о новости при загрузке компонента
    getNewsOne(id)
      .then(data => {
        news.setNews(data); // Сохраняем новость в контексте
      })
      .catch(err => console.error("Ошибка при загрузке новости:", err));
  }, [id, news]);

  const currentNews = news.news; // Поиск текущей новости по id

  if (!currentNews) {
    return <p>Загрузка статьи...</p>; // Сообщение, пока данные не загружены
  }

  return (
    <>
      <div className="article-container">
        <h1 className="article-title pod">{currentNews.title}</h1> {/* Заголовок статьи */}
        <img
          src={process.env.REACT_APP_API_URL + '/news/' + currentNews.img} // Изображение статьи
          alt={currentNews.title}
          className="article-image"
        />
        <p className="article-text">
          {currentNews.description} {/* Основной текст статьи */}
        </p>
      </div>
      <Store />
      <Shkal />
    </>
  );
};

export default observer(NewsArticle);

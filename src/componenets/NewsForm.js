import React, { useState, useEffect } from 'react';
import { createNews, getNews } from '../http/newsApi'; // Импортируем API функции
import '../style/ProductBuyForm.css'; // Импортируем стили

const NewsPage = () => {
    const [newsList, setNewsList] = useState([]);
    const [formData, setFormData] = useState({ title: '', description: '', img: null });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const data = await getNews();
                setNewsList(data);
            } catch (error) {
                console.error('Ошибка при получении новостей:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);

    const handleChange = (e) => {
        if (e.target.name === 'img') {
            setFormData({ ...formData, img: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleCreateNews = async (e) => {
        e.preventDefault();
        
        // Создаем объект FormData
        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('description', formData.description);
        
        if (formData.img) {
            formDataToSend.append('img', formData.img);
        }

        try {
            const newNews = await createNews(formDataToSend);
            setNewsList([...newsList, newNews]);
            setFormData({ title: '', description: '', img: null });
        } catch (error) {
            console.error('Ошибка при добавлении новости:', error);
        }
    };

    if (loading) {
        return <p>Загрузка новостей...</p>;
    }

    return (
        <div className="news-page">
            <h1 className="news-title">Новости</h1>

            <form className="news-form" onSubmit={handleCreateNews}>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Название новости"
                    required
                    className="form-input"
                />
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Описание"
                    required
                    className="form-textarea"
                />
                <input
                    type="file"
                    name="img"
                    accept="image/*"
                    onChange={handleChange}
                    required
                    className="form-file"
                />
                <button type="submit" className="form-button">Добавить новость</button>
            </form>

            <div className="news-list">
                {newsList.length > 0 ? (
                    newsList.map((newsItem) => (
                        <div key={newsItem.id} className="news-item">
                            <h2 className="news-item-title">{newsItem.title}</h2>
                            <p className="news-item-description">{newsItem.description}</p>
                            {newsItem.img && <img src={newsItem.img} alt={newsItem.title} className="news-item-image" />}
                        </div>
                    ))
                ) : (
                    <p>Новостей пока нет.</p>
                )}
            </div>
        </div>
    );
};

export default NewsPage;

import React, { useEffect, useState } from 'react';
import { getAll, updateDelivery } from '../http/deliveryApi'; // Импорт функций API
import '../style/ProductBuyForm.css';

const DeliveryPage = () => {
    const [formData, setFormData] = useState({
        title: '',
        title_small: '',
        description_one: '',
        description_two: '',
        time_start: '',
        time_end: '',
        telephone: '',
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDelivery = async () => {
            try {
                const data = await getAll(); // Получаем все доставки
                if (data.length > 0) {
                    const delivery = data[0]; // Предполагаем, что есть только одна доставка
                    setFormData({
                        title: delivery.title || '',
                        title_small: delivery.title_small || '',
                        description_one: delivery.description_one || '',
                        description_two: delivery.description_two || '',
                        time_start: delivery.time_start || '',
                        time_end: delivery.time_end || '',
                        telephone: delivery.telephone || '',
                    });
                }
            } catch (error) {
                console.error('Ошибка при получении доставок:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDelivery();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Object.values(formData).some(value => value === '')) {
            console.error('Форма не полностью заполнена:', formData);
            return;
        }

        try {
            // Обновляем данные доставки
            const updateResponse = await updateDelivery(formData); // ID не нужен, так как есть только одна запись
            console.log('Обновление успешно:', updateResponse);
        } catch (error) {
            console.error('Ошибка при обновлении доставки:', error);
        }
    };

    if (loading) {
        return <p>Загрузка доставок...</p>;
    }

    return (
        <div className="delivery-page">
            <h1>Доставка</h1>
            <form className="delivery-form" onSubmit={handleSubmit}>
                <label htmlFor="title">Заголовок:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Введите заголовок"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
                
                <label htmlFor="title_small">Маленький заголовок:</label>
                <input
                    type="text"
                    id="title_small"
                    name="title_small"
                    placeholder="Введите маленький заголовок"
                    value={formData.title_small}
                    onChange={handleChange}
                />
                
                <label htmlFor="description_one">Описание 1:</label>
                <textarea
                    id="description_one"
                    name="description_one"
                    placeholder="Введите первое описание"
                    value={formData.description_one}
                    onChange={handleChange}
                    required
                />
                
                <label htmlFor="description_two">Описание 2:</label>
                <textarea
                    id="description_two"
                    name="description_two"
                    placeholder="Введите второе описание"
                    value={formData.description_two}
                    onChange={handleChange}
                />
                
                <label htmlFor="time_start">Время начала доставки:</label>
                <input
                    type="text"
                    id="time_start"
                    name="time_start"
                    placeholder="Введите время начала"
                    value={formData.time_start}
                    onChange={handleChange}
                    required
                />
                
                <label htmlFor="time_end">Время окончания доставки:</label>
                <input
                    type="text"
                    id="time_end"
                    name="time_end"
                    placeholder="Введите время окончания"
                    value={formData.time_end}
                    onChange={handleChange}
                    required
                />
                
                <label htmlFor="telephone">Телефон:</label>
                <input
                    type="text"
                    id="telephone"
                    name="telephone"
                    placeholder="Введите номер телефона"
                    value={formData.telephone}
                    onChange={handleChange}
                    required
                />
                
                <button type="submit">Сохранить</button>
            </form>
        </div>
    );
};

export default DeliveryPage;

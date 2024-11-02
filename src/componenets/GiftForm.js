import React, { useEffect, useState } from 'react';
import { getGift, updateGift } from '../http/giftApi';
import '../style/ProductBuyForm.css';

const GiftForm = ({ onCancel }) => {
    const [formData, setFormData] = useState({
        description: '',
        nameOne: '',
        priceOne: '',
        nameTwo: '',
        priceTwo: '',
        nameThree: '',
        priceThree: '',
        imgOne: null,
        imgTwo: null,
        imgThree: null,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGiftData = async () => {
            try {
                const giftData = await getGift();
                if (giftData && Array.isArray(giftData) && giftData.length > 0) {
                    const gift = giftData[0];
                    setFormData({
                        description: gift.description || '',
                        nameOne: gift.nameOne || '',
                        priceOne: gift.priceOne || '',
                        nameTwo: gift.nameTwo || '',
                        priceTwo: gift.priceTwo || '',
                        nameThree: gift.nameThree || '',
                        priceThree: gift.priceThree || '',
                        imgOne: gift.imgOne || null,
                        imgTwo: gift.imgTwo || null,
                        imgThree: gift.imgThree || null,
                    });
                } else {
                    console.error('Gift data not found or empty');
                }
                setLoading(false);
            } catch (error) {
                console.error('Error loading gift data:', error);
                setLoading(false);
            }
        };

        fetchGiftData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            setFormData((prev) => ({ ...prev, [name]: files[0] }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('description', formData.description);
        formDataToSend.append('nameOne', formData.nameOne);
        formDataToSend.append('priceOne', formData.priceOne);
        formDataToSend.append('nameTwo', formData.nameTwo);
        formDataToSend.append('priceTwo', formData.priceTwo);
        formDataToSend.append('nameThree', formData.nameThree);
        formDataToSend.append('priceThree', formData.priceThree);

        if (formData.imgOne) formDataToSend.append('imgOne', formData.imgOne);
        if (formData.imgTwo) formDataToSend.append('imgTwo', formData.imgTwo);
        if (formData.imgThree) formDataToSend.append('imgThree', formData.imgThree);

        try {
            await updateGift(formDataToSend);
            alert('Gift successfully updated');
        } catch (error) {
            console.error('Error updating gift:', error);
            alert('Error updating gift');
        }
    };

    if (loading) {
        return <div>Loading data...</div>;
    }

    return (
        <div className="giftForm_container">
            <h2>Update Gift</h2>
            <form onSubmit={handleSubmit}>
                <div className="giftForm_group">
                    <label>Описание</label>
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>
                <div className="giftForm_group">
                    <label>Название 1</label>
                    <input
                        type="text"
                        name="nameOne"
                        value={formData.nameOne}
                        onChange={handleChange}
                    />
                </div>
                <div className="giftForm_group">
                    <label>Цена 1</label>
                    <input
                        type="text"
                        name="priceOne"
                        value={formData.priceOne}
                        onChange={handleChange}
                    />
                </div>
                <div className="giftForm_group">
                    <label>Название 2</label>
                    <input
                        type="text"
                        name="nameTwo"
                        value={formData.nameTwo}
                        onChange={handleChange}
                    />
                </div>
                <div className="giftForm_group">
                    <label>Цена 2</label>
                    <input
                        type="text"
                        name="priceTwo"
                        value={formData.priceTwo}
                        onChange={handleChange}
                    />
                </div>
                <div className="giftForm_group">
                    <label>Название 3</label>
                    <input
                        type="text"
                        name="nameThree"
                        value={formData.nameThree}
                        onChange={handleChange}
                    />
                </div>
                <div className="giftForm_group">
                    <label>Цена 3</label>
                    <input
                        type="text"
                        name="priceThree"
                        value={formData.priceThree}
                        onChange={handleChange}
                    />
                </div>
                <div className="giftForm_group">
                    <label>Изображение 1</label>
                    <input
                        type="file"
                        name="imgOne"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>
                <div className="giftForm_group">
                    <label>Изображение 2</label>
                    <input
                        type="file"
                        name="imgTwo"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>
                <div className="giftForm_group">
                    <label>Изображение 3</label>
                    <input
                        type="file"
                        name="imgThree"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>
                <button type="submit" className="giftForm_submitButton">Сохранить</button>
                <button type="button" onClick={onCancel}>Отменить</button>
            </form>
        </div>
    );
};

export default GiftForm;

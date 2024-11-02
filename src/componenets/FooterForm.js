import React, { useEffect, useState } from 'react';
import { getAll, updateFooter } from '../http/footerApi'; // Adjust the import path accordingly
import '../style/ProductBuyForm.css';

const FooterForm = ({ onCancel = () => {} }) => {
    const [footerData, setFooterData] = useState({
        telephoneOne: '',
        telephoneTwo: '',
        Email: '',
        time: ''
    });

    useEffect(() => {
        const fetchFooterData = async () => {
            try {
                const data = await getAll();
                if (data && data.length > 0) {
                    const footerInfo = data[0];
                    setFooterData({
                        telephoneOne: footerInfo.telephoneOne || '',
                        telephoneTwo: footerInfo.telephoneTwo || '',
                        Email: footerInfo.Email || '',
                        time: footerInfo.time || ''
                    });
                }
            } catch (error) {
                console.error('Error fetching footer data:', error);
            }
        };
        fetchFooterData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFooterData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateFooter(footerData);
            onCancel(); // Close the form after submission
        } catch (error) {
            console.error('Error updating footer data:', error);
        }
    };

    return (
        <div className="footerForm_container">
            <h3>Обновить Футер</h3>
            <form onSubmit={handleSubmit} className="footerForm">
                <div className="footerForm_group">
                    <label>
                        Телефон 1:
                        <input
                            type="text"
                            name="telephoneOne"
                            value={footerData.telephoneOne}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div className="footerForm_group">
                    <label>
                        Телефон 2:
                        <input
                            type="text"
                            name="telephoneTwo"
                            value={footerData.telephoneTwo}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className="footerForm_group">
                    <label>
                        Email:
                        <input
                            type="email"
                            name="Email"
                            value={footerData.Email}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div className="footerForm_group">
                    <label>
                        Время работы:
                        <input
                            type="text"
                            name="time"
                            value={footerData.time}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <button type="submit" className="footerForm_submitButton">Обновить</button>
               
            </form>
        </div>
    );
};

export default FooterForm;

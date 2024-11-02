import React, { useState, useEffect } from 'react';
import { buyProduct, deletebuyProduct, getbuyProduct } from '../http/productApi';
import '../style/ProductBuyForm.css'; // Import the CSS file // Import the CSS file

const ProductBuyForm = () => {
    const [name, setName] = useState('');
    const [priceOne, setPriceOne] = useState('');
    const [priceTwo, setPriceTwo] = useState('');
    const [category, setCategory] = useState('');
    const [info, setInfo] = useState([{ name: '' }]);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const data = await getbuyProduct();
            setProducts(data);
        } catch (error) {
            console.error('Ошибка при получении продуктов:', error);
        }
    };

    const addInfo = () => setInfo([...info, { name: '' }]);

    const handleInfoChange = (index, event) => {
        const newInfo = [...info];
        newInfo[index].name = event.target.value;
        setInfo(newInfo);
    };

    const handlePriceOneChange = (e) => {
        setPriceOne(e.target.value);
    };

    const handlePriceTwoChange = (e) => {
        setPriceTwo(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const formData = {
                name,
                price_one: parseFloat(priceOne),
                price_two: parseFloat(priceTwo),
                category,
                info,
            };
            await buyProduct(formData);
            alert('Продукт успешно добавлен');
            resetForm();
            fetchProducts();
        } catch (err) {
            console.error('Ошибка при добавлении продукта:', err);
            setError('Ошибка при добавлении продукта. Попробуйте еще раз.');
        }
    };

    const handleDeleteProduct = async (id) => {
        if (window.confirm('Вы уверены, что хотите удалить этот продукт?')) {
            try {
                await deletebuyProduct(id);
                alert('Продукт успешно удален');
                fetchProducts();
            } catch (error) {
                console.error('Ошибка при удалении продукта:', error);
            }
        }
    };

    const resetForm = () => {
        setName('');
        setPriceOne('');
        setPriceTwo('');
        setCategory('');
        setInfo([{ name: '' }]);
    };

    return (
        <div className="productBuyForm_container">
            <h2>Добавить продукт</h2>
            <form onSubmit={handleSubmit}>
                <div className="productBuyForm_group">
                    <label>Название:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="productBuyForm_group">
                    <label>Цена 1:</label>
                    <input
                        type="number"
                        value={priceOne}
                        onChange={handlePriceOneChange}
                        required
                    />
                </div>
                <div className="productBuyForm_group">
                    <label>Цена 2:</label>
                    <input
                        type="number"
                        value={priceTwo}
                        onChange={handlePriceTwoChange}
                        required
                    />
                </div>
                <div className="productBuyForm_group">
                    <label>Категория:</label>
                    <input
                        type="text"
                        value={category}
                        onChange={handleCategoryChange}
                        required
                    />
                </div>
                <div className="productBuyForm_group">
    <label>Информация о продукте:</label>
    <div className="productBuyForm_infoFields"> {/* New class applied here */}
        {info.map((item, index) => (
            <input
                key={index}
                type="text"
                value={item.name}
                onChange={(e) => handleInfoChange(index, e)}
                placeholder="Введите информацию"
            />
        ))}
    </div>
    <button type="button" className="productBuyForm_addInfoButton" onClick={addInfo}>
        Добавить еще информацию
    </button>
</div>
                {error && <p className="productBuyForm_errorMessage">{error}</p>}
                <button type="submit" className="productBuyForm_submitButton">Создать</button>
            </form>
            <h2>Список продуктов</h2>
            <ul className="productBuyForm_productList">
                {products.map((product) => (
                    <li key={product.id} className="productBuyForm_productItem">
                        {product.name} - {product.price_one} / {product.price_two} 
                        <button onClick={() => handleDeleteProduct(product.id)} className="productBuyForm_deleteButton">Удалить</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductBuyForm;

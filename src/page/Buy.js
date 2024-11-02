import React, { useState, useEffect } from 'react';
import '../style/Buy.css';
import arrowDown from '../img/стрелка вниз.svg';
import exampleImage from '../img/ценник.svg';
import Store from '../componenets/Store';
import Shkal from '../componenets/Shkal';
import lupa from '../img/лупа.svg';
import { getbuyProduct } from '../http/productApi'; // Adjust the path to your api file

const Prod = () => {
    const [filtersOpen, setFiltersOpen] = useState({
        category: true,
        culture: true,
        manufacturer: true,
    });
    const [expandedBlocks, setExpandedBlocks] = useState({});
    const [products, setProducts] = useState([]); // State to hold fetched products
    const [loading, setLoading] = useState(true); // State to handle loading state
    const [error, setError] = useState(null); // State to handle errors

    const toggleFilter = (filter) => {
        setFiltersOpen({
            ...filtersOpen,
            [filter]: !filtersOpen[filter],
        });
    };

    const toggleExpand = (id) => {
        setExpandedBlocks({
            ...expandedBlocks,
            [id]: !expandedBlocks[id],
        });
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getbuyProduct();
                setProducts(data); // Set the fetched product data
            } catch (err) {
                setError(err.message); // Handle error if occurs
            } finally {
                setLoading(false); // Update loading state
            }
        };

        fetchProducts(); // Call the fetch function
    }, []); // Empty dependency array means this runs once when the component mounts

    return (
        <>
            <div className="header">
                <div className="title-block">
                    <h1>Закупка С/Х культур</h1>
                    <p className="pod">Продайте по максимально выгодным ценам</p>
                </div>
            </div>
            <div className="wrapperr">
                <div className="catalog-containerr">
                    <div className="left-section">
                        <div className="filter-block">
                            <div className="search-bar">
                                <input type="text" placeholder="Поиск..." className="search-input" />
                                <span className="search-icon"><img src={lupa} alt="Search" /></span>
                            </div>
                            <div className="filter-section">
                                <h2 onClick={() => toggleFilter('category')}>
                                    Категория
                                    <img src={arrowDown} alt="Arrow Down" className={`filter-arrow ${filtersOpen.category ? 'open' : ''}`} />
                                </h2>
                                {filtersOpen.category && (
                                    <div className="filter-content">
                                        <input type="checkbox" className="custom-checkbox" id="hhapppy" name="happy" value="yes" />
                                        <label htmlFor="hhapppy">Пшеница</label>
                                        <p />
                                        <input type="checkbox" className="custom-checkbox" id="hhapppy2" name="happy" value="yes" />
                                        <label htmlFor="hhapppy2">Ячмень</label>
                                        <p />
                                        <input type="checkbox" className="custom-checkbox" id="hhapppy3" name="happy" value="yes" />
                                        <label htmlFor="hhapppy3">Кукуруза</label>
                                        <p />
                                        <input type="checkbox" className="custom-checkbox" id="hhapppy4" name="happy" value="yes" />
                                        <label htmlFor="hhapppy4">Соя</label>
                                    </div>
                                )}
                            </div>
                            <button className="filter-cancel-button">Отмена</button>
                        </div>
                    </div>
                    <div className="right-section">
                        <div className="product-list">
                            {loading && <p>Загрузка...</p>}
                            {error && <p>Ошибка: {error}</p>}
                            {!loading && !error && products.length === 0 && (
                                <div className="info-blockk">
                                    <div className="text-contentt">
                                        <h1 className="titleoffer">Нет доступных оферов!</h1>
                                        <p>Хотите узнать о возможности продать культуру первым?</p>
                                        <p>Напишите в службу поддержки или позвоните оператору. Вас уведомят заранее!</p>
                                    </div>
                                    <div className="image-contentt">
                                        <img src={exampleImage} alt="Example" />
                                    </div>
                                </div>
                            )}
                            {products.map((product, index) => (
                                <div key={index} className="product-item">
                                    <div className="product-header" onClick={() => toggleExpand(product.id)}>
                                        <div className="product-title-price">
                                            <span className="product-title">{product.name}</span>
                                            <span className="product-pricee">{product.price} р/т</span>
                                        </div>
                                        <img src={arrowDown} alt="Arrow Down" className={`expand-arrow ${expandedBlocks[product.id] ? 'open' : ''}`} />
                                    </div>
                                    {expandedBlocks[product.id] && (
                                        <div className="product-description">
                                            {product.info.map((infoItem) => (
                                                <p key={infoItem.id}>{infoItem.name}</p>
                                                
                                            ))}
                                             <button className="sell-button">Продать</button>
                                        </div>
                                    )}
                                    <div className="divider"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Store />
            <Shkal />
        </>
    );
};

export default Prod;

import React, { useContext, useEffect } from 'react';
import '../style/PopupInfo.css';
import iconProd from '../img/Образец ХСЗР на сайт.png'; // Импортируем изображение
import present from '../img/подарок белый.svg'; 
import { Context } from '..';
import {getGift} from '../http/giftApi'
import { observer } from 'mobx-react-lite';

const PopupInfo = ({ onClose }) => {

  const {gift} = useContext(Context)

  useEffect ( ()=> {
    getGift().then(data => gift.setGift(data))
  }, [])
  
  const item = gift.gift[0];
  return (
    <div className="popup-info">
      <button className="close-button" onClick={onClose}>×</button>
      <div className="title-with-present">
        <h4 className="popup-title">ПОДАРОК</h4>
        <img className="present" src={present} alt="Подарок" />
      </div>
      <p className="popup-description">
        {item?.description}
      </p>
      <div className="popup-products">
          <div className="product-itemm" >
            <img  src={process.env.REACT_APP_API_URL + item?.imgOne}className="product-imagee" />
            <div className="product-info">
              <h5>{item?.nameOne}</h5>
              <p>{item?.priceOne}</p>
            </div>
          </div>
          <div className="product-itemm" >
            <img  src={process.env.REACT_APP_API_URL + item?.imgTwo} className="product-imagee" />
            <div className="product-info">
              <h5>{item?.nameTwo}</h5>
              <p>{item?.priceTwo}</p>
            </div>
          </div>
          <div className="product-itemm" >
            <img src={process.env.REACT_APP_API_URL + item?.imgThree} className="product-imagee" />
            <div className="product-info">
              <h5>{item?.nameThree}</h5>
              <p>{item?.priceThree}</p>
            </div>
          </div>
      </div>
    </div>
  );
};

export default observer(PopupInfo);

import React from 'react';
import '../style/store.css';
import acidImage from '../img/комбаин.svg';
import appStoreLogo from '../img/ап сторр.svg'; // Лого App Store
import googlePlayLogo from '../img/ру сторр.svg'; // Лого Google Play
import sloganSvg from '../img/слоган.svg';

const Store = () => {
  return (
    <div className="page-content">
    <div className="acid-gradient-container">
                <img src={acidImage} alt="Acid Gradient Background" className="acid-image" />
                
                {/* Текст в левом верхнем углу */}
                <div className="acid-text ttop-left">
                    <h1>В скором времени</h1>
                    <p>Загружайте приложение на площадках</p>
                    <div className="store-logos">
                        <img src={appStoreLogo} alt="App Store" className="store-logo" />
                        <img src={googlePlayLogo} alt="Google Play" className="store-logo" />
                    </div>
                </div>

                {/* Слоган в правом верхнем углу */}
                <div className="acid-slogan ttop-right">
                    <img src={sloganSvg} alt="Slogan" />
                </div>
            </div>
            </div>    
  );  
};

export default Store;

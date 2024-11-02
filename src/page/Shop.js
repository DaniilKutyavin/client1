import React, { useEffect, useRef, useState, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../style/shop.css";
import { Link, useLocation } from "react-router-dom";
import Cart from "../componenets/Cart";
import videoSrc from "../img/main.gif";
import PopupInfo from "../componenets/PopupInfo";
import { getBasket } from "../http/productApi";
import { Context } from "..";
import baskcol from "../img/Корзина цвет.svg";

import img1 from "../img/img1.jpg";
import img2 from "../img/img2.jpg";
import img3 from "../img/img3.jpg";
import img4 from "../img/img4.jpg";
import img5 from "../img/img5.jpg";
import img6 from "../img/img6.jpg";
import circle1 from "../img/кольцо1.svg";
import circle2 from "../img/кольцо2.svg";
import circle3 from "../img/кольцо3.svg";
import circle4 from "../img/Кольцо4.svg";
import kolos from "../img/Колос.svg"; // Ваш SVG слоган
import Store from "../componenets/Store";
import bask from "../img/корзина белая 1.svg";
import pod from "../img/подарок.svg";
import ScrollContainer from "../componenets/scroll";
import { observer } from "mobx-react-lite";
import HorizontalScrollComponent from "../componenets/scroll";
import { getGlavImgs} from "../http/glawimgApi";

const Shop = observer(({ userId }) => {
  const [isSticky, setIsSticky] = useState(false);
  const rewardScaleRef = useRef(null);
  const [glavImgs, setGlavImgs] = useState([]);

  useEffect(() => {
    fetchGlavImgs();
  }, []);

  const fetchGlavImgs = async () => {
    try {
      const data = await getGlavImgs();
      setGlavImgs(data);
    } catch (error) {
      console.error("Error fetching images", error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!rewardScaleRef.current) return;
      const { top, bottom } = rewardScaleRef.current.getBoundingClientRect();
      const shopContainer = document.querySelector(".shop-container");
      const { bottom: shopBottom } = shopContainer.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Проверяем, когда нижняя граница блока достигает нижней границы экрана
      if (bottom <= viewportHeight && !isSticky) {
        setIsSticky(true);
      }
      // Проверяем, когда верхняя граница блока достигает нижней границы shop-container
      else if (isSticky && top < shopBottom) {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Запускаем обработчик сразу, чтобы установить правильное состояние
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isSticky]);

  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartClick = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const [isGifVisible, setIsGifVisible] = useState(true);

  useEffect(() => {
    // Установите время в зависимости от продолжительности вашего GIF
    const gifDuration = 5000; // например, 5 секунд
    const timeout = setTimeout(() => {
      setIsGifVisible(false);
    }, gifDuration);

    return () => clearTimeout(timeout); // очистить таймаут при размонтировании компонента
  }, []);

  const [isPopupOpen, setIsPopupOpen] = useState(false); // Состояние для всплывающего окна
  const handleGiftClick = () => setIsPopupOpen(true); // Открытие всплывающего окна
  const closePopup = () => setIsPopupOpen(false); // Закрытие всплывающего окна

  const [totalAmount, setTotalAmount] = useState(0);
  const [itemsInBasket, setItemsInBasket] = useState([]);
  const { user } = useContext(Context);

  const getGradient = () => {
    const maxAmount = 150000; // Maximum total amount for 100% gradient fill
    const percentage = Math.min((totalAmount / maxAmount) * 100, 100); // Calculate percentage based on totalAmount

    return `linear-gradient(to right, #4f6423 ${percentage}%, #1A1A1A 100%)`;
  };

  useEffect(() => {
    const fetchBasket = async () => {
      try {
        const data = await getBasket(userId);
        const products = data.basket_products || [];
        const total = products.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        setTotalAmount(total);

        setItemsInBasket(
          products.map((item) => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
          }))
        );
      } catch (error) {
        console.error("Error fetching basket:", error);
      }
    };

    fetchBasket();
  }, [userId]);
  return (
    <>
      {isGifVisible && (
        <div className="video-container">
          <img src={videoSrc} alt="Animated GIF" />
        </div>
      )}
      {/* Слайдер */}
      <div className="shop-container">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          loop={true}
          pagination={{ clickable: true }}
          className="shop-slider"
        >
         {glavImgs.map((img, index) => (
            <SwiperSlide key={index} className="shop-slide">
              <img src={process.env.REACT_APP_API_URL + img?.img} alt={`Slide ${index}`} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="blur-overlay-container">
          <div className="blur-overlay-top">
            <Link to="/product/type/1" className="blur-block top-left">
              <p className="opis">163</p>
              <h4>ХСЗР</h4>
              <p>Обеспечте защиту ваших культур</p>
            </Link>
            <Link to="/product/type/2" className="blur-block top-right">
              <p className="opis">24</p>
              <h4>Удобрения</h4>
              <p>Потдерживайте почву необходимыми элементами питания</p>
            </Link>
          </div>
          <div className="blur-overlay-bottom">
            <Link to="/product/type/3" className="blur-block long bottom-right">
              <p className="opis">19</p>
              <h4>Посевной материал</h4>
              <p>Запаситесь качественными семенами заранее</p>
            </Link>
            <Link to="/buy" className="blur-block short bottom-left">
              <p className="text-left opis">8</p>
              <img src={kolos} alt="Block 4 Image" className="block4-image" />
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`reward-scale ${isSticky ? "sticky" : ""}`}
        style={{ background: getGradient() }}
        ref={rewardScaleRef}
      >
        <div className="gift-container">
          <img src={pod} alt="Gift" onClick={handleGiftClick} />
          <div className="gift-text" onClick={handleGiftClick}>
            <h4>СЗР в подарок</h4>
            <p>Как это работает?</p>
          </div>
        </div>

        <div className="scale-container">
          <div className="scale-values">
            <span
              className={
                totalAmount >= 50000 ? "value-1 gradient-text" : "value-1"
              }
            >
              50 000
            </span>
            <span
              className={
                totalAmount >= 100000 ? "value-2 gradient-text" : "value-2"
              }
            >
              100 000
            </span>
            <span
              className={
                totalAmount >= 150000 ? "value-3 gradient-text" : "value-3"
              }
            >
              150 000
            </span>
          </div>
          <div className="scale-bars">
            <div
              className={
                totalAmount >= 50000 ? "bar bar-1 gradient-bar" : "bar bar-1"
              }
            ></div>
            <div
              className={
                totalAmount >= 100000 ? "bar bar-2 gradient-bar" : "bar bar-2"
              }
            ></div>
            <div
              className={
                totalAmount >= 150000 ? "bar bar-3 gradient-bar" : "bar bar-3"
              }
            ></div>
          </div>
        </div>

        <div className="cart-container">
        <div className="cart-iconn" onClick={handleCartClick}>
    <img src={itemsInBasket.length > 0 ? baskcol : bask} alt="Cart" />
    {itemsInBasket.length > 0 && (
      <div className="item-count">{itemsInBasket.length}</div>
    )}
  </div>
        </div>
      </div>

      {isCartOpen && (
        <Cart
          userId={userId}
          onClose={closeCart}
          onUpdateTotal={setTotalAmount}
        />
      )}
      {isPopupOpen && <PopupInfo onClose={closePopup} />}

      <HorizontalScrollComponent />
    </>
  );
});

export default Shop;

import React, { useEffect, useState, useContext } from "react";
import bask from "../img/корзина белая 1.svg";
import baskcol from "../img/Корзина цвет.svg";
import pod from "../img/подарок.svg";
import PopupInfo from "./PopupInfo";
import { getBasket } from "../http/productApi";
import { Context } from "..";
import Cart from "./Cart";
import { observer } from "mobx-react-lite";

const Shkal = observer(({ userId }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [itemsInBasket, setItemsInBasket] = useState([]);
  const { user } = useContext(Context);

  const handleCartClick = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const handleGiftClick = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const getGradient = () => {
    const maxAmount = 150000; // Maximum total amount for 100% gradient fill
    const percentage = Math.min((totalAmount / maxAmount) * 100, 100); // Calculate percentage based on totalAmount

    return `linear-gradient(to right, #4f6423 ${percentage}%, #1A1A1A 100%)`;
  };

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

  useEffect(() => {
    fetchBasket(); // Initial fetch when component mounts

    const interval = setInterval(fetchBasket, 5000); // Fetch every 5 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [userId]);

  return (
    <>
      <div
        className="reward-scale sticky"
        style={{ background: getGradient() }}
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
          onUpdateBasket={setItemsInBasket} // Pass function to update basket items
        />
      )}
      {isPopupOpen && <PopupInfo onClose={closePopup} />}
    </>
  );
});

export default Shkal;

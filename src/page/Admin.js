import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OrderDetailModal from "../componenets/Order"; // Убедитесь, что путь правильный
import { getOrders, updateOrder } from "../http/productApi";
import {
  CREATE_ROUTER,
  USER_ROUTER,
  ADRESS_ROUTER,
  NEWSADD_ROUTER,
  DELIVERYADD_ROUTER,
  GIFT_ROUTER,
  FOOTER_ROUTER,
  MANUFACTURERS_ROUTER,
  PRODUCTADD_ROUTER,
  IMG_ROUTER,
} from "../utils/consts";
import "../style/newss.css";

import ContactInfoManager from "../componenets/FormOne"; // Убедитесь, что путь правильный
import { observer } from "mobx-react-lite";

const Admin = observer(() => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders(); // Изначально загружаем заказы
    const intervalId = setInterval(fetchOrders, 15000); // Обновление каждые 5 секунд

    return () => clearInterval(intervalId); // Очистка интервала при размонтировании компонента
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      const sortedData = data.sort((a, b) => a.id - b.id); // Сортируем заказы по id в порядке возрастания
      setOrders(sortedData);
    } catch (error) {
      console.error("Ошибка при получении заказов", error);
    }
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  const handleOrderUpdate = () => {
    fetchOrders(); // Обновляем заказы после изменения
  };

  const calculateTotal = (order) => {
    let total = order.order_products.reduce((sum, product) => {
      return sum + product.price * product.quantity;
    }, 0);

    // Проверка метода оплаты и корректировка суммы
    if (order.paymentMethod === "Банковский перевод") {
      total *= 1.05; // Умножаем на 5%
    }

    return total.toFixed(0); // Форматируем до двух знаков после запятой
  };

  return (
    <>
      <div className="admin-container" style={{ marginTop: 200 }}>
        <h1>Админка</h1>
        <div className="admin-buttons">
          <Link to={CREATE_ROUTER}>
            <button className="productBuyForm_addInfoButton">
              Создать продукт
            </button>
          </Link>
          <Link to={USER_ROUTER}>
            <button className="productBuyForm_addInfoButton">
              Управление пользователями
            </button>
          </Link>
          <Link to={ADRESS_ROUTER}>
            <button className="productBuyForm_addInfoButton">
              Управление адресами
            </button>
          </Link>
          <Link to={NEWSADD_ROUTER}>
            <button className="productBuyForm_addInfoButton">
              Добавить новость
            </button>
          </Link>
          <Link to={DELIVERYADD_ROUTER}>
            <button className="productBuyForm_addInfoButton">
              Добавить доставку
            </button>
          </Link>
          <Link to={GIFT_ROUTER}>
            <button className="productBuyForm_addInfoButton">
              Добавить подарок
            </button>
          </Link>
          <Link to={FOOTER_ROUTER}>
            <button className="productBuyForm_addInfoButton">
              Настройки футера
            </button>
          </Link>
          <Link to={MANUFACTURERS_ROUTER}>
            <button className="productBuyForm_addInfoButton">
              Управление производителями
            </button>
          </Link>
          <Link to={PRODUCTADD_ROUTER}>
            <button className="productBuyForm_addInfoButton">
              Добавить продукт
            </button>
          </Link>
          <Link to={IMG_ROUTER}>
            <button className="productBuyForm_addInfoButton">
              Картинки на главной
            </button>
          </Link>
        </div>
        <div className="orders-table-container" style={{ marginTop: "20px" }}>
          <h1>Активные заказы</h1>
          <table
            className="orders-table"
            style={{ width: "100%", borderCollapse: "collapse" }}
          >
            <thead>
              <tr>
                <th>ID Заказа</th>
                <th>Имя пользователя</th>
                <th>Email пользователя</th>
                <th>Телефон</th>
                <th>Метод оплаты</th>
                <th>Продукты</th>
                <th>Статус</th>
                <th>Итоговая сумма</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  onClick={() => handleOrderClick(order)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{order.id}</td>
                  <td>{order.user?.name}</td>
                  <td>{order.user?.email}</td>
                  <td>{order.phone}</td>
                  <td>{order.paymentMethod}</td>
                  <td>
                    <ul>
                      {order.order_products.map((product) => (
                        <li key={product.productId}>
                          {product.product?.name || "Product not found"} -{" "}
                          {product.quantity} шт. по {product.price}₽
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>{order.status}</td>
                  <td>{calculateTotal(order)}₽</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {selectedOrder && (
          <OrderDetailModal
            order={selectedOrder}
            onClose={handleCloseModal}
            onUpdate={handleOrderUpdate}
          />
        )}
        <div className="contact-requests" style={{ marginTop: "40px" }}>
          <h1>Заявки на сотрудничество</h1>
          <ContactInfoManager />
        </div>
      </div>
    </>
  );
});

export default Admin;

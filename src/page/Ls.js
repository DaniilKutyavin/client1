import React, { useEffect, useState } from "react";
import "../style/newss.css";
import Store from "../componenets/Store";
import Shkal from "../componenets/Shkal";
import { observer } from "mobx-react-lite";
import { getOrdersByUser } from "../http/productApi";
import { updateUser } from "../http/userApi";
import arrowRight from "../img/стрелка вниз.svg";

const Ls = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [updateStatus, setUpdateStatus] = useState(null);
  const [isOrdersOpen, setIsOrdersOpen] = useState(true);
  const [isAccountInfoOpen, setIsAccountInfoOpen] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await getOrdersByUser();
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Ошибка при загрузке заказов:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await updateUser(
        formData.email,
        formData.password,
        formData.confirmPassword
      );
      setUpdateStatus("Данные успешно обновлены");
      console.log("Update result:", result);
    } catch (error) {
      setUpdateStatus("Ошибка при обновлении данных");
      console.error("Update error:", error);
    }
  };

  return (
    <>
      <div className="header">
        <div className="title-block">
          <h1>Личный кабинет</h1>
          <p className="pod">
            Вы стали нашим клиентом, и отныне мы о Вас заботимся
          </p>
        </div>
      </div>

      {/* Orders Section */}
      <div>
        <div
          className="section-header"
          onClick={() => setIsOrdersOpen(!isOrdersOpen)}
        >
          <h2>Мои Заказы</h2>
          <img
            src={arrowRight}
            alt="Toggle Orders"
            className={`arroww-icon ${isOrdersOpen ? "open" : ""}`}
          />
        </div>
        {isOrdersOpen && (
          <div className="order-table-container">
            {loading ? (
              <p>Загрузка...</p>
            ) : orders.length === 0 ? (
              <p>Вы не сделали ни одного заказа</p>
            ) : (
              <table className="order-table">
                <thead>
                  <tr className="order-table-header">
                    <th>Дата</th>
                    <th>Товары</th>
                    <th>Сумма</th>
                    <th>Адрес</th>
                    <th>Способ оплаты</th>
                    <th>Статус</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => {
                    // Вычисляем сумму заказа и применяем наценку, если метод оплаты — "bank"
                    let totalPrice = order.order_products.reduce(
                      (total, product) =>
                        total + product.price * product.quantity,
                      0
                    );

                    if (order.paymentMethod === "Банковский перевод") {
                      totalPrice *= 1.05; // Умножаем на 5%
                    }

                    return (
                      <tr key={order.id}>
                        <td>
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td>
                          {order.order_products.map((product) => (
                            <div key={product.id}>
                              {product.product.name} (Количество:{" "}
                              {product.quantity})
                            </div>
                          ))}
                        </td>
                        <td>{totalPrice.toFixed(0)} ₽</td>
                        <td>{order.city || "Адрес не указан"}</td>
                        <td>{order.paymentMethod}</td>
                        <td>{order.status}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>

      {/* Account Information Section */}
      <div>
        <div
          className="section-header"
          onClick={() => setIsAccountInfoOpen(!isAccountInfoOpen)}
        >
          <h2>Данные учётной записи</h2>
          <img
            src={arrowRight}
            alt="Toggle Account Info"
            className={`arroww-icon ${isAccountInfoOpen ? "open" : ""}`}
          />
        </div>
        {isAccountInfoOpen && (
          <div className="update-form-container">
            <form className="update-form" onSubmit={handleUpdateSubmit}>
              <label>
                Изменить Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Изменить пароль:
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Подтвердить пароль:
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <button type="submit">Сохранить</button>
            </form>
            {updateStatus && <p>{updateStatus}</p>}
          </div>
        )}
      </div>

      <Store />
      <Shkal />
    </>
  );
};

export default observer(Ls);

import React, { useState } from "react";
import { updateOrder } from "../http/productApi"; // Import the update function

const OrderDetailModal = ({ order, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    id: order.id,
    userId: order.userId,
    phone: order.phone,
    fio: order.fio || '', // Ensure we have fio field
    city: order.city || '', // Ensure we have city field
    email: order.email || '', // Ensure we have email field
    comment: order.comment || '', // Ensure we have comment field
    paymentMethod: order.paymentMethod,
    status: order.status,
    orderProducts: order.order_products.map((product) => ({
      id: product.id, // Ensure we have the id for updating
      productId: product.productId,
      quantity: product.quantity,
      price: product.price,
    })),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...formData.orderProducts];
    updatedProducts[index][field] = value; // Update the correct field
    setFormData({ ...formData, orderProducts: updatedProducts });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ensure the correct data structure is being sent
      const orderData = {
        phone: formData.phone,
        fio: formData.fio,
        city: formData.city,
        email: formData.email,
        comment: formData.comment,
        paymentMethod: formData.paymentMethod,
        status: formData.status,
        orderProducts: formData.orderProducts, // Make sure this matches what the API expects
      };

      await updateOrder(formData.id, orderData);
      onUpdate(); // Refresh the order list in Admin
      onClose(); // Close the modal
    } catch (error) {
      console.error("Ошибка при обновлении заказа", error);
    }
  };

  if (!order) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Редактирование заказа</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Телефон:
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </label>
          <label>
            ФИО:
            <input
              type="text"
              name="fio"
              value={formData.fio}
              onChange={handleChange}
            />
          </label>
          <label>
            Город:
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          <label>
            Комментарий:
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleChange}
            />
          </label>
          <label>
            Метод оплаты:
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
            >
              <option value="Наличными курьеру">Наличными курьеру</option>
              <option value="Банковский перевод">Банковский перевод</option>
            </select>
          </label>
          <label>
            Статус:
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Ожидает подтверждения">Ожидает подтверждения</option>
              <option value="Принят">Принят</option>
              <option value="Отменён">Отменён</option>
            </select>
          </label>
          <h3>Продукты</h3>
          {formData.orderProducts.map((product, index) => (
            <div key={index}>
              <label>
                Продукт ID:
                <input type="text" value={product.productId} readOnly />
              </label>
              <label>
                Количество:
                <input
                  type="number"
                  value={product.quantity}
                  onChange={(e) =>
                    handleProductChange(index, "quantity", e.target.value)
                  }
                />
              </label>
              <label>
                Цена:
                <input
                  type="number"
                  value={product.price}
                  onChange={(e) =>
                    handleProductChange(index, "price", e.target.value)
                  }
                />
              </label>
            </div>
          ))}
          <button type="submit">Сохранить изменения</button>
        </form>
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
};

export default OrderDetailModal;

import React, { useContext, useEffect, useState } from "react";
import Store from "../componenets/Store";
import "../style/Contacts.css";
import Shkal from "../componenets/Shkal";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import {
  getAllinfo,
  getAlluser,
  submitPartnershipForm,
} from "../http/contactApi";

const Contacts = observer(() => {
  const { contact } = useContext(Context);

  // Form state
  const [formData, setFormData] = useState({
    fio: "",
    telephone: "",
    email: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    getAllinfo().then((data) => contact.setInfocon(data));
    getAlluser().then((data) => contact.setUsercon(data));
  }, [contact]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitPartnershipForm(formData);
      setSuccessMessage("Ваш запрос успешно отправлен!");
      setFormData({ fio: "", telephone: "", email: "" }); // Clear form
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <div className="header">
        <div className="title-block">
          <h1>Контакты</h1>
          <p className="pod">На связи 24/7</p>
        </div>
      </div>
      <div className="contacts-container">
        {contact.infocon.map((item) => (
          <div className="contact-block" key={item.id}>
            <h2>{item.name}</h2>
            <div className="contact-details">
              <div>
                <p>
                  <strong>Адрес:</strong>
                </p>
                <p>{item.adress}</p>
              </div>
              <div>
                <p>
                  <strong>Телефон:</strong>
                </p>
                <p>
                  <a href={`tel:+${item.telephone}`} className="color pod">
                    {item.telephone}
                  </a>
                </p>
              </div>
              <div>
                <p>
                  <strong>Почта:</strong>
                </p>
                <p>
                  <a href={`mailto:${item.email}`}>{item.email}</a>
                </p>
              </div>
            </div>
          </div>
        ))}

        <div className="partnership-form">
          <h2>Желаете стать нашим партнером?</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-container">
              <div className="form-fields">
                <div className="form-group">
                  <label htmlFor="fio">Имя Отчество</label>
                  <input
                    type="text"
                    id="fio"
                    value={formData.fio}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="telephone">Телефон</label>
                  <input
                    type="tel"
                    id="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="submit-button">
                Отправить
              </button>
            </div>
            {successMessage && (
              <p className="success-message">{successMessage}</p>
            )}
            <p>Наш менеджер свяжется с Вами в ближайшее время.</p>
          </form>
        </div>
      </div>
      <div className="employee-cards">
        <div className="card-container">
          {contact.usercon.map((user) => (
            <div className="employee-card" key={user.id}>
              <img
                src={process.env.REACT_APP_API_URL + user.img}
                alt="Employee Name"
                className="employee-img"
              />
              <div className="employee-info">
                <h3>{user.name}</h3>
                <p className="pod">{user.post}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Store />
      <Shkal />
    </>
  );
});

export default Contacts;

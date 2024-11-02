// src/components/ContactInfoManager.jsx
import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { getFormOne } from "../http/contactApi";

const ContactInfoManager = observer(() => {
  const { contact } = useContext(Context);

  useEffect(() => {
    getFormOne().then((data) => contact.setInfocon(data));
  }, [contact]);

  return (
    <div className="contact-info-manager">
      <table
        className="contact-info-table"
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>ФИО</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Телефон
            </th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Почта</th>
          </tr>
        </thead>
        <tbody>
          {contact.infocon.map((item, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {item.fio}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <a href={`tel:+${item.telephone}`}>{item.telephone}</a>
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <a href={`mailto:${item.email}`}>{item.email}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default ContactInfoManager;

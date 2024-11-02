import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createContext } from "react";
import UserStore from "./store/UserStore";
import DeliveryStore from "./store/DeliveryStore";
import ContactStore from "./store/ContactStore";
import ProductStore from "./store/productStore";
import NewsStore from "./store/NewsStore";
import GiftStore from "./store/GiftStore";
import FooterStore from "./store/FooterStore";

export const Context = createContext(null);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Context.Provider
    value={{
      user: new UserStore(),
      delivery: new DeliveryStore(),
      contact: new ContactStore(),
      product: new ProductStore(),
      news: new NewsStore(),
      gift: new GiftStore(),
      footer: new FooterStore(),
    }}
  >
    <App />
  </Context.Provider>
);

import { Component } from "react";
import {
  ADMIN_ROUTER,
  SHOP_ROUTER,
  LOGIN_ROUTER,
  REGISTRATION_ROUTER,
  PRODUCT_ROUTER,
  NEWS_ROUTER,
  CONTACTS_ROUTER,
  DELIVERY_ROUTER,
  BUY_ROUTER,
  LS_ROUTER,
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
} from "./utils/consts";
import Admin from "./page/Admin";
import LS from "./page/Ls";
import Shop from "./page/Shop";
import ProductPage from "./page/ProductPage";
import Prod from "./page/Prod";
import Create from "./componenets/ProductBuyForm";
import User from "./componenets/UserForm";
import Buy from "./page/Buy";
import NewsPage from "./page/NewsPage";
import NewsPageOne from "./page/NewsPageOne";
import Delivery from "./page/Delivery";
import Contacts from "./page/Contacts";
import Form from "./page/Form";
import ContactForm from "./componenets/ContactForm";
import NewsForm from "./componenets/NewsForm";
import DeliveryForm from "./componenets/DeliveryForm";
import GiftForm from "./componenets/GiftForm";
import FooterForm from "./componenets/FooterForm";
import ManufacturerForm from "./componenets/ManufacturerForm";
import ProductForm from "./componenets/ProductForm";
import GlavImgManager from "./componenets/GlavImgManager";

export const authRoutes = [
  {
    path: ADMIN_ROUTER,
    Component: Admin,
  },
  {
    path: IMG_ROUTER,
    Component: GlavImgManager,
  },
  {
    path: PRODUCTADD_ROUTER,
    Component: ProductForm,
  },
  {
    path: MANUFACTURERS_ROUTER,
    Component: ManufacturerForm,
  },

  {
    path: FOOTER_ROUTER,
    Component: FooterForm,
  },
  {
    path: GIFT_ROUTER,
    Component: GiftForm,
  },
  {
    path: DELIVERYADD_ROUTER,
    Component: DeliveryForm,
  },

  {
    path: NEWSADD_ROUTER,
    Component: NewsForm,
  },

  {
    path: ADRESS_ROUTER,
    Component: ContactForm,
  },

  {
    path: LS_ROUTER,
    Component: LS,
  },

  {
    path: USER_ROUTER,
    Component: User,
  },

  {
    path: CREATE_ROUTER,
    Component: Create,
  },
];

export const publicRoutes = [
  {
    path: SHOP_ROUTER,
    Component: Shop,
  },
  {
    path: LOGIN_ROUTER,
    Component: Form,
  },
  {
    path: REGISTRATION_ROUTER,
    Component: Form,
  },
  {
    path: PRODUCT_ROUTER + "/:id",
    Component: ProductPage,
  },
  {
    path: PRODUCT_ROUTER + "/type/:id",
    Component: Prod,
  },
  {
    path: NEWS_ROUTER + "/:id",
    Component: NewsPageOne,
  },
  {
    path: NEWS_ROUTER,
    Component: NewsPage,
  },
  {
    path: CONTACTS_ROUTER,
    Component: Contacts,
  },
  {
    path: DELIVERY_ROUTER,
    Component: Delivery,
  },
  {
    path: BUY_ROUTER,
    Component: Buy,
  },
];

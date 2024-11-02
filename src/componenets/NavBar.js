import React, { useContext, useState, useEffect } from "react";
import { Context } from "..";
import "../style/navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  CONTACTS_ROUTER,
  DELIVERY_ROUTER,
  NEWS_ROUTER,
  SHOP_ROUTER,
  LOGIN_ROUTER,
  REGISTRATION_ROUTER,
  PRODUCT_ROUTER,
  LS_ROUTER,
} from "../utils/consts";
import LogoWhite from "../img/Лого белый.svg";
import LogoScrolled from "../img/Лого цветной.svg";
import Ls from "../img/человек 500.svg";
import LsAlt from "../img/человек цвет.svg";
import LoginForm from "../page/Form";
import arrowRight from "../img/стрелка вниз.svg";

const NavBar = () => {
  const { user } = useContext(Context);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);
  const [currentIcon, setCurrentIcon] = useState(Ls);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Установите иконку в зависимости от текущего маршрута
    if (location.pathname === LS_ROUTER) {
      setCurrentIcon(LsAlt);
    } else {
      setCurrentIcon(Ls);
    }
  }, [location.pathname, user.isAuth]);

  const isActive = (path) => location.pathname === path;

  const handleUserIconClick = () => {
    if (user.isAuth) {
      navigate(LS_ROUTER);
    } else {
      setIsLoginFormOpen(true);
    }
  };

  const closeLoginForm = () => {
    setIsLoginFormOpen(false);
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <header className={`navbar ${isScrolled ? "navbar-scrolled" : ""}`}>
        <div className="navbar-content">
          <div className="navbar-logo">
            <Link to={SHOP_ROUTER}>
              <img
                src={
                  location.pathname === "/"
                    ? isScrolled
                      ? LogoScrolled
                      : LogoWhite
                    : LogoScrolled
                }
                alt="Logo"
                style={{ height: "70px", width: "300px" }}
              />
            </Link>
          </div>
          <nav className="navbar-links">
            <div className="catalog-wrapper" onClick={handleDropdownToggle}>
              <a
                href="#catalog"
                className={isActive(PRODUCT_ROUTER) ? "active-link big" : ""}
              >
                Каталог товаров
                <img
                  src={arrowRight}
                  alt="Arrow"
                  className={`accordion-arrow ${isDropdownOpen ? "open" : ""}`}
                />
              </a>
              <div className={`dropdown-menu ${isDropdownOpen ? "" : ""}`}>
                <Link to="/product/type/1">ХСЗР</Link>
                <Link to="/product/type/2">Удобрения</Link>
                <Link to="/product/type/3">Посевной материал</Link>
                <Link to="/buy">Закупка культур</Link>
              </div>
            </div>
            <Link
              to={DELIVERY_ROUTER}
              className={isActive(DELIVERY_ROUTER) ? "active-link big" : "big"}
            >
              Доставка
            </Link>
            <Link
              to={NEWS_ROUTER}
              className={isActive(NEWS_ROUTER) ? "active-link big" : "big"}
            >
              Новости
            </Link>
            <Link
              to={CONTACTS_ROUTER}
              className={isActive(CONTACTS_ROUTER) ? "active-link big" : "big"}
            >
              Контакты
            </Link>
          </nav>
          <div className="navbar-user">
            <img
              src={currentIcon}
              alt="User Icon"
              onClick={handleUserIconClick}
              style={{ height: "40px", cursor: "pointer", margin: "10px" }}
            />
          </div>
        </div>
      </header>
      {isLoginFormOpen && <LoginForm onClose={closeLoginForm} />}
    </>
  );
};

export default NavBar;

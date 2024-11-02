import React, { useRef, useEffect } from "react";
import "../style/HorizontalScrollComponent.css";
import circle1 from "../img/кольцо1.svg";
import circle2 from "../img/кольцо2.svg";
import circle3 from "../img/кольцо3.svg";
import circle4 from "../img/Кольцо4.svg";

const HorizontalScrollComponent = () => {
  const scrollRef = useRef(null);

  const handleWheel = (event) => {
    const scrollElement = scrollRef.current;
  
    if (scrollElement) {
      const atLeft = scrollElement.scrollLeft === 0;
      const atRight = scrollElement.scrollLeft + scrollElement.clientWidth >= scrollElement.scrollWidth;
  
      if (event.deltaY > 0 && atRight) {
        return;
      } else if (event.deltaY < 0 && atLeft) {
        return;
      }
  
      event.preventDefault();
      
      // Увеличиваем скорость прокрутки, умножая deltaY на коэффициент
      const scrollSpeedFactor = 2; // Измените это значение для увеличения или уменьшения скорости
      scrollElement.scrollLeft += event.deltaY * scrollSpeedFactor;
    }
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    scrollElement.addEventListener("wheel", handleWheel);
    
    return () => {
      scrollElement.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div className="horizontal-scroll-container" ref={scrollRef}>
      <div className="scroll-content">
        <div className="item">
          <img src={circle1} alt="Cart" />
          <div className="text-content">
            <h3>Позитивных отзывов</h3>
            <p>Нас любят, к нам возвращаются.</p>
            <h4>О Нас</h4>
            <p>
              Компания "ASATRIAN TRADING GROUP" предлагает
              фермерским хозяйствам и крупным
              агропредприятиям Запорожской области
              широкий ассортимент сертифицированных средств защиты растений (СЗР),
              удобрений и посевного материала от
              ведущих производителей. Мы являемся
              официальным дилером торговой марки "Август", что гарантирует качество и
              эффективность нашей продукции.Предоставляем полный пакет документов всей продукции на сайте.
            </p>
          </div>
        </div>

        <div className="item">
          <img src={circle2} alt="Cart" />
          <div className="text-content">
          <h3> Довольных клиентов</h3>
            <p>Более 1500 довольных клиентов нашим сервисом</p>
            <h4>Наша миссия</h4>
            <p>
            Создать удобную и надежную 

платформу для сельхозпроизводителей, 

где каждый сможет найти все 

необходимое для успешного ведения 

агробизнеса. Мы понимаем важность 

своевременной и правильной защиты 

урожая, поэтому предлагаем только 

проверенные

товары высокого качества.
            </p>
          </div>
        </div>

        <div className="item">
          <img src={circle3} alt="Cart" />
          <div className="text-content">
            <h3> 95% Повторных покупок</h3>
            <p>Клиент ценит скорость, комфорт и отсутствие стресса которые мы ему предоставляем!</p>
            <h4>Почему выбирают нас:</h4>
            <p>
            Качество и надежность: сертифицированные товары от проверенных производителей.

 Профессиональная поддержка: наши специалисты всегда готовы предоставить 

консультации по выбору и применению препаратов.

 Комфорт: доставка по всей Запорожской и Херсонской областях что позволяет вам получать необходимые товары прямо до двери вашего хозяйства.

Мы стремимся к тому, чтобы ваши посевы были здоровыми, а урожай - богатым. 

Доверьтесь нашему опыту и профессионализму, и вы получите гарантированный результат. 

Оформите заказ прямо сейчас , вместе мы сделаем ваш агробизнес успешным и прибыльным!
            </p>
          </div>
        </div>

        <div className="item">
          <img src={circle4} alt="Cart" />
          <div className="text-content">
            <h3>10000 выполненных заказов</h3>
            <p>Уже более 10000 заказов доставлено к нашим клиентам.</p>
            <h4>Что мы предлагаем:</h4>
            <p>
            СЗР (средства защиты растений): широкий выбор гербицидов, фунгицидов и инсектицидов для защиты ваших культур.

Удобрения: минеральные и органические удобрения для 

повышения урожайности и улучшения качества почвы.

Посевной материал: высококачественные семена различных культур.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalScrollComponent;

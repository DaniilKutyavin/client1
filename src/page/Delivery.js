import React, { useContext, useEffect } from 'react';
import '../style/delivery.css';
import Store from '../componenets/Store';
import mapImage from '../img/карта.svg';
import iconSite from '../img/компьютер.svg';
import iconTelegram from '../img/чат.svg';
import iconPhone from '../img/по телефону.svg';  
import iconApp from '../img/в приложении.svg';
import icon1 from '../img/icon1.svg';
import icon2 from '../img/icon2.svg';
import icon3 from '../img/icon3.svg';
import iconBank from '../img/банковский перевод.svg';
import iconCash from '../img/наличными.svg';  
import iconCard from '../img/картой.svg';
import iconKur from '../img/курьером.svg';
import iconPoch from '../img/почтой.svg';  
import iconPred from '../img/предзаказ.svg';
import Shkal from '../componenets/Shkal';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import {getAll} from '../http/deliveryApi'

const Delivery = observer( ()=> {
  const {delivery} = useContext(Context)

  useEffect ( ()=> {
    getAll().then(data => delivery.setInfo(data))
  }, []) 

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      const selectedText = selection.toString();

      if (selectedText.length > 0) {
        document.querySelectorAll('.pod').forEach(el => {
          el.style.background = '';  // Убрать градиентный фон при выделении
          el.style.color = '#c5ff56';  // Изменить цвет выделенного текста
        });
      } else {
        document.querySelectorAll('.pod').forEach(el => {
          el.style.background = 'linear-gradient(90deg, #ABF538, #FED919)';
          el.style.webkitBackgroundClip = 'text';
          el.style.webkitTextFillColor = 'transparent';
        });
      }
    };

    document.addEventListener('selectionchange', handleSelectionChange);

    // Удаление обработчика при размонтировании компонента
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, []);

  const item = delivery.info[0];
  return (
    <>
    <div className="header">
    <div className="title-block">
    <h1>Доставка</h1>
    <p className="pod">Вы можете получить доставку в течение 3х дней или оформить заказ заранее на желаемую дату!</p>
    </div>
  </div>
  <div className="delivery-container">
        <div className="text-section">      
          <h2>{item?.title}</h2>
          <h3>{item?.title_small}</h3>
          <p>{item?.description_one}</p>
          <p>{item?.description_two}</p>
          <p>Рабочее время: <span className='working-hours'>с {item?.time_start} до {item?.time_end}</span></p>
        </div>

        <div className="map-section">
          <img src={mapImage} alt="Карта России" />
        </div>
      </div>
      
      <div className="container">
        <div className="block">
          <div className="con">
            <div className="left-half">
              <div className="top-block"><h2>Как сделать заказ?</h2> <p>Выберете самы удобный способ для Вас
              </p></div>
              <div className="bottom-block"><img src={icon1}/></div>
            </div>
            <div className="right-half">
              <div className="window-block"><img src={iconSite}/>На сайте</div>
              <div className="window-block"><img src={iconTelegram}/>В telegram чате</div>
              <div className="window-block">
  <img src={iconPhone} alt="Phone Icon" />
  <div >
    По телефону
    <p className="pod">{item?.telephone}</p>
  </div>
</div>

              <div className="window-block"><img src={iconApp}/>В мобильном приложении</div>
            </div>
          </div>
        </div>
        <div className="block">
          <div className="con">
            <div className="left-half">
              <div className="top-block"><h2>Оплата</h2> <p>Убедитесь что стоимость вашего заказа состовляет не ниже 35000 рублей.</p></div>
              <div className="bottom-block"><img src={icon3}/></div>
            </div>
            <div className="right-half">
              <div className="window-block"><img src={iconCash}/>Наличыми</div>
              <div className="window-block"><img src={iconCard}/>Оплата картой</div>
              <div className="window-block"><img src={iconBank}/>Безналичный расчет</div>
              <div className="window-block"></div>
            </div>
          </div>
        </div>
        <div className="block">
          <div className="con">
            <div className="left-half">
              <div className="top-block"><h2>Как получить заказ?</h2> <p>Среднее время доставки составляет 3 дня
              </p></div>
              <div className="bottom-block pravo"><img src={icon2}/></div>
            </div>
            <div className="right-half">
              <div className="window-block"><img src={iconKur}/><div >
    Курьером
    <p className="pod">Прямо на ваше предприятие</p>
  </div></div>
              <div className="window-block"><img src={iconPoch}/><div >
    Доставка почта
    <p className="pod">Доставка по всей России</p>
  </div></div>
              <div className="window-block"><img src={iconPred}/><div >
    Предзаказ на назначеную дату
    <p className="pod">Закажи наперед чтобы не забыть </p>
  </div></div>
              <div className="window-block"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="disclaimer-container">
  <div className="disclaimer-header">
    <h2>Условия доставки</h2>
  </div>
  <div className="disclaimer-body">
    <p><strong>При условии наличия товара на складе</strong> - отправка осуществляется в день заказа.</p>
    <p><strong>При условии покупки товара под заказ</strong> - сроки ожидания отправки заказа в пределах 2-7 дней.</p>
    <p><strong>При условии срочности заказа</strong> - возможно рассмотрение отправки заявки в индивидуальном порядке.</p>
    <p>Оплата за доставку не входит в стоимость товара и рассчитывается дополнительно. Доставку оплачивает заказчик. Сумма доставки рассчитывается при оформлении заказа.</p>
    <p>Действующие тарифы, списки городов, сроки доставки уточняйте на сайте перевозчика, либо у операторов нашего интернет-магазина asatag.com.</p>
    <p>Все товары, представленные на нашем сайте, являются оригинальными, поставляются исключительно в заводской упаковке компании-производителя и имеют соответствующие сертификаты и/или декларации о соответствии.</p>
    
    <div className="disclaimer-header">
    <h2>Оплата</h2>
  </div>
    <p>Для юридических лиц оплата осуществляется по безналичному расчету при условии 100% предоплаты. Счет на оплату формируется на основании Заявки и полученной информации о Покупателе (реквизиты организации, контактные данные).</p>
    <p>При долгосрочном сотрудничестве возможно заключение договора поставки.</p>
    <p>Необходимые реквизиты для выставления счета и заключения договора поставки для юридических лиц:</p>
    <ul>
      <li>Наименование организации и форма собственности</li>
      <li>ИНН/КПП</li>
      <li>Юридический/фактический адрес</li>
      <li>№ р/с, банковские реквизиты</li>
    </ul> 
    <p>Оплату следует осуществлять только после согласования деталей заказа с нашими операторами. При оформлении заказа товар резервируется на срок не более 3-х календарных дней с момента подачи заявки, в противном случае наличие товара на складе не гарантируется. При условии отсутствия оплаты в указанный срок товар снимается с резерва.</p>
    <div className="disclaimer-header">
    <h2>Ограничение гарантий и ответственности</h2>
  </div>
    <p>Интернет-магазин «asatrian trading group» не несет ответственности за задержку доставки заказов по вине почты, а также за сохранность посылки во время транспортировки.</p>
    <p>Семена, удобрения, средства защиты растений и другие товары надлежащего качества не подлежат возврату или обмену согласно постановлению Правительства Российской Федерации №55 от 20.10.1998 «Перечень непродовольственных товаров надлежащего качества, не подлежащих возврату или обмену на аналогичный товар других размера, формы, габарита, фасона, расцветки или комплектации».</p>
    <p>Все претензии принимаются в течение 14 (четырнадцати) дней с момента получения заказа.</p>
    <p>Компания «ASATAG» не берет на себя ответственности за риски, связанные с погодными условиями, состоянием почвы, выходом за пределы участка использования. Такие риски могут привести к неэффективности продукта.</p>
    
    <div className="disclaimer-header">
    <h2>Контакты</h2>
  </div>
    <p>Если у вас есть претензии по качеству и количеству товаров, предложения или замечания по улучшению нашей работы, просим написать нам на нашу почту asatag@asatag.com.</p>
  </div>
</div>
      <Store />
      <Shkal/>
    </>
  ); 
});

export default Delivery;

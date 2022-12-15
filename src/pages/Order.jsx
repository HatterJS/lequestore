import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../redux/slices/cartSlice';
import Empty from '../components/Empty';
import AddedItem from '../components/AddedItem';

function Order() {
  //dispatch for redux
  const dispatch = useDispatch();
  //get cart items from redux
  const { cart } = useSelector((state) => state.cart);

  const totalCost =
    cart &&
    cart
      .map((obj) => obj.cost * obj.amount)
      .reduce(function (sum, elem) {
        return sum + elem;
      }, 0);

  const [orderData, setOrderData] = React.useState({
    surname: '',
    name: '',
    phoneNumber: '',
    deliveryType: '',
    town: '',
    department: '',
    address: '',
    paymentType: '',
    discontCode: '',
    message: ''
  });

  //Начало блока отправки информации в Telegram канал
  const messageToTelegram =
    `<b>НОВЕ ЗАМОВЛЕННЯ!</b>\n` +
    `<b>_______________________________</b>\n` +
    cart.map(
      (obj) =>
        `<b>Назва товару: </b>${obj.name} <b>x ${obj.amount}</b>\n` +
        `<b>Розмір: </b>${obj.size} \n` +
        `<b>Ціна: </b>${obj.cost} грн.\n` +
        `\n`
    ) +
    `<b>Загальна сума: </b>${totalCost} грн.\n` +
    `<b>_______________________________</b>\n` +
    `\n` +
    `<b>ПІБ: </b>${orderData.surname} ${orderData.name}\n` +
    `<b>Телефон: </b>${orderData.phoneNumber}\n` +
    `<b>Спосіб доставки: </b>${orderData.deliveryType}\n` +
    `<b>Адреса: </b>м.${orderData.town}, ${
      orderData.deliveryType === 'НОВА ПОШТА (до відділення)'
        ? '<b>№ </b>' + orderData.department
        : orderData.address
    }\n` +
    `<b>Спосіб оплати: </b>${orderData.paymentType}\n` +
    (orderData.discontCode && `<b>Дисконт: </b>${orderData.discontCode}\n`) +
    (orderData.message && `<b>Повідомлення: </b>${orderData.message}\n`);

  const token = '5668730868:AAFhDF_gIJiwC_yLdidxA5FN8YfGsUbq1nE';
  const chatId = '-1001657685862';
  const URI_API = `https://api.telegram.org/bot${token}/sendMessage`;

  async function acceptOrder() {
    try {
      await axios.post(URI_API, {
        chat_id: chatId,
        parse_mode: 'html',
        text: messageToTelegram
      });
    } catch (error) {
      alert('Помилочка! Перезавантажте сторінку.');
    }
    setOrderData({
      surname: '',
      name: '',
      phoneNumber: '',
      deliveryType: '',
      town: '',
      department: '',
      address: '',
      paymentType: '',
      discontCode: '',
      message: ''
    });
    dispatch(clearCart());
  }
  //Конец блока отправки информации в Telegram канал

  return (
    <div className="orderContent">
      <div className="orderContent__title">
        <h1>ОФОРМЛЕННЯ ЗАМОВЛЕННЯ</h1>
        <p>На всі замовлення потрібна часткова передоплата в розмірі 100 грн.</p>
      </div>
      <div className="orderContent__content">
        <div className="orderContent__deliveryForm">
          <h5>ПІБ *</h5>
          <div className="orderContent__nameBlock">
            <input
              className="orderContent__surname"
              type="text"
              placeholder="Прізвище"
              onChange={(event) => setOrderData({ ...orderData, surname: event.target.value })}
              style={!orderData.surname ? { borderColor: '#FF824C' } : { borderColor: '' }}
              value={orderData.surname}
            />
            <input
              className="orderContent__name"
              type="text"
              placeholder="Ім'я"
              onChange={(event) => setOrderData({ ...orderData, name: event.target.value })}
              style={!orderData.name ? { borderColor: '#FF824C' } : { borderColor: '' }}
              value={orderData.name}
            />
          </div>
          <h5>Телефон (по можливості з Telegram) *</h5>
          <div className="orderContent__phoneBlock">
            <input
              className="orderContent__phone"
              type="tel"
              placeholder="+38(xxx)xxx-xx-xx"
              onChange={(event) => setOrderData({ ...orderData, phoneNumber: event.target.value })}
              style={
                orderData.phoneNumber.length < 10 ? { borderColor: '#FF824C' } : { borderColor: '' }
              }
              maxLength={20}
              value={orderData.phoneNumber}
            />
          </div>
          <h5>Спосіб доставки *</h5>
          <div className="orderContent__deliveryBlock">
            <select
              name="orderContent__deliveryType"
              onChange={(event) =>
                setOrderData({
                  ...orderData,
                  deliveryType: event.target.options[event.target.selectedIndex].text
                })
              }
              style={!orderData.deliveryType ? { borderColor: '#FF824C' } : { borderColor: '' }}>
              <option value="1"></option>
              <option value="2">НОВА ПОШТА (до відділення)</option>
              <option value="3">НОВА ПОШТА (адресна доставка)</option>
            </select>
            {orderData.deliveryType && (
              <div className="orderContent__deliveryAddress">
                <div className="orderContent__townBlock">
                  {/* <h5>Місто</h5> */}
                  <input
                    className="orderContent__town"
                    type="text"
                    placeholder="Місто"
                    onChange={(event) => setOrderData({ ...orderData, town: event.target.value })}
                    style={!orderData.town ? { borderColor: '#FF824C' } : { borderColor: '' }}
                    value={orderData.town}
                  />
                </div>
                {orderData.deliveryType === 'НОВА ПОШТА (до відділення)' && (
                  <div className="orderContent__departmentBlock">
                    {/* <h5>Відділення</h5> */}
                    <input
                      className="orderContent__department"
                      type="text"
                      placeholder="Відділення"
                      onChange={(event) =>
                        setOrderData({ ...orderData, department: event.target.value })
                      }
                      style={
                        !orderData.department ? { borderColor: '#FF824C' } : { borderColor: '' }
                      }
                      value={orderData.department}
                    />
                  </div>
                )}
                {orderData.deliveryType === 'НОВА ПОШТА (адресна доставка)' && (
                  <div className="orderContent__addressBlock">
                    {/* <h5>Відділення</h5> */}
                    <input
                      className="orderContent__address"
                      type="text"
                      placeholder="Адреса: вул., буд., кв."
                      onChange={(event) =>
                        setOrderData({ ...orderData, address: event.target.value })
                      }
                      style={!orderData.address ? { borderColor: '#FF824C' } : { borderColor: '' }}
                      value={orderData.address}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
          <h5>Спосіб оплати *</h5>
          <div className="orderContent__paymentBlock">
            <select
              className="orderContent__paymentType"
              onChange={(event) =>
                setOrderData({
                  ...orderData,
                  paymentType: event.target.options[event.target.selectedIndex].text
                })
              }
              style={!orderData.paymentType ? { borderColor: '#FF824C' } : { borderColor: '' }}>
              <option value="1"></option>
              <option value="2">Оплата при отриманні</option>
              <option value="3">Оплата на картку PrivatBank</option>
              <option value="4">Оплата на картку Mono</option>
            </select>
          </div>
          <h5>Код на знижку</h5>
          <div className="orderContent__discontBlock">
            <input
              className="orderContent__discontCode"
              type="text"
              placeholder="Вкажіть код знижки"
              onChange={(event) => setOrderData({ ...orderData, discontCode: event.target.value })}
              value={orderData.discontCode}
            />
          </div>
          <h5>Примітка до замовлення</h5>
          <div className="orderContent__noteBlock">
            <textarea
              placeholder="Вкажіть додаткові побажання щодо замовлення"
              maxLength={300}
              rows={4}
              onChange={(event) => setOrderData({ ...orderData, message: event.target.value })}
              value={orderData.message}></textarea>
          </div>
          <button
            className="acceptButton"
            disabled={
              cart.length &&
              orderData.surname &&
              orderData.name &&
              orderData.phoneNumber.length > 9 &&
              orderData.deliveryType &&
              orderData.paymentType
                ? false
                : true
            }
            onClick={acceptOrder}>
            {cart.length
              ? orderData.surname &&
                orderData.name &&
                orderData.phoneNumber.length > 9 &&
                orderData.deliveryType &&
                orderData.paymentType
                ? 'Підтвердити замовлення'
                : 'Вкажіть дані для відправки'
              : 'Відсутні товари'}
          </button>
        </div>
        <div className="orderContent__goods">
          <h4>АКТИВНІ ЗАМОВЛЕННЯ</h4>
          <div className="orderContent__itemsBlock quickCart__itemsBlock">
            {cart.map((obj) => (
              <AddedItem key={obj.id} {...obj} />
            ))}
          </div>
          <div
            className="orderContent__emptyOrder emptyCart"
            style={{ display: cart.length ? 'none' : 'flex' }}>
            <Empty></Empty>
          </div>
          <div
            className="orderContent__total quickCart__total"
            style={{ display: cart.length ? 'flex' : 'none' }}>
            <p>Всього:</p>
            <p>{totalCost} грн.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;

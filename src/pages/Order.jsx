import React from "react";
import axios from "axios";
import Empty from "../components/Empty";
import AddedItem from "../components/AddedItem";

function Order (props) {
    const [addedItems, setAddedItems] = React.useState([]); //отображение товаров добавленных в корзину
    const [surname, setSurname] = React.useState("");
    const [name, setName] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [deliveryType, setDeliveryType] = React.useState("Нова пошта (до відділення)");
    const [paymentType, setPaymentType] = React.useState("Оплата при отриманні");
    const [message, setMessage] = React.useState("");
  
    const deleteFromCart = (obj) => { //удаление товаров из корзины
      axios.delete(`https://632db5102cfd5ccc2af512de.mockapi.io/cartItems/${obj.id}`); //удаление с бека
      setAddedItems((prev) => prev.filter(item => item.id !== obj.id)); //удаление из корзины
      props.setItemsCartCounter(prev => prev - 1); //уменьшение счетчика корзины
      props.totalCostMinus((prev => prev - (obj.cost * obj.amount))); //уменьшение суммы заказа
    }

    const [isLoad, setIsLoad] = React.useState(false);
    React.useEffect(() => { //необходимо для того, чтобы подгрузка с бекэнда происходила только 1 раз при загрузке страницы
        async function getData () {
          try {
            await axios.get('https://632db5102cfd5ccc2af512de.mockapi.io/cartItems')
                .then(res => setAddedItems(res.data)); //подгрузка с бекэнда товаров добавленных в корзину
          } catch (error) {
            alert('Помилочка! Перезавантажте сторінку.');
          }
          setIsLoad(true);
        }
        getData ();
    }, []);

    //Начало блока отправки информации в Telegram канал
    const messageToTelegram = 
        `<b>НОВЕ ЗАМОВЛЕННЯ!</b>\n` +
        `<b>_______________________________</b>\n` +
        addedItems.map((obj) => (
            `<b>Назва товару: </b>${obj.name}\n` +
            `<b>Ціна: </b>${obj.cost} грн.\n` +
            `\n`
        )) +
        `<b>Загальна сума: </b>${props.totalCost} грн.\n` +
        `<b>_______________________________</b>\n` +
        `\n` +
        `<b>ПІБ: </b>${surname} ${name}\n` +
        `<b>Телефон: </b>${phoneNumber}\n` +
        `<b>Спосіб доставки: </b>${deliveryType}\n` +
        `<b>Спосіб оплати: </b>${paymentType}\n` +
        `<b>Повідомлення: </b>${message}\n`;

    const token = '5668730868:AAFhDF_gIJiwC_yLdidxA5FN8YfGsUbq1nE';
    const chatId = '-1001657685862';
    const URI_API = `https://api.telegram.org/bot${ token }/sendMessage`;

    function sendToTelegram() {
        axios.post(URI_API, {
            chat_id: chatId,
            parse_mode: 'html',
            text: messageToTelegram
        });
    }
    //Конец блока отправки информации в Telegram канал

    return (
        <div className="orderContent">
            <div className="orderContent__title">
                <h2>ОФОРМЛЕННЯ ЗАМОВЛЕННЯ</h2>
                <p>На всі замовлення потрібна часткова передоплата в розмірі 100 грн.</p>
            </div>
            <div className="orderContent__content">
                <div className="orderContent__deliveryForm">
                    <h5>ПІБ *</h5>
                    <div className="orderContent__nameBlock">
                        <input className="orderContent__surname" type="text" placeholder="Прізвище" onChange={event => setSurname(event.target.value)} style={!surname ? {borderColor: '#FF824C'} : {borderColor: ''}}/>
                        <input className="orderContent__name" type="text" placeholder="Ім'я" onChange={event => setName(event.target.value)} style={!name ? {borderColor: '#FF824C'} : {borderColor: ''}}/>
                    </div>
                    <h5>Телефон (по можливості з Telegram) *</h5>
                    <div className="orderContent__phoneBlock">
                        <input className="orderContent__phone" type="tel" placeholder="+38(xxx)xxx-xx-xx" onChange={event => setPhoneNumber(event.target.value)} style={phoneNumber.length<10 ? {borderColor: '#FF824C'} : {borderColor: ''}} maxLength={20}/>
                    </div>
                    <h5>Ваш instagram для зручності</h5>
                    <div className="orderContent__instagramBlock">
                        <input className="orderContent__instagram" type="text" placeholder="посилання на профіль"/>
                    </div>
                    <h5>Спосіб доставки *</h5>
                    <div className="orderContent__deliveryBlock">
                        <select name="orderContent__deliveryType" onChange={event => setDeliveryType(event.target.options[event.target.selectedIndex].text)}>
                            <option value="1">НОВА ПОШТА (до відділення)</option>
                            <option value="2">НОВА ПОШТА (адресна доставка)</option>
                        </select>
                    </div>
                    <h5>Спосіб оплати *</h5>
                    <div className="orderContent__paymentBlock">
                        <select className="orderContent__paymentType" onChange={event => setPaymentType(event.target.options[event.target.selectedIndex].text)}>
                            <option value="1">Оплата при отриманні</option>
                            <option value="2">Оплата на картку mono</option>
                            <option value="2">Оплата на картку mono</option>
                        </select>
                    </div>
                    <h5>Код на знижку</h5>
                    <div className="orderContent__discontBlock">
                        <input className="orderContent__discontCode" type="text" placeholder="Вкажіть код знижки"/>
                    </div>
                    <h5>Примітка до замовлення</h5>
                    <div className="orderContent__noteBlock" onChange={event => setMessage(event.target.value)}>
                        <textarea placeholder="Вкажіть додаткові побажання щодо замовлення" maxLength={300} rows={8}></textarea>
                    </div>
                    <button className="acceptButton" disabled = {addedItems.length&&surname&&name&&phoneNumber ? false : true} onClick = {sendToTelegram}>{addedItems.length ? (surname&&name&&phoneNumber ? 'Підтвердити замовлення' : 'Вкажіть дані для відправки') : 'Відсутні товари'}</button>
                </div>
                <div className="orderContent__goods">
                    <h4>АКТИВНІ ЗАМОВЛЕННЯ</h4>
                    {isLoad ?
                        <>
                            <div className="orderContent__itemsBlock quickCart__itemsBlock">
                                {addedItems.map((obj) => <AddedItem  key = {obj.id}
                                        id = {obj.id}
                                        goodsImage = {obj.goodsImage}
                                        name = {obj.name}
                                        cost = {obj.cost}
                                        amount = {obj.amount}
                                        deleteFromCart = {() => deleteFromCart(obj)}
                                    />)
                                }
                            </div>
                            <div className="orderContent__emptyOrder emptyCart" style = {{display: addedItems.length ? 'none' : 'flex'}}>
                                <Empty></Empty>
                            </div>
                            <div className='orderContent__total quickCart__total' style = {{display: addedItems.length ? 'flex' : 'none'}}>
                                <p>Всього:</p>
                                <p>{props.totalCost} грн.</p>
                            </div>
                        </> : 
                        <div className="loader02">
                            <div className="border02">
                                <div className="shapeEye01"></div>
                                <div className="shapeEye02"></div>
                            </div>
                            <p>loading...</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Order;
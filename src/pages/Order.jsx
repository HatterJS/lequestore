import React from "react";
import axios from "axios";
import Empty from "../components/Empty";
import AddedItem from "../components/AddedItem";

function Order (props) {

    const totalCost = props.cartItems && props.cartItems.map(obj => obj.cost*obj.amount).reduce(function (sum, elem) {return sum + elem;}, 0);
    
    const [surname, setSurname] = React.useState("");
    const [name, setName] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [deliveryType, setDeliveryType] = React.useState("");
    const [town, setTown] = React.useState("");
    const [department, setDepartment] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [paymentType, setPaymentType] = React.useState("");
    const [discontCode, setDiscontCode] = React.useState("");
    const [message, setMessage] = React.useState("");

    function deleteFromCart(id, size) {
      props.setCartItems(JSON.parse(localStorage.getItem('cart')).filter(obj => obj.id!==id||obj.size!==size));
    }

    //Начало блока отправки информации в Telegram канал
    const messageToTelegram = 
        `<b>НОВЕ ЗАМОВЛЕННЯ!</b>\n` +
        `<b>_______________________________</b>\n` +
        props.cartItems.map((obj) => (
            `<b>Назва товару: </b>${obj.name} <b>x ${obj.amount}</b>\n` +
            `<b>Розмір: </b>${obj.size} \n` +
            `<b>Ціна: </b>${obj.cost} грн.\n` +
            `\n`
        )) +
        `<b>Загальна сума: </b>${totalCost} грн.\n` +
        `<b>_______________________________</b>\n` +
        `\n` +
        `<b>ПІБ: </b>${surname} ${name}\n` +
        `<b>Телефон: </b>${phoneNumber}\n` +
        `<b>Спосіб доставки: </b>${deliveryType}\n` +
        `<b>Адреса: </b>м.${town}, ${deliveryType === "НОВА ПОШТА (до відділення)" ? "<b>№ </b>" + department : address}\n` +
        `<b>Спосіб оплати: </b>${paymentType}\n` +
        (discontCode && `<b>Дисконт: </b>${discontCode}\n`) +
        (message && `<b>Повідомлення: </b>${message}\n`);

    const token = '5668730868:AAFhDF_gIJiwC_yLdidxA5FN8YfGsUbq1nE';
    const chatId = '-1001657685862';
    const URI_API = `https://api.telegram.org/bot${ token }/sendMessage`;

    async function acceptOrder() {
        try {
            await axios.post(URI_API, {
                chat_id: chatId,
                parse_mode: 'html',
                text: messageToTelegram
            });
        } catch(error) {
            alert('Помилочка! Перезавантажте сторінку.');
        }        
        setSurname("");
        setName("");
        setPhoneNumber("");
        setTown("");
        setDepartment("");
        setAddress("");
        setDiscontCode("");
        props.setCartItems([]);
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
                        <input className="orderContent__surname" type="text" placeholder="Прізвище" onChange={event => setSurname(event.target.value)} style={!surname ? {borderColor: '#FF824C'} : {borderColor: ''}} value={surname}/>
                        <input className="orderContent__name" type="text" placeholder="Ім'я" onChange={event => setName(event.target.value)} style={!name ? {borderColor: '#FF824C'} : {borderColor: ''}} value={name}/>
                    </div>
                    <h5>Телефон (по можливості з Telegram) *</h5>
                    <div className="orderContent__phoneBlock">
                        <input className="orderContent__phone" type="tel" placeholder="+38(xxx)xxx-xx-xx" onChange={event => setPhoneNumber(event.target.value)} style={phoneNumber.length<10 ? {borderColor: '#FF824C'} : {borderColor: ''}} maxLength={20} value={phoneNumber}/>
                    </div>
                    <h5>Спосіб доставки *</h5>
                    <div className="orderContent__deliveryBlock">
                        <select name="orderContent__deliveryType" onChange={event => setDeliveryType(event.target.options[event.target.selectedIndex].text)} style={!deliveryType ? {borderColor: '#FF824C'} : {borderColor: ''}}>
                            <option value="1"></option>
                            <option value="2">НОВА ПОШТА (до відділення)</option>
                            <option value="3">НОВА ПОШТА (адресна доставка)</option>
                        </select>
                        {deliveryType && <div className="orderContent__deliveryAddress">
                            <div className="orderContent__townBlock">
                                {/* <h5>Місто</h5> */}
                                <input className="orderContent__town" type="text" placeholder="Місто" onChange={event => setTown(event.target.value)} style={!town ? {borderColor: '#FF824C'} : {borderColor: ''}} value={town}/>
                            </div>
                            {deliveryType === "НОВА ПОШТА (до відділення)" && <div className="orderContent__departmentBlock">
                                {/* <h5>Відділення</h5> */}
                                <input className="orderContent__department" type="text" placeholder="Відділення" onChange={event => setDepartment(event.target.value)} style={!department ? {borderColor: '#FF824C'} : {borderColor: ''}} value={department}/>
                            </div>}
                            {deliveryType === "НОВА ПОШТА (адресна доставка)" && <div className="orderContent__addressBlock">
                                {/* <h5>Відділення</h5> */}
                                <input className="orderContent__address" type="text" placeholder="Адреса: вул., буд., кв." onChange={event => setAddress(event.target.value)} style={!address ? {borderColor: '#FF824C'} : {borderColor: ''}} value={address}/>
                            </div>}
                        </div>}
                    </div>
                    <h5>Спосіб оплати *</h5>
                    <div className="orderContent__paymentBlock">
                        <select className="orderContent__paymentType" onChange={event => setPaymentType(event.target.options[event.target.selectedIndex].text)} style={!paymentType ? {borderColor: '#FF824C'} : {borderColor: ''}}>
                            <option value="1"></option>
                            <option value="2">Оплата при отриманні</option>
                            <option value="3">Оплата на картку PrivatBank</option>
                            <option value="4">Оплата на картку Mono</option>
                        </select>
                    </div>
                    <h5>Код на знижку</h5>
                    <div className="orderContent__discontBlock">
                        <input className="orderContent__discontCode" type="text" placeholder="Вкажіть код знижки" onChange={event => setDiscontCode(event.target.value)}  value={discontCode}/>
                    </div>
                    <h5>Примітка до замовлення</h5>
                    <div className="orderContent__noteBlock" onChange={event => setMessage(event.target.value)}>
                        <textarea placeholder="Вкажіть додаткові побажання щодо замовлення" maxLength={300} rows={4}></textarea>
                    </div>
                    <button className="acceptButton" disabled = {props.cartItems.length&&surname&&name&&(phoneNumber.length > 9)&&deliveryType&&paymentType ? false : true} onClick = {acceptOrder}>{props.cartItems.length ? (surname&&name&&(phoneNumber.length > 9)&&deliveryType&&paymentType ? 'Підтвердити замовлення' : 'Вкажіть дані для відправки') : 'Відсутні товари'}</button>
                </div>
                <div className="orderContent__goods">
                    <h4>АКТИВНІ ЗАМОВЛЕННЯ</h4>
                    <div className="orderContent__itemsBlock quickCart__itemsBlock">
                        {props.cartItems.map((obj) => <AddedItem
                                key = {obj.id}
                                id = {obj.id}
                                name = {obj.name}
                                cost = {obj.cost}
                                goodsImage = {obj.goodsImage}
                                size = {obj.size}
                                amount = {obj.amount}
                                deleteItem = {() => deleteFromCart(obj.id, obj.size)}
                                cartItems = {props.cartItems}
                                setCartItems = {props.setCartItems}
                            />)
                        }
                    </div>
                    <div className="orderContent__emptyOrder emptyCart" style = {{display: props.cartItems.length ? 'none' : 'flex'}}>
                        <Empty></Empty>
                    </div>
                    <div className='orderContent__total quickCart__total' style = {{display: props.cartItems.length ? 'flex' : 'none'}}>
                        <p>Всього:</p>
                        <p>{totalCost} грн.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Order;
import React from "react";
import axios from "axios";
import Empty from "../components/Empty";

const deleteFromCartSvg = <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <rect width="40" height="40" rx="10" fill="white" fillOpacity="0.25"/>
    <rect x="0.5" y="0.5" width="39" height="39" rx="9.5" stroke="black" strokeOpacity="0.3"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M23.2504 26.0279L24.3111 27.0885L26.4324 24.9672L25.3717 23.9065L22.6735 21.2083L25.9336 17.9482L26.9942 16.8875L24.8729 14.7662L23.8123 15.8269L20.5522 19.087L17.5936 16.1284L16.5329 15.0677L14.4116 17.189L15.4723 18.2497L18.4308 21.2083L15.327 24.3121L14.2663 25.3728L16.3876 27.4941L17.4483 26.4335L20.5522 23.3296L23.2504 26.0279Z" fill="black" fillOpacity="0.3"/>
</svg>

function Order (props) {
    const [addedItems, setAddedItems] = React.useState([]); //отображение товаров добавленных в корзину
  
    const deleteFromCart = (obj) => { //удаление товаров из корзины
      axios.delete(`https://632db5102cfd5ccc2af512de.mockapi.io/cartItems/${obj.id}`); //удаление с бека
      setAddedItems((prev) => prev.filter(item => item.id !== obj.id)); //удаление из корзины
      props.setItemsCartCounter(prev => prev - 1); //уменьшение счетчика корзины
      props.totalCostMinus((prev => prev - parseInt(obj.cost))); //уменьшение суммы заказа
    }

    React.useEffect(() => { //необходимо для того, чтобы подгрузка с бекэнда происходила только 1 раз при загрузке страницы
        axios.get('https://632db5102cfd5ccc2af512de.mockapi.io/cartItems')
            .then(res => setAddedItems(res.data)); //подгрузка с бекэнда товаров добавленных в корзину
    }, []);

    return (
        <div className="orderContent">
            <div className="orderContent__title">
                <h2>ОФОРМЛЕННЯ ЗАМОВЛЕННЯ</h2>
                <p>На всі замовлення потрібна часткова передоплата в розмірі 100 грн.</p>
            </div>
            <div className="orderContent__content">
                <div className="orderContent__deliveryForm">
                    <h5>ПІБ</h5>
                    <div className="orderContent__nameBlock">
                        <input className="orderContent__surname" type="text" placeholder="Прізвище"/>
                        <input className="orderContent__name" type="text" placeholder="Ім'я"/>
                    </div>
                    <h5>Телефон (по можливості з Telegram)</h5>
                    <div className="orderContent__phoneBlock">
                        <input className="orderContent__phone" type="tel" placeholder="+38(000)000-00-00"/>
                    </div>
                    <h5>Ваш іinstagram для зручності</h5>
                    <div className="orderContent__instagramBlock">
                        <input className="orderContent__instagram" type="text" placeholder="посилання на профіль"/>
                    </div>
                    <h5>Спосіб доставки</h5>
                    <div className="orderContent__deliveryBlock">
                        <select name="orderContent__deliveryType">
                            <option value="1">НОВА ПОШТА (до відділення)</option>
                            <option value="2">НОВА ПОШТА (адресна доставка)</option>
                        </select>
                    </div>
                    <h5>Спосіб оплати</h5>
                    <div className="orderContent__paymentBlock">
                        <select className="orderContent__paymentType">
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
                    <div className="orderContent__discontBlock">
                        <textarea placeholder="Вкажіть додаткові побажання щодо замовлення" maxLength={300} rows={8}></textarea>
                    </div>
                    <button className="acceptButton" disabled = {addedItems.length ? false : true}>Підтвердити замовлення</button>
                </div>
                <div className="orderContent__goods">
                    <h4>АКТИВНІ ЗАМОВЛЕННЯ</h4>
                    <div className="orderContent__itemsBlock quickCart__itemsBlock">
                        {addedItems.map((obj) => (
                        <div className="orderContent__item quickCart__item" key = {obj.id}>
                            <div><img src={obj.goodsImage} alt="goods" /></div>
                            <div className='orderContent__description quickCart__description'>
                                <p>{obj.name}</p>
                                <p>{obj.cost} грн.</p>
                            </div>
                            <div onClick={() => deleteFromCart(obj)}>{deleteFromCartSvg}</div>
                        </div>))
                        }
                    </div>
                    <div className="orderContent__emptyOrder emptyCart" style = {{display: addedItems.length ? 'none' : 'flex'}}>
                        <Empty></Empty>
                    </div>
                    <div className='orderContent__total quickCart__total' style = {{display: addedItems.length ? 'flex' : 'none'}}>
                        <p>Всього:</p>
                        <p>{props.totalCost} грн.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Order;
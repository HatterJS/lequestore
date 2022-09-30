import React  from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import Empty from "./Empty";

const deleteFromCartSvg = <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <rect width="40" height="40" rx="10" fill="white" fillOpacity="0.25"/>
    <rect x="0.5" y="0.5" width="39" height="39" rx="9.5" stroke="black" strokeOpacity="0.3"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M23.2504 26.0279L24.3111 27.0885L26.4324 24.9672L25.3717 23.9065L22.6735 21.2083L25.9336 17.9482L26.9942 16.8875L24.8729 14.7662L23.8123 15.8269L20.5522 19.087L17.5936 16.1284L16.5329 15.0677L14.4116 17.189L15.4723 18.2497L18.4308 21.2083L15.327 24.3121L14.2663 25.3728L16.3876 27.4941L17.4483 26.4335L20.5522 23.3296L23.2504 26.0279Z" fill="black" fillOpacity="0.3"/>
</svg>

function QuickCart(props) {

  const [addedItems, setAddedItems] = React.useState([]); //отображение товаров добавленных в корзину
  const [isLoad, setIsLoad] = React.useState(false);


  const deleteFromCart = (obj) => { //удаление товаров из корзины
    axios.delete(`https://632db5102cfd5ccc2af512de.mockapi.io/cartItems/${obj.id}`); //удаление с бека
    setAddedItems((prev) => prev.filter(item => item.id !== obj.id)); //удаление из корзины
    props.setItemsCartCounter(prev => prev - 1); //уменьшение счетчика корзины
    props.totalCostMinus((prev => prev - parseInt(obj.cost))); //уменьшение суммы заказа
  }

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
  
  return(
      <div className="quickCart">
      <div className="quickCart__shadow">
        <div className="quickCart__content">
          <h4>АКТИВНІ ЗАМОВЛЕННЯ</h4>
          {isLoad ? <div className="quickCart__itemsBlock">
            {addedItems.map((obj) => (
              <div className="quickCart__item" key = {obj.id}>
                <div><img src={obj.goodsImage} alt="sneakers" /></div>
                <div className='quickCart__description'>
                  <p>{obj.name}</p>
                  <p>{obj.cost} грн.</p>
                </div>
                <div onClick={() => deleteFromCart(obj)}>{deleteFromCartSvg}</div>
              </div>))
            }
            <div className="quickCart__emptyCart emptyCart" style = {{display: addedItems.length ? 'none' : 'flex'}}>
              <Empty
                onClose = {props.onClose}
              ></Empty>
            </div>
          </div> : 
          <div className="loader02">
              <div className="border02">
                  <div className="shapeEye01"></div>
                  <div className="shapeEye02"></div>
              </div>
              <p>loading...</p>
          </div>
          }
          <div className='quickCart__total'>
            <p>Всього:</p>
            <p>{props.totalCost} грн.</p>
          </div>
          <Link to={"/order"}><button className = 'acceptButton' disabled = {!addedItems.length ? true : false} onClick = {props.onClose}>Оформити замовлення</button></Link>
          <button
            className='acceptButton'
            style={{background: 'none'}}
            onClick={props.onClose}>
              Продовжити покупки
          </button>
        </div>
      </div>
    </div>
  )
}

export default QuickCart;
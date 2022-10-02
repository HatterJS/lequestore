import React  from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import Empty from "./Empty";
import AddedItem from "./AddedItem";

function QuickCart(props) {

  const [addedItems, setAddedItems] = React.useState([]); //отображение товаров добавленных в корзину
  const [isLoad, setIsLoad] = React.useState(false);
  const [isLoadCount, setIsLoadCount] = React.useState(true);


  const deleteFromCart = (obj, amount) => { //удаление товаров из корзины
    axios.delete(`https://632db5102cfd5ccc2af512de.mockapi.io/cartItems/${obj.id}`); //удаление с бека
    setAddedItems((prev) => prev.filter(item => item.id !== obj.id)); //удаление из корзины
    props.setItemsCartCounter(prev => prev - 1); //уменьшение счетчика корзины
    props.totalCostMinus(prev => prev - (obj.cost * amount)); //уменьшение суммы заказа
  }

  async function totalCostChange (id, cost, amount) { //изменение количества товара
    setIsLoadCount(false);
    try {
      await axios.put(`https://632db5102cfd5ccc2af512de.mockapi.io/cartItems/${id}`, {amount: amount}); //удаление с бека
    } catch (error) {
      alert('Помилочка! Перезавантажте сторінку.');
    }
    props.totalCostMinus(prev => prev + cost); //уменьшение суммы заказа
    setIsLoadCount(true);
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
            {addedItems.map((obj) => <AddedItem  key = {obj.id}
              id = {obj.id}
              goodsImage = {obj.goodsImage}
              name = {obj.name}
              cost = {obj.cost}
              amount = {obj.amount}
              deleteFromCart = {(amount) => deleteFromCart(obj, amount)}
              totalCostChange = {(cost, amount) => totalCostChange(obj.id, cost, amount)}
              isLoadCount = {isLoadCount}
              />)
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
          <Link to={"/order"}><button className = 'acceptButton' disabled = {!addedItems.length || !isLoadCount ? true : false} onClick = {props.onClose}>Оформити замовлення</button></Link>
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
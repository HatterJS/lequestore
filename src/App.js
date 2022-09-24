import React from 'react';
import axios from 'axios';
import GoodsItem from './components/GoodsItem';
import Header from './components/Header';
import QuickCart from './components/QuickCart';
import Address from './components/Address';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import './css/App.css';

function App() {
  const [quickCart, setQuickCart] = React.useState(false); //отображение/скрытие корзины
  const [goods, setGoods] = React.useState([]); //отображение товаров на главной
  const [addedItems, setAddedItems] = React.useState([]); //отображение товаров добавленных в корзину
  const [goodsTitle, setGoodsTitle] = React.useState(''); //заголовок блока товаров

  React.useEffect(() => { //необходимо для того, чтобы подгрузка с бекэнда происходила только 1 раз при загрузке страницы
      axios.get('https://632db5102cfd5ccc2af512de.mockapi.io/items')
        .then(res => setGoods(res.data)); //подгрузка с бекэнда всех товаров
      axios.get('https://632db5102cfd5ccc2af512de.mockapi.io/cartItems')
        .then(res => setAddedItems(res.data)); //подгрузка с бекэнда товаров добавленных в корзину
  }, []);

  const addedOnCart = (obj) => {
    axios.post('https://632db5102cfd5ccc2af512de.mockapi.io/cartItems', obj); //выгрузка на бекэнд товаров добавленных в корзину
    setAddedItems(prev => [...prev, obj]); //отображение товаров добавленных в корзину
  }

  const deleteFromCart = (id) => { //удаление товаров из корзины
    axios.delete(`https://632db5102cfd5ccc2af512de.mockapi.io/cartItems/${id}`); //удаление с бека
    setAddedItems((prev) => prev.filter(item => item.id !== id)); //удаление из корзины
  }

  return (
    <div className='wrapper'>
      {quickCart && <QuickCart onClose = {() => setQuickCart(false)} addedItems = {addedItems} deleteItem = {deleteFromCart}/>}
      <Header />
      <Address 
        onClickCart = {() => setQuickCart(true)}
      />
      <NavBar 
        onChangeSearch = {(searchValue) => setGoodsTitle(searchValue)}
      />
      <div className="content">
        <div className="content__banner-slider">
          <img src="/img/banner-slider/banner_01.jpg" alt="banner" />
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
        <div className="content__hotOffers">
          <div><p>Розпродаж</p></div>
          <div><p>Нова колекція</p></div>
          <div><p>Хіт продажів</p></div>
        </div>
        <h2>{goodsTitle ? `Пошук: ${goodsTitle}` : 'Всі пропозиції'} <div></div></h2>
        <div className="content__goodsBlock">
          {goods.filter((item) => item.name.toLowerCase().includes(goodsTitle.toLowerCase())).map((obj, index) => <GoodsItem 
            key = {index}
            id = {index + 1} // какой-то бред (на бекэнде id с 0 а index с 1 и при удалении из корзины пока с бека не подтянулись айдишники один товар не удаляется). Возможно брать из бека нужно в момент открытия корзины а не в момент загрузки страницы.
            name = {obj.name}
            cost = {obj.cost}
            goodsImage = {obj.goodsImage}
            onAddToCart = {(cartItem) => addedOnCart(cartItem)}
            />
           )}
        </div>
      </div>
      <div className="moreGoods">
        <p>ПОКАЗАТИ БІЛЬШЕ ...</p>
      </div>
      <Footer />
    </div>
  );
}

export default App;

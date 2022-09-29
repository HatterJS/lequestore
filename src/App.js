import React from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Home from '../src/pages/Home';
import Favorite from './pages/Favorite';
import Header from './components/Header';
import QuickCart from './components/QuickCart';
import Address from './components/Address';
import Footer from './components/Footer';
import './css/App.css';

function App() {
  const [quickCart, setQuickCart] = React.useState(false); //отображение/скрытие корзины
  const [goods, setGoods] = React.useState([]); //отображение товаров на главной
  const [goodsTitle, setGoodsTitle] = React.useState(''); //заголовок блока товаров
  const [itemsCartCounter, setItemsCartCounter] = React.useState(0); //изменение счетчика корзины
  const [totalCost, setTotalCost] = React.useState(0); //изменение общей стоимости в корзине 
  const [itemsFavoriteCounter, setItemsFavoriteCounter] = React.useState(0); //изменение счетчика корзины
  const [itemsFromFavorite, setItemsFromFavorite] = React.useState([]); //отслеживание товаров добавленых в избранное

  React.useEffect(() => { //необходимо для того, чтобы подгрузка с бекэнда происходила только 1 раз при загрузке страницы
      axios.get('https://632db5102cfd5ccc2af512de.mockapi.io/items')
        .then(res => setGoods(res.data)); //подгрузка с бекэнда всех товаров
      axios.get('https://632db5102cfd5ccc2af512de.mockapi.io/cartItems')
          .then(res => {setItemsCartCounter(res.data.length); res.data.map(item => setTotalCost(prev => (prev + item.cost)))}); //подгрузка с бекэнда товаров добавленных в корзину
      axios.get('https://632db5102cfd5ccc2af512de.mockapi.io/favoriteItems')
          .then(res => {setItemsFavoriteCounter(res.data.length); setItemsFromFavorite(res.data)}); //подгрузка с бекэнда товаров добавленных в избранное
  }, []);

  const addedOnCart = (obj) => {
    axios.post('https://632db5102cfd5ccc2af512de.mockapi.io/cartItems', obj); //выгрузка на бекэнд товаров добавленных в корзину
    setItemsCartCounter(prev => prev + 1); //увеличение счетчика корзины
    setTotalCost(prev => prev + obj.cost); //уведичение суммы заказа
  }

  const filterGoodsCondition = (item) => {
    return (
      item.group.toLowerCase().includes(goodsTitle.toLowerCase())||item.name.toLowerCase().includes(goodsTitle.toLowerCase())); //добавить фильтр из NavBara
  }

  return (
    <div className='wrapper'>
      {quickCart && <QuickCart
        onClose = {() => setQuickCart(false)}
        totalCost = {totalCost}
        totalCostMinus = {(itemCost) => setTotalCost(itemCost)}
        setItemsCartCounter = {setItemsCartCounter}
      />}
      <Header />
      <Address 
        onClickCart = {() => setQuickCart(true)}
        itemsCartCounter = {itemsCartCounter}
        itemsFavoriteCounter = {itemsFavoriteCounter}
        totalCost = {totalCost}
      />
      <Routes>
        <Route path = '/' element = {<Home 
            goods = {goods}
            goodsTitle = {goodsTitle}
            setGoodsTitle = {setGoodsTitle}
            addedOnCart = {addedOnCart}
            itemsFromFavorite = {itemsFromFavorite}
            setItemsFavoriteCounter = {setItemsFavoriteCounter}
            setItemsFromFavorite= {setItemsFromFavorite}
            filterGoodsCondition = {filterGoodsCondition}
          />}
        />
        <Route path = '/favorite' element = {<Favorite
            itemsCartCounterMinus = {(counter) => setItemsCartCounter(counter)}
            itemsFavoriteCounterMinus = {setItemsFavoriteCounter}
            setItemsFromFavorite = {setItemsFromFavorite}
            />}
          >
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
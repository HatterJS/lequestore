import React from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Home from './pages/Home';
import Favorite from './pages/Favorite';
import Order from './pages/Order';
import GoodsCard from './pages/GoodsCard';
import Information from './pages/Information';
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
  const [isLoad, setIsLoad] = React.useState(false);

  React.useEffect(() => { //необходимо для того, чтобы подгрузка с бекэнда происходила только 1 раз при загрузке страницы
    async function getData () {
      try {
        await axios.get('https://632db5102cfd5ccc2af512de.mockapi.io/items')
          .then(res => setGoods(res.data)); //подгрузка с бекэнда всех товаров
        setIsLoad(true);
      } catch (error) {
        alert('Помилочка! Перезавантажте сторінку.');
      }
    };
    getData();
      axios.get('https://632db5102cfd5ccc2af512de.mockapi.io/cartItems')
          .then(res => {setItemsCartCounter(res.data.length); res.data.map(item => setTotalCost(prev => (prev + (item.cost * item.amount))))}); //подгрузка с бекэнда товаров добавленных в корзину
      axios.get('https://632db5102cfd5ccc2af512de.mockapi.io/favoriteItems')
          .then(res => {setItemsFavoriteCounter(res.data.length); setItemsFromFavorite(res.data)}); //подгрузка с бекэнда товаров добавленных в избранное
  }, []);

  const addedOnCart = (obj) => {
    axios.post('https://632db5102cfd5ccc2af512de.mockapi.io/cartItems', obj); //выгрузка на бекэнд товаров добавленных в корзину
    setItemsCartCounter(prev => prev + 1); //увеличение счетчика корзины
    setTotalCost(prev => prev + (obj.cost * obj.amount)); //уведичение суммы заказа
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
            isLoad = {isLoad}
          />}
        />
        <Route path = '/favorite' element = {<Favorite
            itemsFavoriteCounterMinus = {setItemsFavoriteCounter}
            setItemsFromFavorite = {setItemsFromFavorite}
            />}
          >
        </Route>
        <Route path='/order'
            element = {
              <Order 
                totalCost = {totalCost}
                totalCostMinus = {(itemCost) => setTotalCost(itemCost)}
                setItemsCartCounter = {setItemsCartCounter}
              />
            }>
        </Route>
        <Route path='/goods-card'
          element = {
            <GoodsCard 
              addedOnCart = {addedOnCart}/>
          }>
        </Route>
        <Route path='/information'
          element={
            <Information 
          />}>
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
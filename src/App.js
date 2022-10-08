import React from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Home from './pages/Home';
import Favorite from './pages/Favorite';
import Order from './pages/Order';
import GoodsCard from './pages/GoodsCard';
import Information from './pages/Information';
import Admin from './pages/Admin/Admin';
import Header from './components/Header';
import QuickCart from './components/QuickCart';
import Address from './components/Address';
import Footer from './components/Footer';
import './css/App.css';

function App() {

  const [quickCart, setQuickCart] = React.useState(false); //отображение/скрытие корзины
  const [goods, setGoods] = React.useState([]); //отображение товаров на главной
  const [goodsTitle, setGoodsTitle] = React.useState(''); //заголовок блока товаров

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
  }, []);

  const filterGoodsCondition = (item) => {
    return (
      item.group.toLowerCase().includes(goodsTitle.toLowerCase())||item.name.toLowerCase().includes(goodsTitle.toLowerCase())); //добавить фильтр из NavBara
  }  

  const [favorites, setFavorites] = React.useState(JSON.parse(localStorage.getItem('favorites'))||[]);
  const [cartItems, setCartItems] = React.useState(JSON.parse(localStorage.getItem('cart'))||[]);
  localStorage.setItem('favorites', JSON.stringify(favorites));
  localStorage.setItem('cart', JSON.stringify(cartItems));

  return (
    <div className='wrapper'>
      {quickCart && <QuickCart
        onClose = {() => setQuickCart(false)}
        cartItems = {cartItems}
        setCartItems = {setCartItems}
      />}
      <Header />
      <Address 
        onClickCart = {() => setQuickCart(true)}
        favorites = {favorites}
        cartItems = {cartItems}
      />
      <Routes>
        <Route path = '/' element = {<Home 
            goods = {goods}
            goodsTitle = {goodsTitle}
            setGoodsTitle = {setGoodsTitle}
            filterGoodsCondition = {filterGoodsCondition}
            isLoad = {isLoad}
            favorites = {favorites}
            setFavorites = {(item) => setFavorites(item)}
          />}
        />
        <Route path = '/favorite' element = {<Favorite
            favorites = {favorites}
            setFavorites = {(item) => setFavorites(item)}
            />}
          >
        </Route>
        <Route path='/order'
            element = {
              <Order 
                cartItems = {cartItems}
                setCartItems = {setCartItems}
              />
            }>
        </Route>
        <Route path='/goods-card'
          element = {
            <GoodsCard
              cartItems = {cartItems}
              setCartItems = {setCartItems}
              />
          }>
        </Route>
        <Route path='/information'
          element={
            <Information 
          />}>
        </Route>
        <Route path='/admin'
          element={
            <Admin
          />}>
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
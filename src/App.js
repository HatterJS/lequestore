import React from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Home from './pages/Home/Home';
import Favorite from './pages/Favorite';
import Order from './pages/Order';
import GoodsCard from './pages/GoodsCard';
import Information from './pages/Information/Information';
import Admin from './pages/Admin/Admin';
import Header from './components/Header';
import QuickCart from './components/QuickCart';
import Address from './components/Address';
import Footer from './components/Footer';
import './css/App.css';

function App() {

  const [quickCart, setQuickCart] = React.useState(false); //отображение/скрытие корзины
  const [goods, setGoods] = React.useState([]); //отображение товаров на главной (пагинация)
  const [allGoods, setAllGoods] = React.useState([]); //перечень всех товаров
  const [goodsTitle, setGoodsTitle] = React.useState(''); //заголовок блока товаров
  const [filterData, setFilterData] = React.useState(
    {
        cost: [0, 5000],
        category: "",
        size: "",
        gender: "",
        brands: ""
    });

  const [itemLimit, setItemLimit] = React.useState(9);

  const [isLoad, setIsLoad] = React.useState(false);

  React.useEffect(() => { //подгрузка товаров с учетом фильтрации и пагинации
    async function getData () {
      try {
        await axios.post(`http://185.237.204.125:9999/goods?page=1&limit=${itemLimit}`, filterData).then(res => setGoods(res.data));
        setIsLoad(true);
      } catch (error) {
        alert('Помилочка! Перезавантажте сторінку.');
      }
    };
    getData();
  }, [itemLimit, filterData]);

  React.useEffect(() => { //загрузка всех товаров с бека для поиска и акционных предложений
    async function getData () {
      try {
          await axios.get(`http://185.237.204.125:9999/goods`).then(res => setAllGoods(res.data));
      } catch (error) {
        alert('Помилочка! Перезавантажте сторінку.');
      }
    };
    getData();
  }, []);

  const filterGoodsCondition = (item) => {
    return (
      item.gender.toLowerCase().includes(goodsTitle.toLowerCase())||
      item.brands.toLowerCase().includes(goodsTitle.toLowerCase())||
      item.additional.toLowerCase().includes(goodsTitle.toLowerCase())||
      item.name.toLowerCase().includes(goodsTitle.toLowerCase()));
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
            allGoods = {allGoods}
            goodsTitle = {goodsTitle}
            setGoodsTitle = {setGoodsTitle}
            filterGoodsCondition = {filterGoodsCondition}
            isLoad = {isLoad}
            favorites = {favorites}
            setFavorites = {(item) => setFavorites(item)}
            setItemLimit = {(value) => setItemLimit(value)}
            setFilterData = {(data) => setFilterData(data)}
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
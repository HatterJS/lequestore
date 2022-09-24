import React from 'react';
import GoodsItem from './components/GoodsItem';
import Header from './components/Header';
import QuickCart from './components/QuickCart';
import Address from './components/Address';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import './css/App.css';

function App() {
  const [quickCart, setQuickCart] = React.useState(false);
  const [goods, setGoods] = React.useState([]);
  const [addedItems, setAddedItems] = React.useState([]);
  const [goodsTitle, setGoodsTitle] = React.useState('Всі пропозиції');

  React.useEffect(() => {
    fetch('https://632db5102cfd5ccc2af512de.mockapi.io/items')
      .then(res => {
        return res.json();
      })
      .then(json => {
        setGoods(json);
      });
  }, []);

  const addedOnCart = (obj) => {
    setAddedItems(prev => [...prev, obj]);
  }

  return (
    <div className='wrapper'>
      {quickCart && <QuickCart onClose = {() => setQuickCart(false)} addedItems = {addedItems}/>}
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
        <h2>{goodsTitle} <div></div></h2>
        <div className="content__goodsBlock">
          {goods.map((obj, index) => <GoodsItem 
            key = {index}
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

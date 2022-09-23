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
  const [arrGoods, setArrGoods] = React.useState([]);

  fetch('https://632db5102cfd5ccc2af512de.mockapi.io/items').then(res => {
    return res.json();
  }).then(json => {
    setArrGoods(json);
  });

  return (
    <div className='wrapper'>
      {quickCart && <QuickCart onClose = {() => setQuickCart(false)}/>}
      <Header />
      <Address 
        onClickCart = {() => setQuickCart(true)}
      />
      <NavBar />
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
        <div className="content__goodsBlock">
          {arrGoods.map(obj => <GoodsItem 
            name={obj.name}
            cost={obj.cost}
            goodsImage={obj.goodsImage}
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

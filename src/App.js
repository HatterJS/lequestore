import GoodsItem from './components/GoodsItem';
import Header from './components/Header';
import QuickCart from './components/QuickCart';
import Address from './components/Address';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import './css/App.css';
import banner from './img/banner-slider/banner_01.jpg';
import switshot_01 from './img/goods/switshot_01.jpg';
import switshot_02 from './img/goods/switshot_02.jpg';
import tshirt_01 from './img/goods/t-shirt_01.jpg';
import sneakers_001 from './img/goods/sneakers_001.jpg';
import sneakers_002 from './img/goods/sneakers_002.jpg';
import sneakers_003 from './img/goods/sneakers_003.jpg';
import accessory_001 from './img/goods/accessory_001.jpg';

const arrGoods = [
  {
    name: 'Худи Balenciaga yellow',
    cost: '1 250',
    goodsImage: switshot_01
  },
  {
    name: 'Худи Balenciaga Light Blue',
    cost: '1 350',
    goodsImage: switshot_02
  },
  {
    name: 'Футболка FEAR OF GOD ESSENTIALS Los Angeles 3M Boxy Tee White',
    cost: '700',
    goodsImage: tshirt_01
  },
  {
    name: 'Кросівки Balenciaga Track Trainer Beige',
    cost: '2 100',
    goodsImage: sneakers_001
  },
  {
    name: 'Демісезонні ботинки Black Green на байці',
    cost: '1 950',
    goodsImage: sneakers_002
  },
  {
    name: 'Кросівкі adidas Yeezy Boost 350 V2 Ash Stone',
    cost: '2 599',
    goodsImage: sneakers_003
  },
  {
    name: 'Шкарпетки FOG ESSENTIALS LOS ANGELES SOCKS Fear of God Kanye West Crew Grey',
    cost: '249',
    goodsImage: accessory_001
  },
  {
    name: 'Худи Balenciaga yellow',
    cost: '1 250',
    goodsImage: switshot_01
  }
];

function App() {
  return (
    <div className='wrapper'>
      <QuickCart />
      <Header />
      <Address />
      <NavBar />
      <div className="content">
        <div className="content__banner-slider">
          <img src={banner} alt="banner" />
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

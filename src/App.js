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

const addToCartSVG = <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
  <rect width="40" height="40" rx="10" fill="white" fill-opacity="0.3"/>
  <rect x="0.5" y="0.5" width="39" height="39" rx="9.5" stroke="black" stroke-opacity="0.3"/>
  <path d="M28 13L19.5287 26.1306C19.1832 26.666 18.4318 26.7461 17.9813 26.2955L12 20.3143" stroke="black" stroke-opacity="0.2" stroke-width="3" stroke-linecap="round"/>
</svg>



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
          <GoodsItem />
          <div className='content__goodsItem' style={{backgroundImage: `url(${switshot_02})`}}>
            <div><p>Худи Balenciaga Light Blue</p></div>
            <div>
              <p>1 350 грн.</p>
              <button>{addToCartSVG}</button>
            </div>
            <img src={switshot_02} alt="sorry" /> {/* for indexation*/}
          </div>
          <div className='content__goodsItem' style={{backgroundImage: `url(${tshirt_01})`}}>
            <div><p>Футболка FEAR OF GOD ESSENTIALS Los Angeles 3M Boxy Tee White</p></div>
            <div>
              <p>700 грн.</p>
              <button>{addToCartSVG}</button>
            </div>
            <img src={tshirt_01} alt="sorry" /> {/* for indexation*/}
          </div>
          <div className='content__goodsItem' style={{backgroundImage: `url(${sneakers_001})`}}>
            <div><p>Кросівки Balenciaga Track Trainer Beige</p></div>
            <div>
              <p>2 100 грн.</p>
              <button>{addToCartSVG}</button>
            </div>
            <img src={sneakers_001} alt="sorry" /> {/* for indexation*/}
          </div>
          <div className='content__goodsItem' style={{backgroundImage: `url(${sneakers_002})`}}>
            <div><p>Демісезонні ботинки Black Green на байці</p></div>
            <div>
              <p>1 950 грн.</p>
              <button>{addToCartSVG}</button>
            </div>
            <img src={sneakers_002} alt="sorry" /> {/* for indexation*/}
          </div>
          <div className='content__goodsItem' style={{backgroundImage: `url(${sneakers_003})`}}>
            <div><p>Кросівкі adidas Yeezy Boost 350 V2 Ash Stone</p></div>
            <div>
              <p>2 599 грн.</p>
              <button>{addToCartSVG}</button>
            </div>
            <img src={sneakers_003} alt="sorry" /> {/* for indexation*/}
          </div>
          <div className='content__goodsItem' style={{backgroundImage: `url(${accessory_001})`}}>
            <div><p>Шкарпетки FOG ESSENTIALS LOS ANGELES SOCKS Fear of God Kanye West Crew Grey</p></div>
            <div>
              <p>249 грн.</p>
              <button>{addToCartSVG}</button>
            </div>
            <img src={accessory_001} alt="sorry" /> {/* for indexation*/}
          </div>
          <div className='content__goodsItem' style={{backgroundImage: `url(${switshot_01})`}}>
            <div><p>Худи Balenciaga yellow</p></div>
            <div>
              <p>1 250 грн.</p>
              <button>{addToCartSVG}</button>
            </div>
            <img src={switshot_01} alt="sorry" /> {/* for indexation*/}
          </div>
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

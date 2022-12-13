import React from 'react';
import GoodsItem from '../../components/GoodsItem';
import NavBar from '../../components/NavBar';
import FilterBar from '../../components/FilterBar/FilterBar';
import Banner from '../../components/Banner';
import HotOffersBar from '../../components/HotOffersBar';
import './home.css';
import '../../css/loader.css';
import { useSelector } from 'react-redux';

const scrollTopSVG = (
  <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
    <circle cx="25" cy="25" r="25" fill="#f6ff66ab" />
    <circle cx="25" cy="25" r="24.5" stroke="#404040" strokeOpacity="0.2" />
    <path
      d="M23.5 14.5C23.5 15.3284 24.1716 16 25 16C25.8284 16 26.5 15.3284 26.5 14.5H23.5ZM26.0607 12.4393C25.4749 11.8536 24.5251 11.8536 23.9393 12.4393L14.3934 21.9853C13.8076 22.5711 13.8076 23.5208 14.3934 24.1066C14.9792 24.6924 15.9289 24.6924 16.5147 24.1066L25 15.6213L33.4853 24.1066C34.0711 24.6924 35.0208 24.6924 35.6066 24.1066C36.1924 23.5208 36.1924 22.5711 35.6066 21.9853L26.0607 12.4393ZM26.5 14.5V13.5H23.5V14.5H26.5Z"
      fill="#404040"
      fillOpacity="0.5"
    />
    <path
      d="M23.5 25.5C23.5 26.3284 24.1716 27 25 27C25.8284 27 26.5 26.3284 26.5 25.5H23.5ZM26.0607 23.4393C25.4749 22.8536 24.5251 22.8536 23.9393 23.4393L14.3934 32.9853C13.8076 33.5711 13.8076 34.5208 14.3934 35.1066C14.9792 35.6924 15.9289 35.6924 16.5147 35.1066L25 26.6213L33.4853 35.1066C34.0711 35.6924 35.0208 35.6924 35.6066 35.1066C36.1924 34.5208 36.1924 33.5711 35.6066 32.9853L26.0607 23.4393ZM26.5 25.5V24.5H23.5V25.5H26.5Z"
      fill="#404040"
      fillOpacity="0.5"
    />
  </svg>
);

function Home({ goods, allGoods, isLoad, favorites, setFavorites, setItemLimit }) {
  //get search condition from Redux
  const { search } = useSelector((state) => state.filter);
  const [scrollTopClass, setScrollTopClass] = React.useState(true); //изменение видимости иконки скролла вверх страницы
  const [showFilter, setShowFilter] = React.useState(false); //показать фильтр и скрыть баннер

  window.onscroll = () => {
    //отображение иконки скролла вверх страницы при прокрутке вниз на 500
    if (window.scrollY > 500) {
      setScrollTopClass(false);
    } else {
      setScrollTopClass(true);
    }
  };

  function scrollTop() {
    //скроллинг вверх страницы по нажатию иконки
    window.scrollTo(0, 0);
  }

  function onFilter() {
    setShowFilter(!showFilter);
  }

  const filterGoodsCondition = (item) => {
    return (
      item.gender.toLowerCase().includes(search.toLowerCase()) ||
      item.brands.toLowerCase().includes(search.toLowerCase()) ||
      item.additional.toLowerCase().includes(search.toLowerCase()) ||
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <div className="content">
      <NavBar showFilter={() => onFilter()} />
      {showFilter && <FilterBar />}
      {!showFilter && <Banner />}
      <HotOffersBar />
      <h2>
        <div></div> {search} <div></div>
      </h2>
      <div className="content__goodsBlock">
        {isLoad ? ( //лоадер пока товары загружаются
          search === 'Всі пропозиції' ? ( //если поиск / акции не активированы то грузить товары порциями (пагинация)
            goods.map((obj) => (
              <GoodsItem
                key={obj.id}
                id={obj.id}
                name={obj.name}
                cost={obj.cost}
                goodsImage={obj.goodsImage[0]}
                setFavorites={setFavorites}
                favorites={favorites}
              />
            ))
          ) : (
            //или если поиск / акции активны то грузить все товары в зависимости от поиска
            allGoods
              .filter(filterGoodsCondition)
              .map((obj) => (
                <GoodsItem
                  key={obj.id}
                  id={obj.id}
                  name={obj.name}
                  cost={obj.cost}
                  goodsImage={obj.goodsImage[0]}
                  setFavorites={setFavorites}
                  favorites={favorites}
                />
              ))
          )
        ) : (
          //лоадер
          <div className="loader02">
            <div className="border02">
              <div className="shapeEye01"></div>
              <div className="shapeEye02"></div>
            </div>
            <p>loading...</p>
          </div>
        )}
        <div
          className={
            scrollTopClass ? 'content__scrollTop content__scrollTop-hidden' : 'content__scrollTop'
          }
          onClick={scrollTop}>
          {scrollTopSVG}
        </div>
      </div>
      <div className="moreGoods">
        <p onClick={() => setItemLimit((prev) => prev + 9)}>ПОКАЗАТИ БІЛЬШЕ ...</p>
      </div>
    </div>
  );
}

export default Home;

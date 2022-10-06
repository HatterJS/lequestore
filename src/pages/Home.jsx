import React from 'react';
import GoodsItem from '../components/GoodsItem';
import NavBar from '../components/NavBar';
import Banner from '../components/Banner';
import '../css/loader.css';

function Home ({goods, goodsTitle, setGoodsTitle, filterGoodsCondition, isLoad, favorites, setFavorites}) {

    return (
    <div className="content">
        <NavBar 
        onChangeSearch = {(searchValue) => setGoodsTitle(searchValue)}
        />
        <Banner />
        <div className="content__hotOffers">
            <div
            className={(goodsTitle==='розпродаж') ? 'content_activeHotOffers' : ''} 
            onClick={() => setGoodsTitle('Розпродаж')}
            ><p>Розпродаж</p></div>
            <div
            className={(goodsTitle==='нова колекція') ? 'content_activeHotOffers' : ''}
            onClick={() => setGoodsTitle('Нова колекція')}
            ><p>Нова колекція</p></div>
            <div
            className={(goodsTitle==='хіт продажів') ? 'content_activeHotOffers' : ''}
            onClick={() => setGoodsTitle('Хіт продажів')}
            ><p>Хіт продажів</p></div>
            <div
            className={(goodsTitle==='') ? 'content_activeHotOffers' : ''}
            onClick={() => setGoodsTitle('')}
            ><p>Всі пропозиції</p></div>
        </div>
        <h2><div></div> {goodsTitle ? `${goodsTitle}` : 'Всі пропозиції'} <div></div></h2>
        <div className="content__goodsBlock">
            {isLoad ? goods.filter(filterGoodsCondition).map((obj) => <GoodsItem
            key = {obj.id}
            id = {obj.id}
            name = {obj.name}
            cost = {obj.cost}
            goodsImage = {obj.goodsImage}
            setFavorites = {setFavorites}
            favorites = {favorites}
            />) : 
            <div className="loader02">
                <div className="border02">
                    <div className="shapeEye01"></div>
                    <div className="shapeEye02"></div>
                </div>
                <p>loading...</p>
            </div>
            }
        </div>
        <div className="moreGoods">
            <p>ПОКАЗАТИ БІЛЬШЕ ...</p>
        </div>
    </div>
    );
}

export default Home;
import GoodsItem from '../components/GoodsItem';
import NavBar from '../components/NavBar';
import '../css/loader.css';

function Home ({goods, goodsTitle, setGoodsTitle, addedOnCart, filterGoodsCondition, itemsFromFavorite, setItemsFavoriteCounter, setItemsFromFavorite, isLoad}) {

    return (
    <div className="content">
        <NavBar 
        onChangeSearch = {(searchValue) => setGoodsTitle(searchValue)}
        />
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
            <div
            className={(goodsTitle==='розпродаж') ? 'content_activeHotOffers' : ''} 
            onClick={() => setGoodsTitle('розпродаж')}
            ><p>Розпродаж</p></div>
            <div
            className={(goodsTitle==='нова колекція') ? 'content_activeHotOffers' : ''}
            onClick={() => setGoodsTitle('нова колекція')}
            ><p>Нова колекція</p></div>
            <div
            className={(goodsTitle==='хіт продажів') ? 'content_activeHotOffers' : ''}
            onClick={() => setGoodsTitle('хіт продажів')}
            ><p>Хіт продажів</p></div>
            <div
            className={(goodsTitle==='') ? 'content_activeHotOffers' : ''}
            onClick={() => setGoodsTitle('')}
            ><p>Всі пропозиції</p></div>
        </div>
        <h2>{goodsTitle ? `Пошук: ${goodsTitle}` : 'Всі пропозиції'} <div></div></h2>
        <div className="content__goodsBlock">
            {isLoad ? goods.filter(filterGoodsCondition).map((obj) => <GoodsItem 
            key = {obj.id}
            name = {obj.name}
            cost = {obj.cost}
            goodsImage = {obj.goodsImage}
            onAddToCart = {(cartItem) => addedOnCart(cartItem)}
            itemsFromFavorite = {itemsFromFavorite}
            setItemsFavoriteCounter = {setItemsFavoriteCounter}
            setItemsFromFavorite = {setItemsFromFavorite}
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
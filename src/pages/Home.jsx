import GoodsItem from '../components/GoodsItem';
import NavBar from '../components/NavBar';

function Home ({goods, goodsTitle, setGoodsTitle, addedOnCart, filterGoodsCondition, addedOnFavorite, itemsFromFavorite}) {
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
            {goods.filter(filterGoodsCondition).map((obj, index) => <GoodsItem 
            key = {index}
            //id = {index + 1} // какой-то бред (на бекэнде id с 0 а index с 1 и при удалении из корзины пока с бека не подтянулись айдишники один товар не удаляется). Возможно брать из бека нужно в момент открытия корзины а не в момент загрузки страницы.
            name = {obj.name}
            cost = {obj.cost}
            goodsImage = {obj.goodsImage}
            onAddToCart = {(cartItem) => addedOnCart(cartItem)}
            onAddToFavorite = {(favoriteItem) => addedOnFavorite(favoriteItem)}
            itemsFromFavorite = {itemsFromFavorite}
            />
            )}
        </div>
        <div className="moreGoods">
            <p>ПОКАЗАТИ БІЛЬШЕ ...</p>
        </div>
    </div>
    );
}

export default Home;
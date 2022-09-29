import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const deleteFromCartSvg = <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <rect width="40" height="40" rx="10" fill="white" fillOpacity="0.25"/>
    <rect x="0.5" y="0.5" width="39" height="39" rx="9.5" stroke="black" strokeOpacity="0.3"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M23.2504 26.0279L24.3111 27.0885L26.4324 24.9672L25.3717 23.9065L22.6735 21.2083L25.9336 17.9482L26.9942 16.8875L24.8729 14.7662L23.8123 15.8269L20.5522 19.087L17.5936 16.1284L16.5329 15.0677L14.4116 17.189L15.4723 18.2497L18.4308 21.2083L15.327 24.3121L14.2663 25.3728L16.3876 27.4941L17.4483 26.4335L20.5522 23.3296L23.2504 26.0279Z" fill="black" fillOpacity="0.3"/>
</svg>

function Favorite (props) {

    const [addedItems, setAddedItems] = React.useState([]); //отображение товаров добавленных в корзину
    const deleteFromFavorite = (obj) => { //удаление товаров из корзины
      axios.delete(`https://632db5102cfd5ccc2af512de.mockapi.io/favoriteItems/${obj.id}`); //удаление с бека
      setAddedItems(prev => prev.filter((item) => item.id !== obj.id)); //удаление из избранного
      props.itemsFavoriteCounterMinus(prev => prev - 1); //уменьшение счетчика избранного
      props.setItemsFromFavorite(prev => prev.filter((item) => !item.name.includes(obj.name))); //удаление из локального массива избранных
    }

    React.useEffect(() => { //необходимо для того, чтобы подгрузка с бекэнда происходила только 1 раз при загрузке страницы
        axios.get('https://632db5102cfd5ccc2af512de.mockapi.io/favoriteItems')
            .then(res => setAddedItems(res.data)); //подгрузка с бекэнда товаров добавленных в корзину
    }, []);

    return (
        <div className="favorite__content">
            <h2>Обране:</h2>
            <div className="favorite__itemsBlock">
                {addedItems.map((obj, index) => (
                <div className="favorite__item" key = {index}>
                    <div><img src={obj.goodsImage} alt="sneakers" /></div>
                    <div className='favorite__description'>
                    <p>{obj.name}</p>
                    <p>{obj.cost} грн.</p>
                    </div>
                    <div onClick={() => deleteFromFavorite(obj)}>{deleteFromCartSvg}</div>
                </div>))
                }
            </div>
            <div className="favorite__content-emptyCart emptyCart" style = {{display: addedItems.length ? 'none' : 'flex'}}>
                <h3>Відсутні обрані товари</h3>
                <img src="../img/icons/emptyCart.png" alt="emptyCart" />
                <Link to = '/'><button className='acceptButton' onClick={props.onClose}>Повернутись до покупок</button></Link>
            </div>
        </div>
    );
}

export default Favorite;
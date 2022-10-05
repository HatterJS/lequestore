import React from "react";
import axios from "axios";
import Empty from "../components/Empty";
import AddedItem from "../components/AddedItem";

function Favorite (props) {

    const [addedItems, setAddedItems] = React.useState([]); //отображение товаров добавленных в корзину
    const [isLoad, setIsLoad] = React.useState(false);

    const deleteFromFavorite = (obj) => { //удаление товаров из корзины
      axios.delete(`https://632db5102cfd5ccc2af512de.mockapi.io/favoriteItems/${obj.id}`); //удаление с бека
      setAddedItems(prev => prev.filter((item) => item.id !== obj.id)); //удаление из избранного
      props.itemsFavoriteCounterMinus(prev => prev - 1); //уменьшение счетчика избранного
      props.setItemsFromFavorite(prev => prev.filter((item) => !item.name.includes(obj.name))); //удаление из локального массива избранных
    }

    React.useEffect(() => { //необходимо для того, чтобы подгрузка с бекэнда происходила только 1 раз при загрузке страницы
        async function getData () {
            try {
                await axios.get('https://632db5102cfd5ccc2af512de.mockapi.io/favoriteItems')
                    .then(res => setAddedItems(res.data)); //подгрузка с бекэнда товаров добавленных в корзину}
            } catch (error) {
                alert('Помилочка! Перезавантажте сторінку.');
            }
            setIsLoad(true);
        }
        getData();
    }, []);

    return (
        <div className="favorite__content">
            <h1>ОБРАНЕ</h1>
            {isLoad ?
                <>
                    <div className="favorite__itemsBlock">
                        {addedItems.map((obj) => <AddedItem  key = {obj.id}
                            // id = {obj.id}
                            parentId = {obj.parentId}
                            goodsImage = {obj.goodsImage}
                            name = {obj.name}
                            cost = {obj.cost}
                            deleteFromCart = {() => deleteFromFavorite(obj)}
                            />)
                        }
                    </div>
                    <div className="favorite__content-emptyCart emptyCart" style = {{display: addedItems.length ? 'none' : 'flex'}}>
                        <Empty></Empty>
                    </div>
                </> : 
                <div className="loader02">
                    <div className="border02">
                        <div className="shapeEye01"></div>
                        <div className="shapeEye02"></div>
                    </div>
                    <p>loading...</p>
                </div>
            }
        </div>
    );
}

export default Favorite;
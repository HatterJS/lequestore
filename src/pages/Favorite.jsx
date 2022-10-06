import React from "react";
import Empty from "../components/Empty";
import AddedItem from "../components/AddedItem";

function Favorite (props) {

    function deleteFromFavorite(id) {
            props.setFavorites(JSON.parse(localStorage.getItem('favorites')).filter(obj => obj.id!==id));
    }

    return (
        <div className="favorite__content">
            <h1>ОБРАНЕ</h1>
                <div className="favorite__itemsBlock">
                    {props.favorites.map((obj) => <AddedItem
                        key = {obj.id}
                        id = {obj.id}
                        name = {obj.name}
                        cost = {obj.cost}
                        goodsImage = {obj.goodsImage}
                        deleteItem = {() => deleteFromFavorite(obj.id)}
                        />)
                    }
                </div>
                <div className="favorite__content-emptyCart emptyCart" style = {{display: props.favorites.length ? 'none' : 'flex'}}>
                    <Empty></Empty>
                </div>
        </div>
    );
}

export default Favorite;
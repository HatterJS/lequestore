import React from "react";
import { Link } from "react-router-dom";

const deleteFromCartSvg = <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <rect width="40" height="40" rx="10" fill="white" fillOpacity="0.25"/>
    <rect x="0.5" y="0.5" width="39" height="39" rx="9.5" stroke="black" strokeOpacity="0.3"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M23.2504 26.0279L24.3111 27.0885L26.4324 24.9672L25.3717 23.9065L22.6735 21.2083L25.9336 17.9482L26.9942 16.8875L24.8729 14.7662L23.8123 15.8269L20.5522 19.087L17.5936 16.1284L16.5329 15.0677L14.4116 17.189L15.4723 18.2497L18.4308 21.2083L15.327 24.3121L14.2663 25.3728L16.3876 27.4941L17.4483 26.4335L20.5522 23.3296L23.2504 26.0279Z" fill="black" fillOpacity="0.3"/>
</svg>

function AddedItem (props) {

    const changeCounterPlus = () => {
        props.setCartItems(props.cartItems.map(obj => (obj.id===props.id && obj.size===props.size ? {...obj, amount: obj.amount + 1} : obj)));
    }
    const changeCounterMinus = () => {
        props.amount > 1 && props.setCartItems(props.cartItems.map(obj => (obj.id===props.id && obj.size===props.size ? {...obj, amount: obj.amount - 1} : obj)));
    }

    return (
        <div className="addedItem">
            <Link to='/goods-card' state={{id: props.id}}>
                <div className="addedItem__forLink"></div>
            </Link>
            <div>
                <img src={props.goodsImage} alt="sneakers" />
            </div>
            <div className='addedItem__description'>
                <p>{props.name}</p>
                {props.size && <p style={{fontSize:"14px"}}>(Розмір: <b>{props.size}</b>)</p>}
                <div className="addedItem__cost">
                    <p>{props.cost} грн.</p>
                    {props.amount &&
                        <div className="addedItem__counter counter unselectable">
                            <div onClick={changeCounterMinus}>-</div>
                            {props.amount} шт.
                            <div onClick={changeCounterPlus}>+</div>
                        </div>
                    }
                </div>
            </div>
            <div className="addedItem__deleteItemBtn" onClick={props.deleteItem}>
                {deleteFromCartSvg}
            </div>
        </div>
    );
}

export default AddedItem;
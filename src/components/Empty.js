import { Link } from "react-router-dom";

function Empty (props) {
    return (
        <>
            <h3>Ой-ой! Тут порожньо.</h3>
            <img src="../img/icons/emptyCart.png" alt="emptyCart" />
            <p>Нажаль Ви не додали жодного товару</p>
            <Link to = '/'>
                <button className='acceptButton' onClick={props.onClose}>
                    Повернутись до товарів
                </button>
            </Link>
        </>
    );
}

export default Empty;
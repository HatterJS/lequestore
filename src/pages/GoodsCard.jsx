import React from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const sizeSVG = <svg width="30" height="30" viewBox="0 0 37 37" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M2.82842 25.4558L0 28.2843L8.48528 36.7696L36.7696 8.48528L28.2843 4.76837e-07L26.163 2.12132L31.8198 7.77817L31.1127 8.48528L25.4558 2.82843L23.3345 4.94975L26.1629 7.77818L25.4558 8.48529L22.6274 5.65686L20.5061 7.77817L26.163 13.435L25.4558 14.1421L19.799 8.48528L17.6777 10.6066L20.5061 13.435L19.799 14.1421L16.9706 11.3137L14.8492 13.435L20.5061 19.0919L19.799 19.799L14.1421 14.1421L12.0208 16.2635L14.8492 19.0919L14.1421 19.799L11.3137 16.9706L9.19239 19.0919L14.8492 24.7487L14.1421 25.4558L8.48528 19.799L6.36396 21.9203L9.19238 24.7487L8.48528 25.4558L5.65685 22.6274L3.53553 24.7487L9.19238 30.4056L8.48528 31.1127L2.82842 25.4558Z" fill="#FFC34F"/>
</svg>

function GoodsCard(props) {

    const itemId = useLocation().state.id;

    const [goodsItem, setGoodsItem] = React.useState([]);
    const [isLoad, setIsLoad] = React.useState(false);
    const [timeCounter, setTimeCounter] = React.useState(0);

    const [goodsAmount, setGoodsAmount] = React.useState(1);
    const [checkedSize, setCheckedSize] = React.useState("");

    React.useEffect(() => {
        async function getData() {
            try {
                await axios.get(`https://632db5102cfd5ccc2af512de.mockapi.io/items/${itemId}`).then(res => setGoodsItem(res.data));
            } catch (error) {
                alert('Помилочка! Перезавантажте сторінку.');
            }
            setIsLoad(true);
        }
        getData();
    }, [itemId]);

    const addedToCart = () => {
        const addToCart = {
            "id": goodsItem.id,
            "name": goodsItem.name,
            "cost": goodsItem.cost,
            "size": checkedSize,
            "goodsImage": goodsItem.goodsImage,
            "amount": goodsAmount
        };

        //проверка анличия товара в корзине
        if (props.cartItems.map(obj => obj.id).includes(goodsItem.id) &&
            props.cartItems.map(obj => obj.size).includes(checkedSize)) //проверка товара по id и size
        {
            props.setCartItems(props.cartItems.map(obj => (obj.id===goodsItem.id && obj.size===checkedSize ? {...obj, amount: obj.amount+goodsAmount} : obj))); //если объект с совпадающими id и size есть в корзине то при добавлении увеличить счетчик товара в корзине
        } else {
            props.setCartItems(prev => [...prev, addToCart]); //если объекта с совпадающими id и size нет в корзине то добавить как новый товар в корзину
        }

        //таймер задержки после нажатия кнопки "Додати в кошик"
        setTimeCounter(3); // сек. до отключения блокировки кнопки "Додати в кошик" после нажатия
        let counter = 3; // счеьчик отключения setInterval (менять в паре со значением в setTimeCounter)
        const delay = setInterval(() => {
            setTimeCounter(prev => prev-1);
            counter--;
            if (counter === 0) {clearInterval(delay)};
        }, 1000);
    }

    function buttonTitle() {
        if (timeCounter>0) { //таймер задержки после нажатия
            return (timeCounter + " сек.")
        } else if (!checkedSize) { //не выбран размер товара
            return "Оберіть розмір"
        } else { //товар готов к добавлению в корзину
            return "Додати в кошик"
        }
    }

    return (
        <>
            {isLoad ? 
                <div className="goodsCard">
                    <div className="goodsCard__content">
                        <div className="goodsCard__image">
                            <img src={goodsItem.goodsImage} alt="goodsImage" />
                        </div>
                        <div className="goodsCard__order">
                            <div className="goodsCard__name">
                                <h2>{goodsItem.name}</h2>
                            </div>
                            <div className="goodsCard__cost">
                                <p>Ціна: {goodsItem.cost} грн.</p>
                            </div>
                            <div className="goodsCard__size">
                                <p>Розмір:</p>
                                <div className="goodsCard__size-option">
                                    {goodsItem.size.map(obj => <input
                                        key={obj}
                                        label={obj}
                                        type="radio"
                                        name="size"
                                        onClick={() => setCheckedSize(obj)}
                                    />)}
                                </div>
                            </div>
                            <div className="goodsCard__sizeHelp">
                                {sizeSVG}
                                <p>Як підібрати розмір?</p>
                            </div>
                            <div className="goodsCard__count">
                                <p>Кількість:</p>
                                <div className="goodsCard__counter counter">
                                    <div className="unselectable" onClick={() => ((goodsAmount > 1) && setGoodsAmount(goodsAmount - 1))}>-</div>
                                    {goodsAmount}
                                    <div className="unselectable" onClick={() => setGoodsAmount(goodsAmount + 1)}>+</div>
                                </div>
                            </div>
                            <div className="goodsCard__accept">
                                <button className="acceptButton" disabled={!checkedSize||timeCounter>0 ? true : false} onClick={addedToCart}>{buttonTitle()}</button>
                                <button className="acceptButton" disabled>Купити в один клік</button>
                            </div>
                        </div>
                    </div>
                    <div className="goodsCard__description">
                        <ul>
                            <li>ОПИС</li>
                            <li>ДОСТАВКА</li>
                            <li>ОПЛАТА</li>
                            <li style={{borderBottom: '3px solid #FFC34F'}}>ГАРАНТІЯ</li>
                        </ul>
                        <div className="goodsCard__context">
                            <p>Повернення і обмін протягом 14 календарних днів.</p>
                            <p>Гарантійний термін на протязі 30 днів.</p>
                        </div>
                    </div>
                </div> :
                <div className="loader02">
                    <div className="border02">
                        <div className="shapeEye01"></div>
                        <div className="shapeEye02"></div>
                    </div>
                    <p>loading...</p>
                </div>
            }
        </>
    );
}

export default GoodsCard;
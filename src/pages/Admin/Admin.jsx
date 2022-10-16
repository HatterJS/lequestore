import axios from 'axios';
import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

import './Admin.css';

const sizeSVG = <svg width="15" height="15" viewBox="0 0 37 37" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M2.82842 25.4558L0 28.2843L8.48528 36.7696L36.7696 8.48528L28.2843 4.76837e-07L26.163 2.12132L31.8198 7.77817L31.1127 8.48528L25.4558 2.82843L23.3345 4.94975L26.1629 7.77818L25.4558 8.48529L22.6274 5.65686L20.5061 7.77817L26.163 13.435L25.4558 14.1421L19.799 8.48528L17.6777 10.6066L20.5061 13.435L19.799 14.1421L16.9706 11.3137L14.8492 13.435L20.5061 19.0919L19.799 19.799L14.1421 14.1421L12.0208 16.2635L14.8492 19.0919L14.1421 19.799L11.3137 16.9706L9.19239 19.0919L14.8492 24.7487L14.1421 25.4558L8.48528 19.799L6.36396 21.9203L9.19238 24.7487L8.48528 25.4558L5.65685 22.6274L3.53553 24.7487L9.19238 30.4056L8.48528 31.1127L2.82842 25.4558Z" fill="#FFC34F"/>
</svg>
const deleteFromCartSvg = <svg width="30" height="30" viewBox="0 0 40 40" fill="none">
    <rect width="40" height="40" rx="10" fill="orange" fillOpacity="0.40"/>
    <rect x="0.5" y="0.5" width="39" height="39" rx="9.5" stroke="black" strokeOpacity="0.3"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M23.2504 26.0279L24.3111 27.0885L26.4324 24.9672L25.3717 23.9065L22.6735 21.2083L25.9336 17.9482L26.9942 16.8875L24.8729 14.7662L23.8123 15.8269L20.5522 19.087L17.5936 16.1284L16.5329 15.0677L14.4116 17.189L15.4723 18.2497L18.4308 21.2083L15.327 24.3121L14.2663 25.3728L16.3876 27.4941L17.4483 26.4335L20.5522 23.3296L23.2504 26.0279Z" fill="black" fillOpacity="0.3"/>
</svg>

function Admin() {

    const loginData = [ //пары логин и пароль администраторов
        {login: 'immortal', password: '8171078'},
        {login: 'user', password: 'user'}
    ];

    const [login, setLogin] = React.useState(localStorage.getItem('autorization') ? JSON.parse(decodeURI(localStorage.getItem('autorization'))).l : ""); //автозаполнение логина из localStorage
    const [password, setPassword] = React.useState(localStorage.getItem('autorization') ? JSON.parse(decodeURI(localStorage.getItem('autorization'))).p : ""); //автозаполнение пароля из localStorage
    const [accepted, setAccepted] = React.useState(false); //авторизация

    const enter = () => { //проверка правильности ввода пары логин - пароль и добавление в localStorage
        loginData.map(obj => obj.login===login&&obj.password===password && setAccepted(true));
        localStorage.setItem('autorization', encodeURI(JSON.stringify({l: login, p: password})));
    }

    const [isLoad, setIsLoad] = React.useState(false); //загрузчик на время запросов на сервер

    const bookmarks = ['Товари', 'Розділіи', 'Акції', 'Банер']; //вкладки в админ. панели
    const goodsSizesArr = [ //типы размеров для одежды/обуви...
        ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        ['38', '39', '40', '41', '42', '43', '44', '45']
    ];

    const [checkedBookmark, setCheckedBookmark] = React.useState('Товари'); //выбор вкладки админ. панели

    const [goodsId, setGoodsId] = React.useState("");
    const [goodsName, setGoodsName] = React.useState("");
    const [goodsCost, setGoodsCost] = React.useState("");
    const [goodsCategory, setGoodsCategory] = React.useState("Взуття");
    const [checkedSizes, setCheckedSizes] = React.useState([]);
    const [goodsImage, setGoodsImage] = React.useState("");
    const [imageCounter, setImageCounter] = React.useState(1);
    const [additional, setAdditional] = React.useState("");

    const [goods, setGoods] = React.useState([0]); //все товары (подгружается от сервера)
    const [bestId, setBestId] = React.useState("______"); //рекомендованый id
    const [lastId, setLastId] = React.useState(""); //наибольший id в базе товаров

    React.useEffect(() => { //подгрузка товаров от сервера
        async function getData() {
            try {
                await axios.get('http://localhost:9999/goods').then(res => setGoods(res.data));
                setIsLoad(true); //отключение лоадера после загрузки товаров
            } catch (error) {
                alert('Помилочка! Перезавантажте сторінку.');
            }
        }
        getData();
    }, []);

    function clearAll() { //функция очистки всех полей
        setGoodsName("");
        setGoodsCost("");
        setGoodsCategory("Взуття");
        setCheckedSizes([]);
        setGoodsImage("");
        setImageCounter(1);
        setAdditional("");
    }
    
    function findId() { //поиск рекомендуемого и последнего id
        const allId = goods.map(obj => Number(obj.id)); //массив всех id
        const newArr = []; //промежуточный массив для определения рекомендуемого id
        allId.reduce(function(a, b) {if(b-a!==1) {newArr.push(a+1); return b} else {return b}}, 0); //выборка пропущенных id и отправка в промежуточный массив
        const missedId = newArr[0]||allId.length+1; //наименьший пропущенный id или последний id+1
        setBestId(missedId); //рекомендуемый id
        setGoodsId(missedId); //id товара по умолчанию (в дальнейшем изменяется)
        setLastId(allId[allId.length-1]); //последний id
        clearAll(); //вызов функции очистки всех полей
    }
    function checkedSizesArr(item) { //добавление/удаление выбранных размеров в массив
        checkedSizes.find(size => size===item) ? 
            setCheckedSizes(checkedSizes.filter(size => size!==item)) :
            setCheckedSizes([...checkedSizes, item]);
    }
    const goodsItem = { //параметры товара
        id: goodsId,
        name: goodsName,
        cost: goodsCost,
        category: goodsCategory,
        size: checkedSizes,
        goodsImage: [...Array(Number(imageCounter)+1).keys()].slice(1).map(obj => `/img/goods/${goodsImage}/${obj}.jpg`),
        additional: additional
    }
    async function postNewGoods() { //изменение/добавление нового товара и получение обновленного списка всех товаров
        setIsLoad(false); //активация загрузчика
        try {
            goods.map(obj => obj.id).includes(Number(goodsItem.id)) ?
                await axios.put(`http://localhost:9999/goods/${goodsItem.id}`, goodsItem) :
                await axios.post('http://localhost:9999/goods', goodsItem);
                await axios.get('http://localhost:9999/goods').then(res => setGoods(res.data));
            setIsLoad(true); //отключение загрузчика
        } catch(error) {
            alert('Помилочка! Перезавантажте сторінку.');
        }
        setGoodsId(''); //очистка поля id
        setBestId("______"); //очистка поля рекомендованого id
        clearAll(); //очистка полей
    }
    async function deleteGoods() { //удаление товара и получение обновленного списка всех товаров
        setIsLoad(false); //активация загрузчика
        try {
            await axios.delete(`http://localhost:9999/goods/${goodsId}`);
            setIsLoad(true); //отключение загрузчика
            await axios.get('http://localhost:9999/goods').then(res => setGoods(res.data));
        } catch(error) {
            alert('Помилочка! Перезавантажте сторінку.');
        }
        setGoodsId(''); //очистка поля id
        setBestId("______"); //очистка поля рекомендованого id
        clearAll(); //очистка полей
    }

    function elementById(event) { //автозаполнение всех полей при установке id
        setGoodsId(event.target.value);
        const itemById = goods.filter(item => item.id === Number(event.target.value))[0]||false; //получение товара по соответствующему id или "фолс" если товар с id отсутствует
        if (itemById) { //заполнение всех полей данными товара с указанным id
            setGoodsName(itemById.name);
            setGoodsCost(itemById.cost);
            setGoodsCategory(itemById.category);
            setCheckedSizes(itemById.size);
            setGoodsImage(itemById.goodsImage[0].slice(11).slice(0, -6)); //обрезаем адрес картинки чтобы осталось только название папки для отображения картинки в примере (заморочка связана с удобством добавления)
            setImageCounter(itemById.goodsImage.length);
            setAdditional(itemById.additional);
        } else {
            clearAll(); //очистка всех полей при отсутствии товара с указаннм id
        }
    }

    return (
        <div className='adminPanel'>
            <h1>Панель адміністратора</h1>
            {accepted ?
            <div className='adminPanel__content'>
                <div className="adminPanel__bookmarkBlock">
                    {bookmarks.map(obj => <input key={obj} label={obj} type="radio" name="bookmark" onClick={() => setCheckedBookmark(obj)}/>)}
                </div>
                {checkedBookmark==='Товари'&&
                isLoad ? <div className="adminPanel__sectionGoods">
                    <div className="adminPanel__settings">
                        <h2>Опції товару</h2>
                        <div className="adminPanel__recomendIdBlock">
                            <h4>Рекомендований id: {bestId}</h4>
                            <button className='adminPanel__getIdBtn' onClick={findId}>Отримати Id</button>
                        </div>
                        <div className="adminPanel__idBlock">
                            <h4>Id:</h4>
                            <input className="adminPanel__id" type="number"
                                onChange={event => event.target.value>=1 && elementById(event)}
                                value={goodsId}
                            />
                            <p>(Останній Id: <b>{lastId}</b>)</p>
                        </div>
                        <div className="adminPanel__nameBlock">
                            <h4>Назва товару:</h4>
                            <input className="adminPanel__name" type="text" onChange={event => setGoodsName(event.target.value)} value={goodsName}/>
                        </div>
                        <div className="adminPanel__costBlock">
                            <h4>Ціна:</h4>
                            <input className="adminPanel__cost" type="number" onChange={event => setGoodsCost(Math.abs(event.target.value))} value={goodsCost}/>
                            <p>грн.</p>
                        </div>
                        <div className="adminPanel__categoryBlock">
                            <h4>Вид товару:</h4>
                            <select name="adminPanel__category" onChange={event => setGoodsCategory(event.target.value)} value={goodsCategory}>
                                <option value="Взуття">Взуття</option>
                                <option value="Одяг">Одяг</option>
                                <option value="Аксесуари">Аксесуари</option>
                            </select>
                        </div>
                        <div className="adminPanel__sizeBlock">
                            <h4>Розміри:</h4>
                            {goodsCategory!=='Аксесуари' && goodsSizesArr[goodsCategory==='Взуття' ? 1 : 0].map(obj => <section key={obj}>
                                <input type="checkbox" id={obj} value={obj} onChange={event => checkedSizesArr(event.target.value)} checked={checkedSizes.includes(obj) ? true : false}/>
                                <label className='unselectable' htmlFor={obj}>{obj}</label>
                            </section >)}
                        </div>
                        <div className="adminPanel__imageBlock">
                            <h4>Зображення:</h4>
                            <p>/img/goods/</p>
                            <input className="adminPanel__goodsImage" type="text" placeholder='Назва папки' onChange={event => setGoodsImage(event.target.value)} value={goodsImage}/>
                            <input className="adminPanel__count" type="number" onChange={event => event.target.value>=1 && setImageCounter(event.target.value)} value={imageCounter}/>
                        </div>
                        <div className="adminPanel__categoryBlock">
                            <h4>Додтково:</h4>
                            <select name="adminPanel__category" onChange={event => setAdditional(event.target.value)} value={additional}>
                                <option value=""></option>
                                <option value="Розпродаж">Розпродаж</option>
                                <option value="Нова колекція">Нова колекція</option>
                                <option value="Хіт продажів">Хіт продажів</option>
                            </select>
                        </div>
                        <div className="adminPanel_buttonBlock">
                            <button className='acceptButton'
                                onClick={postNewGoods}
                                disabled={goodsId&&goodsName&&goodsCost&&goodsCategory&&checkedSizes&&goodsImage ? false : true}
                            >Зберегти</button>
                            <button className='deleteButton'
                                onClick={deleteGoods}
                                disabled={goodsId ? false : true}
                            >{deleteFromCartSvg}</button>
                        </div>
                    </div>
                    <div className="adminPanel__example unselectable">
                        <h2>Зразок</h2>
                        <div className="example__content">
                            <div className="example__image">
                                <Carousel>
                                    {[...Array(Number(imageCounter)+1).keys()].slice(1).map(obj => <Carousel.Item key={obj}>
                                        <img
                                        className="h-100"
                                        src={'/img/goods/' + goodsImage + '/' + obj + '.jpg'}
                                        alt="Slider"
                                        />
                                    </Carousel.Item>)}
                                </Carousel>
                            </div>
                            <div className="example__order">
                                <div className="example__name">
                                    <h5>{goodsName}</h5>
                                </div>
                                <div className="example__cost">
                                    <p>Ціна: {goodsCost} грн.</p>
                                </div>
                                <div className="example__size">
                                    <p>Розмір:</p>
                                    <div className="example__size-option">
                                        {checkedSizes.map(obj => <input
                                            key={obj}
                                            label={obj}
                                            type="radio"
                                            name="size"
                                        />)}
                                    </div>
                                </div>
                                <div className="example__sizeHelp">
                                    {sizeSVG}
                                    <p>Як підібрати розмір?</p>
                                </div>
                                <div className="example__count">
                                    <p>Кількість:</p>
                                    <div className="example__counter">
                                        <div className="unselectable">-</div>
                                        1
                                        <div className="unselectable">+</div>
                                    </div>
                                </div>
                                <div className="example__accept">
                                    <div>Додати в кошик</div>
                                    <div>Купити в один клік</div>
                                </div>
                            </div>
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
            </div> :
            <div className='adminPanel__enterForm'>
                <div className="adminPanel__loginField">
                    <h4 className='unselectable'>Логін:</h4>
                    <input type="text" maxLength={12} value={login} onChange={event => setLogin(event.target.value)}/>
                </div>
                <div className="adminPanel__passwordField">
                    <h4 className='unselectable'>Пароль:</h4>
                    <input type="text" maxLength={12} value={password} onChange={event => setPassword(event.target.value)}/>
                </div>
                <button className='acceptButton' disabled={login&&password ? false : true} onClick={enter}>{login&&password ? 'Вхід' : 'Введіть дані'}</button>
            </div>}
        </div>
        
    );
}

export default Admin;
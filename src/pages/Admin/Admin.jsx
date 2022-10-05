import axios from 'axios';
import React from 'react';
import './Admin.css';

function Admin() {

    const loginData = [
        {login: 'immortal', password: '8171078'},
        {login: 'user', password: 'user'}
    ];
    const bookmarks = ['Товари', 'Розділіи', 'Акції', 'Банер'];
    const goodsSizesArr = [
        ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        ['38', '39', '40', '41', '42', '43', '44', '45']
    ];

    const [login, setLogin] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [accepted, setAccepted] = React.useState(false);

    const [isPosted, setIsPosted] = React.useState(false);

    const [checkedBookmark, setCheckedBookmark] = React.useState('Товари');

    const [goodsId, setGoodsId] = React.useState("");
    const [goodsName, setGoodsName] = React.useState("");
    const [goodsCost, setGoodsCost] = React.useState("");
    const [goodsCategory, setGoodsCategory] = React.useState("Кросівки");
    const [checkedSizes, setCheckedSizes] = React.useState([]);
    const [goodsImage, setGoodsImage] = React.useState("");

    const [goods, setGoods] = React.useState([0]);
    const [bestId, setBestId] = React.useState("______");
    const [lastId, setLastId] = React.useState("");
    const enter = () => {
        loginData.map(obj => obj.login===login&&obj.password===password && setAccepted(true));
    }

    React.useEffect(() => {
        async function getData() {
            try {
                await axios.get('https://632db5102cfd5ccc2af512de.mockapi.io/items').then(res => setGoods(res.data));
            } catch (error) {
                alert('Помилочка! Перезавантажте сторінку.');
            }
        }
        getData();
    }, [isPosted]);
    
    function findId() {
        const allId = goods.map(obj => Number(obj.id));
        const sortedId = allId.sort();
        const summ = allId.reduce(function(a, b) {return a + b;});
        const missedId = (allId.length+1)*(allId.length+2)/2 - summ;
        setBestId(missedId);
        setGoodsId(missedId);
        setLastId(sortedId[sortedId.length - 1]);
        console.log(sortedId);
    }
    function checkedSizesArr(item) {
        checkedSizes.find(size => size===item) ? 
            setCheckedSizes(checkedSizes.filter(size => size!==item)) :
            setCheckedSizes([...checkedSizes, item].sort());
    }
    const goodsItem = {
        id: goodsId,
        name: goodsName,
        cost: goodsCost,
        size: checkedSizes,
        goodsImage: `/img/goods/${goodsImage}.jpg`,
        goodsType: goodsCategory,
        group: ""
    }
    async function postNewGoods() {
        setIsPosted(true);
        try {
            await axios.post('https://632db5102cfd5ccc2af512de.mockapi.io/items', goodsItem);
        } catch(error) {
            alert('Помилочка! Перезавантажте сторінку.');
        }
        setGoodsId('');
        setGoodsName('');
        setGoodsCost('');
        setGoodsImage('');
        setIsPosted(false);
        console.log(goodsItem);
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
                <div className="adminPanel__sectionGoods">
                    <div className="adminPanel__settings">
                        <h2>Опції товару</h2>
                        <div className="adminPanel__recomendIdBlock">
                            <h4>Рекомендований id: {bestId}</h4>
                            <button className='adminPanel__getIdBtn' onClick={findId}>Отримати Id</button>
                        </div>
                        <div className="adminPanel__idBlock">
                            <h4>Id:</h4>
                            <input className="adminPanel__id" type="number" onChange={event => setGoodsId(event.target.value)} value={goodsId}/>
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
                            <select name="adminPanel__category" onChange={event => setGoodsCategory(event.target.options[event.target.selectedIndex].text)}>
                                <option value="1">Кросівки</option>
                                <option value="2">Одяг</option>
                                <option value="3">Аксесуари</option>
                            </select>
                        </div>
                        <div className="adminPanel__sizeBlock">
                            <h4>Розміри:</h4>
                            {goodsSizesArr[goodsCategory==='Кросівки' ? 1 : 0].map(obj => <section key={obj}>
                                <input type="checkbox" id={obj} value={obj} onClick={event => checkedSizesArr(event.target.value)}/>
                                <label className='unselectable' htmlFor={obj}>{obj}</label>
                            </section >)}
                        </div>
                        <div className="adminPanel__imageBlock">
                            <h4>Зображення товару:</h4>
                            <p>/img/goods/</p>
                            <input className="adminPanel__goodsImage" type="text" onChange={event => setGoodsImage(event.target.value)} value={goodsImage}/>
                        </div>
                        <button className='acceptButton'
                            onClick={postNewGoods}
                            disabled={!isPosted&&goodsId&&goodsName&&goodsCost&&goodsCategory&&checkedSizes&&goodsImage ? false : true}
                        >Додати</button>
                    </div>
                    <div className="adminPanel__example">
                        <h2>Зразок</h2>
                    </div>
                </div>}
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
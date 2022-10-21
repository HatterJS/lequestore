import React from "react";
import MultiRange from "../MultiRange/MultiRange";
import './filterBar.css'

function FilterBar(props) {
    const goodsSizesArr = [ //типы размеров для одежды/обуви...
        ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        ['38', '39', '40', '41', '42', '43', '44', '45']
    ];
    const [gender, setGender] = React.useState("");
    const goodsCostRangeRef = React.useRef([]);
    const [goodsCategory, setGoodsCategory] = React.useState("");
    const [checkedSizes, setCheckedSizes] = React.useState([""]);
    const [brands, setBrands] = React.useState("");

    function applyFilter() {
        const filterData = {
            cost: goodsCostRangeRef.current,
            category: goodsCategory,
            size: checkedSizes,
            gender: gender,
            brands: brands
        }
        props.applyFilter(filterData);
    }

    return (
        <React.Fragment>
            <div className="filterBar">
                <div className="filterBar__gender">
                    <h4>Категорія:</h4>
                    <div><input type="radio" name="gender" id="choice_0" value="Для всіх" onChange={() => setGender("")} defaultChecked/>
                    <label htmlFor="choice_0">для всіх</label></div>
                    <div><input type="radio" name="gender" id="choice_1" value="Унісекс" onChange={event => setGender(event.target.value)}/>
                    <label htmlFor="choice_1">унісекс</label></div>
                    <div><input type="radio" name="gender" id="choice_2" value="Для чоловіків" onChange={event => setGender(event.target.value)}/>
                    <label htmlFor="choice_2">для чоловіків</label></div>
                    <div><input type="radio" name="gender" id="choice_3" value="Для жінок" onChange={event => setGender(event.target.value)}/>
                    <label htmlFor="choice_3">для жінок</label></div>
                </div>
                <div className="filterBar__cost">
                    <h4>Ціновий діапазон:</h4>
                    <MultiRange
                    min = {0}
                    max = {5000}
                    minRange = {100}
                    onChange={({ min, max }) => goodsCostRangeRef.current = [min, max]}
                    />
                </div>
                <div className="filterBar__sizeBlock">
                    <div className="filterBar__categoryBlock">
                        <h4>Розмір:</h4>
                        <select name="filterBar__category" onChange={(event) => {setGoodsCategory(event.target.value); setCheckedSizes('')}} value={goodsCategory}>
                            <option value=""></option>
                            <option value="Взуття">Взуття</option>
                            <option value="Одяг">Одяг</option>
                            <option value="Аксесуари">Аксесуари</option>
                        </select>
                    </div>
                    <div className="filterBar__size">
                        <div className="filterBar__size-option">
                            {(goodsCategory!=='Аксесуари'&&goodsCategory!=='') && (goodsSizesArr[goodsCategory==='Взуття' ? 1 : 0].map(obj =>
                                <input
                                    key = {obj}
                                    id = {obj}
                                    label = {obj}
                                    type = "radio"
                                    name = "size"
                                    onClick = {() => setCheckedSizes(obj)}
                                />))}
                        </div>
                    </div>
                </div>
                <div className="filterBar__brandsBlock">
                    <h4>Бренд:</h4>
                    <select name="filterBar__brands" onChange={event => setBrands(event.target.value)} value={brands}>
                        <option value=""></option>
                        <option value="Adidas">Adidas</option>
                        <option value="Nike">Nike</option>
                        <option value="Balenciaga">Balenciaga</option>
                        <option value="Fila">Fila</option>
                    </select>
                </div>
                <button className="acceptButton" onClick={applyFilter}>OK</button>
            </div>
        </React.Fragment>
    );
}

export default FilterBar;
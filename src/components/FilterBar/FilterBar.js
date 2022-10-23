import React from "react";
import MultiRange from "../MultiRange/MultiRange";
import './filterBar.css'

const x = <svg width="15" height="15" viewBox="0 0 13 13" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M9.63173 0.43934C10.2175 -0.146447 11.1673 -0.146447 11.753 0.43934C12.3388 1.02513 12.3388 1.97487 11.753 2.56066L8.27818 6.03553L11.8744 9.63173C12.4602 10.2175 12.4602 11.1673 11.8744 11.753C11.2886 12.3388 10.3388 12.3388 9.75305 11.753L6.15686 8.15685L2.56066 11.753C1.97487 12.3388 1.02513 12.3388 0.43934 11.753C-0.146447 11.1673 -0.146447 10.2175 0.43934 9.63173L4.03554 6.03553L0.560663 2.56066C-0.0251234 1.97487 -0.0251234 1.02513 0.560663 0.43934C1.14645 -0.146447 2.0962 -0.146447 2.68198 0.43934L6.15686 3.91421L9.63173 0.43934Z" fill="#858585"/>
</svg>
const v = <svg width="20" height="18" viewBox="0 0 20 18" fill="none">
    <path d="M18 2L9.52866 15.1306C9.18323 15.666 8.43183 15.7461 7.98126 15.2955L2 9.31429" stroke="#858585" strokeOpacity="0.9" strokeWidth="4" strokeLinecap="round"/>
</svg>

function FilterBar(props) {
    const goodsSizesArr = [ //типы размеров для одежды/обуви...
        ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        ['38', '39', '40', '41', '42', '43', '44', '45']
    ];
    const filterData = JSON.parse(localStorage.getItem('filter'));
    const [gender, setGender] = React.useState(filterData.gender);
    const goodsCostRangeRef = React.useRef(filterData.cost);
    const [goodsCategory, setGoodsCategory] = React.useState(filterData.category);
    const [checkedSizes, setCheckedSizes] = React.useState(filterData.size);
    const [brands, setBrands] = React.useState(filterData.brands);

    function applyFilter() {
        const filterData = {
            cost: goodsCostRangeRef.current,
            category: goodsCategory,
            size: checkedSizes,
            gender: gender,
            brands: brands
        }
        localStorage.setItem('filter', JSON.stringify(filterData));
        props.applyFilter(filterData);
        props.showFilter();
    }

    function dropFilter() {
        props.showFilter();
        props.dropFilter();
        props.dropLimit();
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
                <div className="filterBar__buttonsBlock">
                    <button className="acceptButton" onClick={applyFilter}>{v}</button>
                    <button className="cancelButton" onClick={dropFilter}>{x}</button>
                </div>
            </div>
        </React.Fragment>
    );
}

export default FilterBar;
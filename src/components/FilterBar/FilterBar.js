import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, resetFilter } from '../../redux/slices/filterSlice';
import MultiRange from '../MultiRange/MultiRange';
import SizeBlock from './SizeBlock';
import './filterBar.css';

const x = (
  <svg width="15" height="15" viewBox="0 0 13 13" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.63173 0.43934C10.2175 -0.146447 11.1673 -0.146447 11.753 0.43934C12.3388 1.02513 12.3388 1.97487 11.753 2.56066L8.27818 6.03553L11.8744 9.63173C12.4602 10.2175 12.4602 11.1673 11.8744 11.753C11.2886 12.3388 10.3388 12.3388 9.75305 11.753L6.15686 8.15685L2.56066 11.753C1.97487 12.3388 1.02513 12.3388 0.43934 11.753C-0.146447 11.1673 -0.146447 10.2175 0.43934 9.63173L4.03554 6.03553L0.560663 2.56066C-0.0251234 1.97487 -0.0251234 1.02513 0.560663 0.43934C1.14645 -0.146447 2.0962 -0.146447 2.68198 0.43934L6.15686 3.91421L9.63173 0.43934Z"
      fill="#858585"
    />
  </svg>
);
const v = (
  <svg width="20" height="18" viewBox="0 0 20 18" fill="none">
    <path
      d="M18 2L9.52866 15.1306C9.18323 15.666 8.43183 15.7461 7.98126 15.2955L2 9.31429"
      stroke="#858585"
      strokeOpacity="0.9"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </svg>
);

function FilterBar() {
  //dispatch for Redux
  const dispatch = useDispatch();
  //get filter from Redux
  const { filter } = useSelector((state) => state.filter);
  const filterData = JSON.parse(JSON.stringify(filter));

  const goodsSizesArr = [
    //типы размеров для одежды/обуви...
    ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    ['38', '39', '40', '41', '42', '43', '44', '45']
  ];
  const categories = [
    { value: '', id: 'gender_0', label: 'для всіх' },
    { value: 'Унісекс', id: 'gender_1', label: 'унісекс' },
    { value: 'Для чоловіків', id: 'gender_2', label: 'для чоловіків' },
    { value: 'Для жінок', id: 'gender_3', label: 'для жінок' }
  ];
  const brandsOptions = ['', 'Adidas', 'Nike', 'Balenciaga', 'Fila'];

  function applyFilter() {
    dispatch(setFilter(filterData));
    console.log(filterData);
  }

  return (
    <React.Fragment>
      <div className="filterBar">
        <div className="filterBar__gender">
          <h4>Категорія:</h4>
          {categories.map((item) => (
            <div key={item.label}>
              <input
                type="radio"
                name="gender"
                id={item.id}
                value={item.value}
                onChange={(event) => (filterData.gender = event.target.value)}
                defaultChecked={item.value === filterData.gender}
              />
              <label htmlFor={item.id}>{item.label}</label>
            </div>
          ))}
        </div>
        <div className="filterBar__cost">
          <h4>Ціновий діапазон:</h4>
          <MultiRange
            min={0}
            max={5000}
            minRange={100}
            onChange={({ min, max }) => (filterData.cost = [min, max])}
          />
        </div>
        <SizeBlock filterData={filterData} goodsSizesArr={goodsSizesArr} />
        <div className="filterBar__brandsBlock">
          <h4>Бренд:</h4>
          <select
            name="filterBar__brands"
            onChange={(event) => (filterData.brands = event.target.value)}>
            {brandsOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="filterBar__buttonsBlock">
          <button className="acceptButton" onClick={applyFilter}>
            {v}
          </button>
          <button className="cancelButton" onClick={() => dispatch(resetFilter())}>
            {x}
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default FilterBar;

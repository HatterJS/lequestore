import React from 'react';

function SizeBlock({ filterData, goodsSizesArr }) {
  const [goodsCategory, setGoodsCategory] = React.useState(filterData.category);

  return (
    <div className="filterBar__sizeBlock">
      <div className="filterBar__categoryBlock">
        <h4>Розмір:</h4>
        <select
          name="filterBar__category"
          onChange={(event) => {
            setGoodsCategory(event.target.value);
            filterData.category = event.target.value;
            filterData.size = '';
          }}
          value={goodsCategory}>
          <option value=""></option>
          <option value="Взуття">Взуття</option>
          <option value="Одяг">Одяг</option>
          <option value="Аксесуари">Аксесуари</option>
        </select>
      </div>
      <div className="filterBar__size">
        <div className="filterBar__size-option">
          {goodsCategory !== 'Аксесуари' &&
            goodsCategory !== '' &&
            goodsSizesArr[goodsCategory === 'Взуття' ? 1 : 0].map((obj) => (
              <input
                key={obj}
                id={obj}
                label={obj}
                type="radio"
                name="size"
                onClick={() => (filterData.size = obj)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default SizeBlock;

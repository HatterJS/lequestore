import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch } from '../../redux/slices/filterSlice';

import './index.css';

const hotOffersArr = [
  { name: 'all', text: 'Всі пропозиції' },
  { name: 'sale', text: 'Розпродаж' },
  { name: 'new', text: 'Нова колекція' },
  { name: 'top', text: 'Хіт продажів' }
];

function HotOffersBar() {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => state.filter);

  return (
    <ul className="content__hotOffers unselectable">
      {hotOffersArr.map((item) => (
        <li
          key={item.text}
          className={item.text === search ? 'content_activeHotOffers' : ''}
          onClick={() => dispatch(setSearch(item.text))}>
          {item.text}
        </li>
      ))}
    </ul>
  );
}

export default HotOffersBar;

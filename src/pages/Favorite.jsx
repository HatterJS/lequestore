import React from 'react';
import Empty from '../components/Empty';
import AddedItem from '../components/AddedItem';
import { useSelector } from 'react-redux';

function Favorite() {
  //get favorites from redux
  const { favorite } = useSelector((state) => state.favorite);

  return (
    <div className="favorite__content">
      <h1>ОБРАНЕ</h1>
      <div className="favorite__itemsBlock">
        {favorite.map((obj) => (
          <AddedItem key={obj.id} {...obj} location="favorite" />
        ))}
      </div>
      <div
        className="favorite__content-emptyCart emptyCart"
        style={{ display: favorite.length ? 'none' : 'flex' }}>
        <Empty></Empty>
      </div>
    </div>
  );
}

export default Favorite;

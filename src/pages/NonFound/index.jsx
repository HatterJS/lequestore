import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

function NotFound() {
  return (
    <div className="empty unselectable">
      <h3>Ой-ой! Щось пішло не так!</h3>
      <img src="../img/wrongPath.png" alt="empty" />
      <p>Нажаль Ви трохи заблукали</p>
      <Link to="/">
        <button className="acceptButton">Повернутись до кращого місця</button>
      </Link>
    </div>
  );
}

export default NotFound;

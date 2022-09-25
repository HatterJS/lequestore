import React from 'react';

function Address(props) {

    return(
        <address>
            <div className="addressBlock">
            <a href="./"><img src='/img/logo.webp' alt="Lequestore" /></a>
            <div className="addressBlock__schedule">
                <p>Графік роботи:</p>
                <p>Пн-Пт / 10.00 - 19.00</p>
                <p>Сб / 11.00 - 16.00</p>
            </div>
            <div className="addressBlock__contacts">
                <p>Контакти:</p>
                <p>066 0469 277 - Телеграм</p>
                <p>067 9766 777 - Вайбер</p>
            </div>
            <div className="addressBlock__cartBlock">
                <div className='addressBlock__cart' onClick={props.onClickCart}>
                    <svg width="37" height="51" fill="none">
                        <mask id="path-1-inside-1_34_8" fill="white">
                        <path d="M0 15C0 14.4477 0.447715 14 1 14H36C36.5523 14 37 14.4477 37 15V46C37 48.7614 34.7614 51 32 51H5C2.23858 51 0 48.7614 0 46V15Z"/>
                        </mask>
                        <path d="M0 15C0 14.4477 0.447715 14 1 14H36C36.5523 14 37 14.4477 37 15V46C37 48.7614 34.7614 51 32 51H5C2.23858 51 0 48.7614 0 46V15Z" fill="#FFE500" stroke="#404040" strokeWidth="6" mask="url(#path-1-inside-1_34_8)"/>
                        <path d="M10 18.5V11C10 6.02944 14.0294 2 19 2C23.9706 2 28 6.02944 28 11V18.5" stroke="#404040" strokeWidth="3" strokeLinecap="round"/>
                        <line x1="9.5" y1="43.5" x2="28.5" y2="43.5" stroke="#404040" strokeWidth="3" strokeLinecap="round"/>
                    </svg>
                    <div className="addressBlock__cartCounter">
                        <p>{props.itemsCartCounter}</p>
                    </div>
                </div>
                <div>
                <p>0 грн.</p>
                <a href="./">Оформлення замовлення</a>
                </div>
            </div>
            </div>
        </address>
    );
}

export default Address;
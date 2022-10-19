
import React from 'react';

const arrowSVG = <svg width="12" height="7" viewBox="0 0 12 7">
<path d="M1 1L6.26316 6L11 1" stroke="#404040" fill="none"/></svg>

function NavBar(props) {
    
    const onChangeSearchInput = (event) => {
        event.target.value ? props.onChangeSearch(event.target.value) : props.onChangeSearch('');
        props.setCategory(""); //сброс категории для поиска по всем товарам
    }

    function goodsFilter (event, category) {
        props.setCategory(category); //добавить в фильтр категорию Одяг/Взуття
        props.onChangeSearch(event.target.innerText); //фильтр по бренду/гендеру
    }

    return(
        <nav>
            <div className="navBar">
            <ul className="navBar__main-menu dropdown unselectable">
                <li>ОДЯГ{arrowSVG}
                <ul onClick={event => goodsFilter(event, 'Одяг')}>
                    <li>Унісекс</li>
                    <li>Для чоловіків</li>
                    <li>Для жінок</li>
                </ul>
                </li>
                <li>ВЗУТТЯ{arrowSVG}
                <ul onClick={event => goodsFilter(event, 'Взуття')}>
                    <li>Adidas</li>
                    <li>Nike</li>
                    <li>Balenciaga</li>
                    <li>Prada</li>
                    <li>Puma</li>
                    <li>Fila</li>
                    <li>Reebok</li>
                    <li>Alexander Mcqueen</li>
                    <li>Native</li>
                </ul>
                </li>
                <li>ДЛЯ ЧОЛОВІКІВ{arrowSVG}
                <ul>
                    <li>Adidas</li>
                    <li>Nike</li>
                    <li>Off-white</li>
                    <li>Prada</li>
                    <li>Puma</li>
                    <li>Fila</li>
                    <li>Reebok</li>
                    <li>Alexander Mcqueen</li>
                    <li>Native</li>
                </ul>
                </li>
                <li>ДЛЯ ЖІНОК{arrowSVG}
                <ul>
                    <li>Adidas</li>
                    <li>Nike</li>
                    <li>Off-white</li>
                    <li>Prada</li>
                    <li>Puma</li>
                    <li>Fila</li>
                    <li>Reebok</li>
                    <li>Alexander Mcqueen</li>
                    <li>Native</li>
                </ul>
                </li>
                <li>АКСЕСУАРИ{arrowSVG}
                <ul>
                    <li>Шкарпетки</li>
                    <li>Чохли</li>
                    <li>Біжутерія</li>
                    <li>Фігурки</li>
                </ul>
                </li>
            </ul>
            <div className='navBar__searchForm'>
                <input onChange={onChangeSearchInput} name='search' placeholder='Пошук...' type="search" maxLength={40} />
                <div className='navBar__searchIco'>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M9.45083 11.293C7.12325 12.948 3.87379 12.732 1.78682 10.645C-0.541063 8.31714 -0.541063 4.54289 1.78682 2.21501C4.11471 -0.112876 7.88895 -0.112876 10.2168 2.21501C12.3037 4.30189 12.5198 7.55115 10.865 9.87871L14.7114 13.7251C15.1019 14.1156 15.1019 14.7488 14.7114 15.1393C14.3209 15.5298 13.6877 15.5298 13.2972 15.1393L9.45083 11.293ZM8.80263 9.23081C7.25579 10.7776 4.74787 10.7776 3.20104 9.23081C1.6542 7.68398 1.6542 5.17606 3.20104 3.62922C4.74787 2.08239 7.25579 2.08239 8.80263 3.62922C10.3495 5.17606 10.3495 7.68398 8.80263 9.23081Z" fill="white"/>
                    </svg>
                </div>
            </div>
            </div>
        </nav>
    )
}

export default NavBar;
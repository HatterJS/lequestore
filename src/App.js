import './css/App.css';
import logo from './img/logo.webp';
import banner from './img/banner-slider/banner_01.jpg'

const arrowSVG = <svg width="12" height="7" viewBox="0 0 12 7">
<path d="M1 1L6.26316 6L11 1" stroke="#404040" fill="none"/></svg>

function App() {
  return (
    <div className='wrapper'>
      <header>
        <div className='topBar'>
          <ul className='topBar__mainMenu'>
            <li><a href='./'>Про магазин</a></li>
            <li><a href='./'>Доставка і оплата</a></li>
            <li><a href='./'>Підібрати розмір</a></li>
            <li><a href='./'>Обмін і повернення</a></li>
            <li><a href='./'>FAQ</a></li>
            <li><a href='./'>Контакти</a></li>
          </ul>
          <ul className='topBar__social'>
            <li>Приєднуйтесь:</li>
            <li>
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                <svg width="25" height="25" viewBox="0 0 25 25">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M17 3H8C5.23858 3 3 5.23858 3 8V17C3 19.7614 5.23858 22 8 22H17C19.7614 22 22 19.7614 22 17V8C22 5.23858 19.7614 3 17 3ZM8 0C3.58172 0 0 3.58172 0 8V17C0 21.4183 3.58172 25 8 25H17C21.4183 25 25 21.4183 25 17V8C25 3.58172 21.4183 0 17 0H8ZM13 10.5C11.6193 10.5 10.5 11.6193 10.5 13C10.5 14.3807 11.6193 15.5 13 15.5C14.3807 15.5 15.5 14.3807 15.5 13C15.5 11.6193 14.3807 10.5 13 10.5ZM7.5 13C7.5 9.96243 9.96243 7.5 13 7.5C16.0376 7.5 18.5 9.96243 18.5 13C18.5 16.0376 16.0376 18.5 13 18.5C9.96243 18.5 7.5 16.0376 7.5 13ZM18.5 8C19.3284 8 20 7.32843 20 6.5C20 5.67157 19.3284 5 18.5 5C17.6716 5 17 5.67157 17 6.5C17 7.32843 17.6716 8 18.5 8Z"/>
                </svg>
              </a>
            </li>
            <li>
              <a href="https://web.telegram.org/" target="_blank" rel="noreferrer">
                <svg width="29" height="26" viewBox="0 0 29 26">
                  <path d="M8 15L10.4529 24.3209C10.4731 24.3978 10.5707 24.4215 10.6239 24.3623L14.9395 19.5672C14.9738 19.5291 15.0315 19.5231 15.0729 19.5535L21.2467 24.0809C21.8334 24.5112 22.6686 24.1907 22.817 23.4784L27.1199 2.82463C27.2826 2.04366 26.5102 1.39593 25.7695 1.6922L2.39639 11.0414C1.5484 11.3806 1.5615 12.5856 2.41666 12.9062L8 15ZM8 15L21.346 7.85035C21.4488 7.79531 21.5466 7.93072 21.4621 8.011L12.2648 16.7484C12.0938 16.9109 11.9857 17.1286 11.9597 17.363L11.5 21.5" stroke-width="2.5" stroke-linecap="round"/>
                </svg>
              </a>
            </li>
          </ul>
          <ul className="topBar__language dropdown">
            <li><span>Укр.</span>{arrowSVG}
              <ul>
                <li>Укр.</li>
                <li>Рус.</li>
              </ul>
            </li>
          </ul>
        </div>
      </header>
      <address>
        <div className="addressBlock">
          <img src={logo} alt="Lequestore" />
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
            <div>
              <svg width="37" height="51" fill="none">
                <mask id="path-1-inside-1_34_8" fill="white">
                  <path d="M0 15C0 14.4477 0.447715 14 1 14H36C36.5523 14 37 14.4477 37 15V46C37 48.7614 34.7614 51 32 51H5C2.23858 51 0 48.7614 0 46V15Z"/>
                </mask>
                <path d="M0 15C0 14.4477 0.447715 14 1 14H36C36.5523 14 37 14.4477 37 15V46C37 48.7614 34.7614 51 32 51H5C2.23858 51 0 48.7614 0 46V15Z" stroke="#404040" stroke-width="6" mask="url(#path-1-inside-1_34_8)"/>
                <path d="M10 18.5V11C10 6.02944 14.0294 2 19 2C23.9706 2 28 6.02944 28 11V18.5" stroke="#404040" stroke-width="3" stroke-linecap="round"/>
                <line x1="9.5" y1="43.5" x2="28.5" y2="43.5" stroke="#404040" stroke-width="3" stroke-linecap="round"/>
              </svg>
              <div className="addressBlock__cartCounter">
                <p>0</p>
              </div>
            </div>
            <div>
              <p>0 грн.</p>
              <a href="./">Оформлення замовлення</a>
            </div>
          </div>
        </div>
      </address>
      <nav>
        <div className="navBar">
          <ul className="navBar__main-menu dropdown">
            <li>ОДЯГ{arrowSVG}
              <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
              </ul>
            </li>
            <li>ВЗУТТЯ{arrowSVG}
              <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
              </ul>
            </li>
            <li>ДЛЯ ЧОЛОВІКІВ{arrowSVG}
              <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
              </ul>
            </li>
            <li>ДЛЯ ЖІНОК{arrowSVG}
              <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
              </ul>
            </li>
            <li>АКСЕСУАРИ{arrowSVG}
              <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
              </ul>
            </li>
          </ul>
          <form className='navBar__searchForm' action="" method='get'>
            <input name='search' placeholder='Пошук...' type="search" />
            <button type='submit'>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.45083 11.293C7.12325 12.948 3.87379 12.732 1.78682 10.645C-0.541063 8.31714 -0.541063 4.54289 1.78682 2.21501C4.11471 -0.112876 7.88895 -0.112876 10.2168 2.21501C12.3037 4.30189 12.5198 7.55115 10.865 9.87871L14.7114 13.7251C15.1019 14.1156 15.1019 14.7488 14.7114 15.1393C14.3209 15.5298 13.6877 15.5298 13.2972 15.1393L9.45083 11.293ZM8.80263 9.23081C7.25579 10.7776 4.74787 10.7776 3.20104 9.23081C1.6542 7.68398 1.6542 5.17606 3.20104 3.62922C4.74787 2.08239 7.25579 2.08239 8.80263 3.62922C10.3495 5.17606 10.3495 7.68398 8.80263 9.23081Z" fill="white"/>
              </svg>
            </button>
          </form>
        </div>
      </nav>
      <div className="content">
        <div className="content__banner-slider">
          <img src={banner} alt="banner" />
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;

import './css/App.css';
import './img/icons/instagram.svg';
import './img/icons/telegram.svg';

function App() {
  return (
    <div className="wrapper">
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
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer"><svg width="25" height="25" viewBox="0 0 25 25">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M17 3H8C5.23858 3 3 5.23858 3 8V17C3 19.7614 5.23858 22 8 22H17C19.7614 22 22 19.7614 22 17V8C22 5.23858 19.7614 3 17 3ZM8 0C3.58172 0 0 3.58172 0 8V17C0 21.4183 3.58172 25 8 25H17C21.4183 25 25 21.4183 25 17V8C25 3.58172 21.4183 0 17 0H8ZM13 10.5C11.6193 10.5 10.5 11.6193 10.5 13C10.5 14.3807 11.6193 15.5 13 15.5C14.3807 15.5 15.5 14.3807 15.5 13C15.5 11.6193 14.3807 10.5 13 10.5ZM7.5 13C7.5 9.96243 9.96243 7.5 13 7.5C16.0376 7.5 18.5 9.96243 18.5 13C18.5 16.0376 16.0376 18.5 13 18.5C9.96243 18.5 7.5 16.0376 7.5 13ZM18.5 8C19.3284 8 20 7.32843 20 6.5C20 5.67157 19.3284 5 18.5 5C17.6716 5 17 5.67157 17 6.5C17 7.32843 17.6716 8 18.5 8Z" />
              </svg></a>
            </li>
            <li>
              <a href="https://web.telegram.org/" target="_blank" rel="noreferrer"><svg width="29" height="26" viewBox="0 0 29 26">
                <path d="M8 15L10.4529 24.3209C10.4731 24.3978 10.5707 24.4215 10.6239 24.3623L14.9395 19.5672C14.9738 19.5291 15.0315 19.5231 15.0729 19.5535L21.2467 24.0809C21.8334 24.5112 22.6686 24.1907 22.817 23.4784L27.1199 2.82463C27.2826 2.04366 26.5102 1.39593 25.7695 1.6922L2.39639 11.0414C1.5484 11.3806 1.5615 12.5856 2.41666 12.9062L8 15ZM8 15L21.346 7.85035C21.4488 7.79531 21.5466 7.93072 21.4621 8.011L12.2648 16.7484C12.0938 16.9109 11.9857 17.1286 11.9597 17.363L11.5 21.5" stroke-width="2.5" stroke-linecap="round"/>
              </svg></a>
            </li>
          </ul>
          <ul className="dropdownMenu">
            <li>
              <span>Укр.</span>
              <svg width="12" height="7" viewBox="0 0 12 7" fill="none">
                <path d="M1 1L6.26316 6L11 1" stroke="#404040"/>
              </svg>
              <ul>
                <li>Укр.</li>
                <li>Рус.</li>
              </ul>
            </li>
          </ul>
        </div>
      </header>
      <nav>
        <div className="navBar">
          <ul>
            <li>
              <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
              </ul>
            </li>
            <li>
              <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
              </ul>
            </li>
            <li>
              <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
              </ul>
            </li>
            <li>
              <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
              </ul>
            </li>
            <li>
              <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default App;

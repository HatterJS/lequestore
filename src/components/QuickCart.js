import switshot_01 from '../img/goods/switshot_01.jpg';
import sneakers_003 from '../img/goods/sneakers_003.jpg';

const deleteFromCart = <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <rect width="40" height="40" rx="10" fill="white" fill-opacity="0.25"/>
    <rect x="0.5" y="0.5" width="39" height="39" rx="9.5" stroke="black" stroke-opacity="0.3"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M23.2504 26.0279L24.3111 27.0885L26.4324 24.9672L25.3717 23.9065L22.6735 21.2083L25.9336 17.9482L26.9942 16.8875L24.8729 14.7662L23.8123 15.8269L20.5522 19.087L17.5936 16.1284L16.5329 15.0677L14.4116 17.189L15.4723 18.2497L18.4308 21.2083L15.327 24.3121L14.2663 25.3728L16.3876 27.4941L17.4483 26.4335L20.5522 23.3296L23.2504 26.0279Z" fill="black" fill-opacity="0.3"/>
</svg>

function QuickCart() {
    return(
        <div className="quickCart" style={{display: 'none'}}>
        <div className="quickCart__shadow">
          <div className="quickCart__content">
            <h4>АКТИВНІ ЗАМОВЛЕННЯ</h4>
            <div className="quickCart__itemsBlock">
              <div className="quickCart__item">
                <div><img src={sneakers_003} alt="sneakers" /></div>
                <div className='quickCart__description'>
                  <p>Кросівкі adidas Yeezy Boost 350 V2 Ash Stone</p>
                  <p>2 599 грн.</p>
                </div>
                <div>{deleteFromCart}</div>
              </div>
              <div className="quickCart__item">
                <div><img src={switshot_01} alt="sneakers" /></div>
                <div className='quickCart__description'>
                  <p>Худи Balenciaga yellow</p>
                  <p>1 250 грн.</p>
                </div>
                <div>{deleteFromCart}</div>
              </div>
            </div>
            <div className='quickCart__total'>
              <p>Всього:</p>
              <p>3 849 грн.</p>
            </div>
            <button className='acceptButton'>Оформити замовлення</button>
            <button className='acceptButton' style={{background: 'none'}}>Продовжити покупки</button>
          </div>
        </div>
      </div>
    )
}

export default QuickCart;
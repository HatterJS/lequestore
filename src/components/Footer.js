import { Link } from 'react-router-dom';

function Footer() {
    return(
        <footer>
            <div className="footer">
                <ul>
                    <li>Наші контакти</li>
                    <li>066 0469 277 - Телеграм</li>
                    <li>067 9766 777 - Вайбер</li>
                    <li>Пн-Пт / 10.00 - 19.00</li>
                    <li>Сб / 11.00 - 16.00</li>
                </ul>
                <ul>
                    <li>Каталог</li>
                    <li>Одяг</li>
                    <li>Взуття</li>
                    <li>Для чоловіків</li>
                    <li>Для жінок</li>
                    <li>Аксесуари</li>
                </ul>
                <ul>
                    <li>Клієнтам</li>
                    <li>Про магазин</li>
                    <li>Доставка і оплата</li>
                    <li>Підібрати розмір</li>
                    <li>Обмін і повернення</li>
                    <li>FAQ</li>
                </ul>
                <ul>
                    <li>Наші бренди</li>
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
            </div>
            <div className="footer__ovner"><Link to='/admin'>Admin</Link></div>
        </footer>
    )
}

export default Footer;
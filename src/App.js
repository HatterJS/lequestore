import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Home from './pages/Home/Home';
import Favorite from './pages/Favorite';
import Order from './pages/Order';
import GoodsCard from './pages/GoodsCard';
import Information from './pages/Information/Information';
import Admin from './pages/Admin/Admin';
import Header from './components/Header';
import QuickCart from './components/QuickCart';
import Address from './components/Address';
import Footer from './components/Footer';
import NotFound from './pages/NonFound';
import './css/App.css';

function App() {
  const [goods, setGoods] = React.useState([]); //отображение товаров на главной (пагинация)
  const [allGoods, setAllGoods] = React.useState([]); //перечень всех товаров
  //get filter from Redux
  const { filter } = useSelector((state) => state.filter);

  const [itemLimit, setItemLimit] = React.useState(9);

  const [isLoad, setIsLoad] = React.useState(false);

  React.useEffect(() => {
    //подгрузка товаров с учетом фильтрации и пагинации
    async function getData() {
      try {
        await axios
          .post(`http://185.237.204.125:9999/goods?page=1&limit=${itemLimit}`, filter)
          .then((res) => setGoods(res.data));
        setIsLoad(true);
      } catch (error) {
        alert('Помилочка! Перезавантажте сторінку.');
      }
    }
    getData();
  }, [itemLimit, filter]);

  React.useEffect(() => {
    //загрузка всех товаров с бека для поиска и акционных предложений
    async function getData() {
      try {
        await axios.get(`http://185.237.204.125:9999/goods`).then((res) => setAllGoods(res.data));
      } catch (error) {
        alert('Помилочка! Перезавантажте сторінку.');
      }
    }
    getData();
  }, []);

  return (
    <div className="wrapper">
      <QuickCart />
      <Header />
      <Address />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              goods={goods}
              allGoods={allGoods}
              isLoad={isLoad}
              setItemLimit={(value) => setItemLimit(value)}
            />
          }
        />
        <Route path="/favorite" element={<Favorite />}></Route>
        <Route path="/order" element={<Order />}></Route>
        <Route path="/goods-card/:id" element={<GoodsCard />}></Route>
        <Route path="/information/:id" element={<Information />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

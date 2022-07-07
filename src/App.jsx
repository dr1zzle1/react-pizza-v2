import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Cart from './pages/Cart';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import './scss/app.scss';

function App() {
  const [searchText, setSearchText] = useState('');
  return (
    <div className="wrapper">
      <Header searchText={searchText} setSearchText={setSearchText} />
      <div className="content">
        <Routes>
          <Route path="/">
            <Route index element={<Home searchText={searchText} />} />
            <Route path="cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;

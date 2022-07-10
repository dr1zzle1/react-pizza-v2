import { createContext, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Cart from './pages/Cart';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import './scss/app.scss';

export const SearchContext = createContext();

function App() {
  const [searchText, setSearchText] = useState('');
  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchText, setSearchText }}>
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
      </SearchContext.Provider>
    </div>
  );
}

export default App;

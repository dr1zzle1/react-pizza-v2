import qs from 'qs';
import React, { useContext, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SearchContext } from '../App';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSkelet from '../components/PizzaBlock/PizzaSkelet';
import Sort, { list } from '../components/Sort';
import {
  setActivePage,
  setCategory,
  setFilters,
  setSortProperty,
} from '../redux/slices/filterSlice';
import { useNavigate } from 'react-router-dom';
import { fetchPizzas } from '../redux/slices/pizzaSlice';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { activeCategory, sortProperty, activePage } = useSelector((state) => state.filter);
  const { status, items } = useSelector((state) => state.pizza);

  const { searchText } = useContext(SearchContext);

  const category = activeCategory ? `&category=${activeCategory}` : '';
  const sort = `sortBy=${sortProperty.sort}`;

  const filteredPizzas = items
    .filter((pizza) => pizza.name.toLowerCase().includes(searchText.toLowerCase()))
    .map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);

  useEffect(() => {
    if (window.location.search) {
      const query = qs.parse(window.location.search.slice(1));
      const sort = list.find((obj) => obj.sort === query.sortProperty);
      dispatch(setFilters({ ...query, sortProperty: sort }));
      isSearch.current = true;
    }
  }, [dispatch]);

  useEffect(() => {
    if (!isSearch.current) {
      dispatch(fetchPizzas({ sort, category, activePage }));
      window.scrollTo(0, 0);
    }
    isSearch.current = false;
  }, [category, sort, activePage, dispatch]);

  useEffect(() => {
    if (isMounted.current) {
      const link = qs.stringify({
        activeCategory: activeCategory,
        sortProperty: sortProperty.sort,
        activePage,
      });
      navigate(`?${link}`);
    }
    isMounted.current = true;
  }, [activeCategory, sortProperty, activePage, navigate]);

  if (status === 'error') {
    return (
      <div className="container">
        <div className="content__error">
          <h1>Произошла ошибка 😕</h1>
          <span>Попробуйте перезагрузить страницу или повторить попытку позже</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={activeCategory} onChangeValue={(id) => dispatch(setCategory(id))} />
        <Sort
          activeSortProperty={sortProperty}
          onChangeSortProperty={(obj) => dispatch(setSortProperty(obj))}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {status === 'loading'
          ? [...new Array(6)].map((_, i) => <PizzaSkelet key={i} />)
          : filteredPizzas}
      </div>
      {status === 'success' && (
        <Pagination
          pageSize={6}
          itemCount={10}
          activePage={activePage}
          setActivePage={(num) => dispatch(setActivePage(num))}
        />
      )}
    </div>
  );
};

export default Home;

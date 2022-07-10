import axios from 'axios';
import qs from 'qs';
import React, { useContext, useEffect, useRef, useState } from 'react';
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

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { activeCategory, sortProperty, activePage } = useSelector((state) => state.filter);
  const { searchText } = useContext(SearchContext);
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const category = activeCategory ? `&category=${activeCategory}` : '';
  const sort = `sortBy=${sortProperty.sort}`;

  const filteredPizzas = pizzas
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
      setIsLoading(true);
      axios
        .get(
          `https://62c160f7eff7f7856f0d3c98.mockapi.io/pizzas/pizzas?${sort}${category}&p=${activePage}&l=6`,
        )
        .then((res) => {
          setPizzas(res.data);
          setIsLoading(false);
          window.scrollTo(0, 0);
        });
    }
    isSearch.current = false;
  }, [category, sort, activePage]);

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
        {isLoading ? [...new Array(6)].map((_, i) => <PizzaSkelet key={i} />) : filteredPizzas}
      </div>
      {!isLoading && (
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

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSkelet from '../components/PizzaBlock/PizzaSkelet';
import Sort from '../components/Sort';

const Home = ({ searchText }) => {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(0);
  const [activePage, setActivePage] = useState(1);

  const [activeSortProperty, setActiveSortProperty] = useState({
    name: 'популярности',
    sort: 'rating',
  });

  const category = activeCategory ? `&category=${activeCategory}` : '';
  const sort = `sortBy=${activeSortProperty.sort}`;

  const filteredPizzas = pizzas
    .filter(
      (pizza) =>
        pizza.name.toLowerCase().includes(searchText) && <PizzaBlock key={pizza.id} {...pizza} />,
    )
    .map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://62c160f7eff7f7856f0d3c98.mockapi.io/pizzas/pizzas?${sort}${category}&p=${activePage}&l=4`,
      )
      .then((res) => {
        setPizzas(res.data);
        setIsLoading(false);
        window.scrollTo(0, 0);
      });
  }, [category, sort, activePage]);
  return (
    <div className="container">
      <div className="content__top">
        <Categories value={activeCategory} onChangeValue={setActiveCategory} />
        <Sort
          activeSortProperty={activeSortProperty}
          onChangeSortProperty={setActiveSortProperty}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? [...new Array(6)].map(() => <PizzaSkelet />) : filteredPizzas}
      </div>
      {!isLoading && (
        <Pagination
          pageSize={4}
          itemCount={10}
          activePage={activePage}
          setActivePage={setActivePage}
        />
      )}
    </div>
  );
};

export default Home;

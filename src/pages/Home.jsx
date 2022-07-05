import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSkelet from '../components/PizzaBlock/PizzaSkelet';
import Sort from '../components/Sort';

const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios.get('https://62c160f7eff7f7856f0d3c98.mockapi.io/pizzas/pizzas/').then((res) => {
      setPizzas(res.data);
      setIsLoading(false);
      window.scrollTo(0, 0);
    });
  }, []);
  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map(() => <PizzaSkelet />)
          : pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
      </div>
    </div>
  );
};

export default Home;
import React, { useState } from 'react';

const categoryNames = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const Categories = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="categories">
      <ul>
        {categoryNames.map((el, i) => (
          <li
            key={i}
            className={activeIndex === i ? 'active' : ''}
            onClick={() => setActiveIndex(i)}>
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;

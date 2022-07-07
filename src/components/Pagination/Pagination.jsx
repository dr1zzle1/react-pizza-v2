import React from 'react';
import style from './Pagination.module.scss';

const Pagination = ({ itemCount, pageSize, activePage, setActivePage }) => {
  const arrowBtnHandler = (direction) => {
    if ((direction === '-') & (activePage > 1)) {
      setActivePage(activePage - 1);
    }
    if ((direction === '+') & (activePage < Math.ceil(itemCount / pageSize))) {
      setActivePage(activePage + 1);
    }
  };
  return (
    <div className={style.root}>
      <ul className={style.list}>
        <li onClick={() => arrowBtnHandler('-')} className={style.listItem}>
          {'<'}
        </li>
        {[...new Array(Math.ceil(itemCount / pageSize))].map((_, i) => (
          <li
            onClick={() => setActivePage(i + 1)}
            className={`${style.listItem} ${activePage === i + 1 && style.active}`}>
            {i + 1}
          </li>
        ))}
        <li onClick={() => arrowBtnHandler('+')} className={style.listItem}>
          {'>'}
        </li>
      </ul>
    </div>
  );
};

export default Pagination;

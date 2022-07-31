import React from 'react';
import style from './Pagination.module.scss';

type PropType = {
	itemCount: number,
	pageSize: number,
	activePage: number,
	setActivePage: (page: number) => void
}

type directionType = '+' | '-'

const Pagination: React.FC<PropType> = ({ itemCount, pageSize, activePage, setActivePage }) => {
	const arrowBtnHandler = (direction: directionType) => {
		if ((direction === '-') && (activePage > 1)) {
			setActivePage(activePage - 1);
		}
		if ((direction === '+') && (activePage < Math.ceil(itemCount / pageSize))) {
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
						key={i}
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

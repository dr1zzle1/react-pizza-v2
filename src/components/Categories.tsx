import React from 'react';

const categoryNames = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

type PropType = {
	value: number,
	onChangeValue: (i: number) => void
}

const Categories: React.FC<PropType> = ({ value, onChangeValue }) => {
	return (
		<div className="categories">
			<ul>
				{categoryNames.map((el, i) => (
					<li key={i} className={value === i ? 'active' : ''} onClick={() => onChangeValue(i)}>
						{el}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Categories;

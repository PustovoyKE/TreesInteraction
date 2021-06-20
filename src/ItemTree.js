import React from 'react';
import Item from './Item';

export default function ItemTree(props) {
	
	return (
		<div className="itemsTree" tabIndex="0">
			<Item
				items={props.items}
				onFocus={props.onFocus}
				onBlur={props.onBlur}
				onChange={props.onChange}
				onDragStart={props.onDragStart}
				onDragOver={props.onDragOver}
				onDrop={props.onDrop}/>
		</div>
	);
}
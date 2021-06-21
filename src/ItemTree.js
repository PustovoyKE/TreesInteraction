import React from 'react';
import Item from './Item';

export default function ItemTree(props) {
	return (
		<div className="itemsTree" tabIndex="0" 
			onFocus={props.onRootFocus}
			onDragOver={props.onRootDragOver}
			onDrop={props.onDrop}>
			
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
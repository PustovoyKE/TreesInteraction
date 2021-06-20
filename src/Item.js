import React from 'react';

export default function Item(props) {

	return (
		props.items.map(i =>
			<div 
				className="item" tabIndex="1" draggable={true}
				key={i.id}
				onFocus={e => props.onFocus(e, i)}
				onBlur={e => props.onBlur(e, i)}
				onDragStart={e => props.onDragStart(e, i)}
				onDragOver={e => props.onDragOver(e, i)}
				onDrop={e => props.onDrop(e, i)}>

				<input type="text" className="input" disabled={true}
				onChange={e => props.onChange(e, i)}
				defaultValue={i.name}/>
				
				{
					i.children && i.children.length ?
					<Item items={i.children}
						onFocus={props.onFocus}
						onBlur={props.onBlur}
						onChange={props.onChange}
						onDragStart={props.onDragStart}
						onDragOver={props.onDragOver}
						onDrop={props.onDrop}/> : null
				}
			</div>
		)
	);
}
import './App.css';
import ItemTree from './ItemTree';
import React from 'react';
import { useState, useEffect } from 'react';

export const ItemsTreeContext = React.createContext();

function itemFactory(id, name="Node_") {
	return {
		id: id,
		name: name + id,
		parent: null,
		children: []
	}
}

let id = 0;
const initialState = [itemFactory(-1), itemFactory(-2), itemFactory(-3)];

function App() {
	const [state, setState] = useState(initialState);
	const [selectedItem, setSelectedItem] = useState();
	const [selectedInput, setSelectedInput] = useState();
	const [dragItem, setDragItem] = useState();

	useEffect(() => {
		// console.log("useEffect");
	  });

	function addItem(newItem) {
		if (selectedItem === undefined) return;

		newItem.parent = selectedItem;
		selectedItem.children.push(newItem);
		
		setState(prev => [...prev]);
	}

	function removeItem(item) {
		if (item === undefined || item.parent === null) return;

		if (item.parent.children === undefined) {
			const index = item.parent.indexOf(item);
			item.parent.splice(index, 1);
		}
		else {
			const index = item.parent.children.indexOf(item);
			item.parent.children.splice(index, 1);
		}

		setState(prev => [...prev]);
		setSelectedItem(undefined);
	}

	function editItem() {
		if (selectedItem === undefined || selectedInput.target.children[0] === undefined) return;

		selectedInput.target.children[0].disabled = false;
		selectedInput.target.children[0].focus();
	}

	function resetState() {
		id = 0;
		setState(() => [itemFactory(-1), itemFactory(-2), itemFactory(-3)]);
	}

	function focusHandler(e, item) {
		e.stopPropagation();

		setSelectedItem(item);
		setSelectedInput(e);
	}

	function blurHandler(e) {
		e.stopPropagation();

		e.target.disabled  = true;
	}

	function changeHandler(e, item) {
		setState(prev => {
			item.name = e.target.value;
			return [...prev];
		});
	}

	function dragStartHandler(e, item) {
		e.stopPropagation();
		setDragItem(item);
	}

	function dragOverHandler(e, item){
		e.preventDefault();
		e.stopPropagation();

		setSelectedItem(item);
	}

	function dropHandler(e, item) {
		e.preventDefault();
		e.stopPropagation();

		//Нельзя переносить корневой объект
		if (dragItem.parent === null) return;

		//Нельзя переносить родителя в потомков
		function isParent(parent, child) {
			if (child.parent == null) {
				return false;
			}
			else {
				if (parent === child.parent) {
					return true;
				}
				else {
					return isParent(parent, child.parent);
				}
			}
		}
		if (isParent(dragItem, selectedItem)) return;
		
		//Нельзя переносить в себя
		if (dragItem === selectedItem) return;
		
		removeItem(dragItem);
		addItem(dragItem);
	}

	function rootFocusHandler(e, item) {
		e.stopPropagation();
		setSelectedItem(item);
	}

	return (
		<div className="App">
			<div className="itemTreesContainer">
			{
				state.map(i =>
					<ItemTree
						key={i.id}
						items={i.children}
						onRootFocus={e => rootFocusHandler(e, i)}
						onRootDragOver={e => dragOverHandler(e, i)}
						onBlur={blurHandler}
						onFocus={focusHandler}
						onChange={changeHandler}
						onDragStart={dragStartHandler}
						onDragOver={dragOverHandler}
						onDrop={dropHandler}/>
				)
			}
			</div>
			
			<div className="buttons">
				<ul>
					<li><button onClick={() => addItem(itemFactory(id++))} className="button">ADD</button></li>
					<li><button onClick={() => removeItem(selectedItem)} className="button">REMOVE</button></li>
					<li><button onClick={editItem} className="button">EDIT</button></li>
					<li><button onClick={resetState} className="button">RESET</button></li>
				</ul>
			</div>
		</div>
	);
}

export default App;
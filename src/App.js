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
const initialState = {
	itemTreeOne: [itemFactory(-1, "ROOT")],
	itemTreeTwo: [itemFactory(-1, "ROOT")],
	itemTreeThree: [itemFactory(-1, "ROOT")]
}

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
		setState(prev => ({...prev}));
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

		setState(prev => ({...prev}));
		setSelectedItem(undefined);
	}

	function editItem() {
		if (selectedItem === undefined || selectedInput.target.children[0] === undefined) return;

		selectedInput.target.children[0].disabled = false;
		selectedInput.target.children[0].focus();
	}

	function resetState() {
		id = 0;
		setState({
			itemTreeOne: [itemFactory(-1, "ROOT")],
			itemTreeTwo: [itemFactory(-1, "ROOT")],
			itemTreeThree: [itemFactory(-1, "ROOT")]
		});
	}

	function focusHandler(e, item) {
		e.stopPropagation();
		console.log(item);
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
			return {...prev};
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
		if (dragItem === selectedItem.parent) return;
		//Нельзя переносить в себя
		if (dragItem === selectedItem) return;
		
		removeItem(dragItem);
		addItem(dragItem);
	}

	return (
		<div className="App">
			<div className="itemTreesContainer">
				<ItemTree
					items={state.itemTreeOne}
					onBlur={blurHandler}
					onFocus={focusHandler}
					onChange={changeHandler}
					onDragStart={dragStartHandler}
					onDragOver={dragOverHandler}
					onDrop={dropHandler}/>
				<ItemTree
					items={state.itemTreeTwo}
					onBlur={blurHandler}
					onFocus={focusHandler}
					onChange={changeHandler}
					onDragStart={dragStartHandler}
					onDragOver={dragOverHandler}
					onDrop={dropHandler}/>
				<ItemTree
					items={state.itemTreeThree}
					onBlur={blurHandler}
					onFocus={focusHandler}
					onChange={changeHandler}
					onDragStart={dragStartHandler}
					onDragOver={dragOverHandler}
					onDrop={dropHandler}/>
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
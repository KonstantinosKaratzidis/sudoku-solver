import React from 'react';
import {getAffectedCells} from './utils.js';

const Cell = ({value, selected, highligted, wrong}) => {
	let className = "";
	if(selected)
		className += " selected";
	if(highligted)
		className += " highligted";
	if(wrong)
		className += " wrong";
	return (
		<input 
			className={className} value={value ? value : ""}
			type="text" color={wrong ? "red" : "black"} onChange={() => {}}></input>
		)
}

const Grid = ({cells, selected}) => {
	const highligted = getAffectedCells(selected);
	return (
		<div id="sudoku-grid">
			{cells.map((cell, index) =>
			<Cell {...cell} selected={index === selected}
				highligted={highligted.has(index)} key={index}/>)
			}
		</div>
	)
}

const Sudoku = ({cells, selected, dispatch}) => {
	return (
		<div id="sudoku">
			<Grid cells={cells} selected={selected} />
			<button onClick={() => dispatch({type: "SOLVE"})}>Solve</button>
			<button onClick={() => dispatch({type: "RESET"})}>Reset</button>
		</div>
	)
}

export default Sudoku;

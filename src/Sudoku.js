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
		<>
			{cells.map((cell, index) =>
			<Cell {...cell} selected={index === selected}
				highligted={highligted.has(index)} key={index}/>)
			}
		</>
	)
}

const NumberButtons = () => {
	return (
			<>
		{Array(9).fill(0).map((v, index) => (<button key={index}>{index + 1}</button>))}
		</>
	)
}

const Sudoku = ({cells, selected, dispatch}) => {
	return (
		<div id="sudoku">
			<div id="sudoku-grid">
				<Grid cells={cells} selected={selected} />
			</div>
			<div id="sudoku-controls">
				<div id="sudoku-controls-buttons">
					<button onClick={() => dispatch({type: "SOLVE"})}>Solve</button>
					<button onClick={() => dispatch({type: "RESET"})}>Reset</button>
				</div>
				<div class="spacer">
				</div>
				<div id="sudoku-controls-numbers">
					<NumberButtons />
				</div>
			</div>
		</div>
	)
}

export default Sudoku;

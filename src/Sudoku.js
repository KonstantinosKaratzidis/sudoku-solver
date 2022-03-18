import React from 'react';
import {getAffectedCells} from './utils.js';

const Cell = ({value, selected, highligted, wrong, onClick}) => {
	let className = "sudoku-cell ";
	if(selected)
		className += " selected";
	if(highligted)
		className += " highligted";
	if(wrong)
		className += " wrong";
	function whenClicked(){
		console.log("clicked");
		onClick();
	}
	return (
		<div 
			className={className} onClick={whenClicked}
			type="text" color={wrong ? "red" : "black"}>
		{value ? value : ""}
		</div>
		)
}

const Grid = ({cells, selected, dispatch}) => {
	const highligted = getAffectedCells(selected);
	return (
		<>
			{cells.map((cell, index) =>
			<Cell {...cell} selected={index === selected}
				onClick={() => dispatch({type: "SELECT_CELL", arg: index})}
				highligted={highligted.has(index)} key={index}/>)
			}
		</>
	)
}

const NumberButtons = ({dispatch}) => {
	return (
			<>
			{Array(9).fill(0).map((v, index) => (
				<button key={index} 
					onClick={() => dispatch({type: "EDIT", arg: index + 1})}>
					{index + 1}
				</button>))}
				<button onClick={() => dispatch({type: "EDIT", arg: 0})}>
					Clear
				</button>
		</>
	)
}

const Sudoku = ({cells, selected, dispatch}) => {
	return (
		<div id="sudoku">
			<div id="sudoku-grid">
				<Grid cells={cells} selected={selected} dispatch={dispatch}/>
			</div>
			<div id="sudoku-controls">
				<div id="sudoku-controls-buttons">
					<button onClick={() => dispatch({type: "SOLVE"})}>Solve</button>
					<button onClick={() => dispatch({type: "RESET"})}>Reset</button>
				</div>
				<div className="spacer">
				</div>
				<div id="sudoku-controls-numbers">
					<NumberButtons dispatch={dispatch}/>
				</div>
			</div>
		</div>
	)
}

export default Sudoku;

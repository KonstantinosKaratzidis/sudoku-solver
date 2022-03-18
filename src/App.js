import React, {useEffect, useReducer} from 'react';
import Sudoku from './Sudoku.js';
import {getAffectedCells, getNewSelected} from './utils.js';
import solve from './solve.js';

const keyToAction = {
	"ArrowUp": {type: "MOVE", arg: "UP"},
	"ArrowDown": {type: "MOVE", arg: "DOWN"},
	"ArrowLeft": {type: "MOVE", arg: "LEFT"},
	"ArrowRight": {type: "MOVE", arg: "RIGHT"},
	"0": {type: "EDIT", arg: 0},
	"1": {type: "EDIT", arg: 1},
	"2": {type: "EDIT", arg: 2},
	"3": {type: "EDIT", arg: 3},
	"4": {type: "EDIT", arg: 4},
	"5": {type: "EDIT", arg: 5},
	"6": {type: "EDIT", arg: 6},
	"7": {type: "EDIT", arg: 7},
	"8": {type: "EDIT", arg: 8},
	"9": {type: "EDIT", arg: 9},
	" ": {type: "EDIT", arg: 0},
}

function processEdit(state, arg) {
	const newState = {
		...state,
		isWrong: false,
		cells: state.cells.map((cell, index) => (
			(index !== state.selected)
				? {...cell, wrong: false}
				: {...cell, value: arg, wrong: false}
		)
	)}

	for(let i = 0; i < 81; i++){
		const cellValue = newState.cells[i].value;
		if(cellValue === 0)
			continue;
		const affected = getAffectedCells(i);
		affected.delete(i);
		for(const cell of affected){
			const affectedValue = newState.cells[cell].value;
			if(cellValue === affectedValue){
				newState.cells[i].wrong = true;
				newState.isWrong = true;
				break;
			}
		}
	}
	return newState;
}

function processAction(state, {type, arg}){
	switch(type){
		case "SELECT_CELL":
			return {...state, selected: arg};
		case "MOVE":
			return {...state, selected: getNewSelected(state.selected, arg)};
		case "EDIT":
			if(!state.editable)
				return state;
			return processEdit(state, arg);
		case "RESET":
			return initialState;
		case "SOLVE": // TODO: add error message when isWrong
			if(state.isWrong){
				console.error("FIX THE ERRORS FIRST");
				return state;
			}
			const cellArr = state.cells.map(cell => cell.value);
			return {
				...state,
				cells: solve(cellArr).map(value => ({value, wrong: false}))
			};
		default:
			return state;
	}
}

const initialState = {
	isWrong: false,
	editable: true,
	selected: 40,
	cells: Array(81).fill(0).map(() => ({
		value: 0,
		wrong: false
	}))
};

function App() {
	const [state, dispatch] = useReducer(processAction, initialState);

	useEffect(() => {
		document.addEventListener("keydown", (ev) => {
			const action = keyToAction[ev.key];
			if(action){
				ev.preventDefault();
				dispatch(action);
			}
		});
	}, [])

  return (
		<>
			<h1>Sudoku Solver</h1>
			<Sudoku {...state} dispatch={dispatch}/>
			<div className="extra">
				<h2>
					How to use
				</h2>
				<p>
					Click on a cell to select it and assign a number to it using 
					the button on the right. Once you have typed in the puzzle, click
					Solve to see the solution. The puzzle will only be solved if 
					there are no errors.
				</p>
				<p>
					If you are running this on a desktop you can also use arrow keys
					to navigate, and you don't have to use the number buttons, you can
					just type them.
				</p>
			</div>
			<div className="extra">
				<h2>
					About Sudoku
				</h2>
				<p>
					Sudoku is a logic-based, combinatorial number-placement puzzle.
					In classic Sudoku, the objective is to fill a 9 × 9 grid with
					digits so that each column, each row, and each of the nine 3 × 3
					subgrids that compose the grid (also called "boxes", "blocks",
					or "regions") contain all of the digits from 1 to 9. The puzzle
					setter provides a partially completed grid, which for a well-posed
					puzzle has a single solution. (taken from
					<a href="https://en.wikipedia.org/wiki/Sudoku"> Wikipedia</a>)
				</p>
			</div>
			<div className="extra">
				<h2>
					About this app
				</h2>
				<p>
					This application was written as a tool for deepening my knowledge
					on React. You can find the source code for this project on Github.
				</p>
			</div>
		</>
  );
}

export default App;

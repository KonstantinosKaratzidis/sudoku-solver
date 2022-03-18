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
		</>
  );
}

export default App;

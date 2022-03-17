import React from 'react';
import Cell from './Cell.js';
import {getAffectedCells} from './utils.js';

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

export default Grid;

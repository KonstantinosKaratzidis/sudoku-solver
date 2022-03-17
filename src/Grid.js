import React from 'react';
import Cell from './Cell.js';

const Grid = ({cells, selected}) => {
	return (
		<div id="sudoku-grid">
			{cells.map((cell, index) =>
				<Cell {...cell} key={index}/>)
			}
		</div>
	)
}

export default Grid;

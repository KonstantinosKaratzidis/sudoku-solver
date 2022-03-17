import React, {useState, useEffect} from 'react';
import Grid from './Grid.js';
import {getAffectedCells, getNewSelected} from './utils.js';

const cells = Array(81).fill(0).map(() => {
	return {
		value: 0,
		selected: false,
		highligted: false,
		wrong: false
	}
});

const selected = 0;



function App() {
	const [selected, setSelected] = useState(30);

	useEffect(() => {
		const keyHandler = (ev) => {
			setSelected(getNewSelected(selected, ev.key));
		}
		document.addEventListener("keydown", keyHandler);
		return () => document.removeEventListener("keydown", keyHandler);
	})

	const affected = getAffectedCells(selected);
	const state = cells.map((cell, index) => {
		return {
			...cell,
			selected: index === selected,
			highligted: affected.has(index)
		}
	})
  return (
		<Grid cells={state} />
  );
}

export default App;

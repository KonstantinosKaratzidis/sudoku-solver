import {getAffectedCells} from './utils.js'

function getUnsolved(cells){
	const unsolved = new Set();
	cells.forEach((val, index) => {
		if(val === 0)
			unsolved.add(index);
	})
	return unsolved;
}

function getSuitableFor(cells, position){
	const suitable = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
	const affected = getAffectedCells(position, false);
	affected.forEach(value => suitable.delete(cells[value]));
	return suitable;
}

function solveInfer(cells){
	cells = [...cells];
	let didInfer = true;

	do {
		didInfer = false;

		const unsolved = getUnsolved(cells);

		for(const position of unsolved){
			const suitable = getSuitableFor(cells, position);
			if(suitable.size === 1){
				cells[position] = Array.from(suitable.values())[0];
				didInfer = true;
			}
		}
	} while(didInfer);

	return cells;
}

function solveBackTrack(cells){
	return cells;
}

function solve(cells){
	console.clear();
	const inferSolved = solveInfer(cells);
	const backtrackSolved = solveBackTrack(inferSolved);
	return backtrackSolved;
}

export default solve;

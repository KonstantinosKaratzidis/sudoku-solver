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
	let unsolved = Array.from(getUnsolved(cells).keys());
	unsolved = unsolved.map((index) => ({index, suitable: []}))

	if(unsolved.length === 0)
		return cells;

	cells = [...cells];

	let i = 0, solved = false;
	
	unsolved[0].suitable = Array.from(getSuitableFor(cells, unsolved[0].index));
	while(i >= 0 && !solved){
		const cellIndex = unsolved[i].index;
		const suitable = unsolved[i].suitable;
		
		if(suitable.length === 0){
			cells[cellIndex] = 0;
			i--;
			continue;
		} else {
			cells[cellIndex] = suitable.pop();
			i++;
			if(i === unsolved.length)
				solved = true;
			else{
				unsolved[i].suitable = Array.from(getSuitableFor(cells, unsolved[i].index));
			}
		}
	}

	return cells;
}

function solve(cells){
	const inferSolved = solveInfer(cells);
	const backtrackSolved = solveBackTrack(inferSolved);
	return backtrackSolved;
}

export default solve;

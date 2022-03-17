export function getAffectedCells(cell){
	const affected = new Set();
	const row = Math.floor(cell / 9);
	const col = cell % 9;

	for(let i = 0; i < 9; i++){
		// column
		affected.add(col + i * 9);
		// row
		affected.add(row * 9 + i);
	}

	// 3x3 box
	const cornerRow = Math.floor(row / 3) * 3;
	const cornerCol = Math.floor(col / 3);

	for(let i = 0; i < 3; i++){
		for(let j = 0; j < 3; j++){
			affected.add(cornerRow * 9 + i * 9 + cornerCol * 3 + j)
			affected.add(cornerRow * 9 + i * 9 + cornerCol * 3 + j)
			affected.add(cornerRow * 9 + i * 9 + cornerCol * 3 + j)
		}
	}

	return affected;
}

export function getNewSelected(cell, direction){
	if(direction === "ArrowUp"){
		const newCell = cell - 9;
		if(newCell >= 0)
			return newCell;
		return 81 + newCell;
	} else if(direction === "ArrowDown"){
		const newCell = cell + 9;
		if(newCell < 81)
			return newCell;
		return newCell % 81;
	} else if(direction === "ArrowLeft"){
		const firstInRow = Math.floor(cell / 9) * 9;
		if(cell - 1 >= firstInRow)
			return cell - 1;
		return firstInRow + 8;
	} else if(direction === "ArrowRight"){
		const lastInRow = Math.floor(cell / 9) * 9 + 8;
		if(cell + 1 <= lastInRow)
			return cell + 1;
		return lastInRow - 8;
	} else 
		return cell
}
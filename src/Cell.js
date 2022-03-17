import React from 'react';

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
			type="text" onChange={() => {}}></input>
		)
}

export default Cell;

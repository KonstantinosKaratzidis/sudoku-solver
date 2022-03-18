import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./sudoku-styles.css";

ReactDOM.render(
  <React.StrictMode>
		<>
			<h1>Sudoku Solver</h1>
			<App />
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
  </React.StrictMode>,
  document.getElementById('root')
);

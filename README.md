# Sudoku Solver

A web application for solving sudoku puzzles.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup the repository
In the project directory, you can run:

### `npm install`

In order to run the app, execute:

### `npm start`

This will run the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## About the project

The structure of the app is quite simple. There are two major components, the visible sudoku grid and the solving algorithm.

### The grid

The Sudoku component is responsible for maintaining the app's state, processing user input and changing the state as needed.

### The algorithm

The solving algorithm calls two subfunctions, one that tries to solve the puzzle by inference and one that does it by depth first search. The algorithm expects that the puzzle passes as input is valid, if it contains errors the output is unspecified. Due to the nature of the depth first search algorithm a valid puzzle will always get solved, even an empty one.

The infering algorithm determines which choices are available for each unsolved cell. If there are cells for which only one choice can be made, then that unique choice is written to the cell. Since deciding on a number for a cell might help in determining the number of other cells following the same process of inference, the algorithm will run in a loop for as long as choices can be infered for the cells. Once it cannot solve any other cells it passes the partially solved puzzle to the next algorithm.

The depth first search / backtracking algorithm is simple as well. It picks an unsolved cell, finds out all possible numbers for it and picks one, after which it moves to the next unsolved cell. If at any point there are no numbers to be picked for the cell at hand, the algorithm goes to the previous cell (backtracks), picks another number and goes back to the next cell again, until all the cells have been given a number.

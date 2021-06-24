import React, { useEffect, useState } from 'react';
import uniqid from 'uniqid';
import Nav from './components/Nav';
import image from './components/kirby.png';

const App = () => {
	// menu click position
	const [menuPosition, setMenuPosition] = useState({
		left: -120,
		top: -120,
	});

	// characters position
	const [cowboyKirbyPosition, setCowboyKirbyPosition] = useState({});
	const [cheesePosition, setCheesePosition] = useState({});
	const [oldSchoolKirbyPosition, setOldSchoolKirbyPosition] = useState({});

	// boolean characters found
	const [cowboyKirbyFound, setCowboyKirbyFound] = useState(false);
	const [cheeseFound, setCheeseFound] = useState(false);
	const [oldSchoolKirbyFound, setOldSchoolKirbyFound] = useState(false);

	// results characters names display
	const [cowboy, setCowboy] = useState('name-style');
	const [cheese, setCheese] = useState('name-style');
	const [oldSchool, setOldSchool] = useState('name-style');

	// timer & game state
	const [timer, setTimer] = useState(0);
	const [gameStarted, setGameStarted] = useState(false);
	const [gameOver, setGameOver] = useState(false);

	// high score
	const [highScores, setHighScores] = useState([]);

	useEffect(() => {
		setCowboyKirbyPosition({
			name: 'Cowboy Kirby',
			xStart: 384,
			xEnd: 439,
			yStart: 408,
			yEnd: 457,
		});
		setCheesePosition({
			name: 'Cheese',
			xStart: 913,
			xEnd: 932,
			yStart: 193,
			yEnd: 208,
		});
		setOldSchoolKirbyPosition({
			name: 'Old School Kirby',
			xStart: 282,
			xEnd: 314,
			yStart: 272,
			yEnd: 292,
		});
	}, []);

	const increaseTimer = () => {
		setTimer((timer) => timer + 1);
	};

	const renderFinalTime = (totalSeconds) => {
		totalSeconds %= 3600;
		const minutes = Math.floor(totalSeconds / 60);
		const seconds = totalSeconds % 60;
		return (
			minutes.toString().padStart(2, '0') +
			':' +
			seconds.toString().padStart(2, '0')
		);
	};

	const startGame = (event) => {
		setGameStarted(true);
		event.target.classList.add('hide');
	};

	useEffect(() => {
		if (gameStarted && !gameOver) {
			let interval = setInterval(() => {
				increaseTimer();
			}, 1000);
			return () => clearInterval(interval);
		}
	});

	const showMenu = (event) => {
		if (gameStarted && !gameOver) {
			const clickPosition = getClickPositionsOnImg(event);
			setMenuPosition({
				left: clickPosition.x - 30,
				top: clickPosition.y + 25,
				// left: clickPosition.x - 15,
				// top: clickPosition.y + 35,
			});
		}
	};

	const getClickPositionsOnImg = (event) => {
		const elementPosition = document
			.getElementById('image')
			.getBoundingClientRect();
		return {
			x: event.clientX - elementPosition.x,
			y: event.clientY - elementPosition.y,
		};
	};

	const handleUserAnswer = (characterPosition, event) => {
		if (
			menuPosition.left + 30 > characterPosition.xStart &&
			menuPosition.left + 30 < characterPosition.xEnd &&
			menuPosition.top - 25 > characterPosition.yStart &&
			menuPosition.top - 25 < characterPosition.yEnd
			// menuPosition.left + 15 > characterPosition.xStart &&
			// menuPosition.left + 15 < characterPosition.xEnd &&
			// menuPosition.top - 35 > characterPosition.yStart &&
			// menuPosition.top - 35 < characterPosition.yEnd
		) {
			if (characterPosition.name === 'Cowboy Kirby') {
				event.target.classList.add('hide');
				setCowboyKirbyFound(true);
				setCowboy('found');
			} else if (characterPosition.name === 'Cheese') {
				event.target.classList.add('hide');
				setCheeseFound(true);
				setCheese('found');
			} else if (characterPosition.name === 'Old School Kirby') {
				event.target.classList.add('hide');
				setOldSchoolKirbyFound(true);
				setOldSchool('found');
			}
		} else {
			return;
		}
		setMenuPosition({
			left: -120,
			top: -120,
		});
	};

	const resetGame = () => {
		setGameOver(false);
		setGameStarted(false);
		setCowboyKirbyFound(false);
		setCowboy('name-style');
		setCheeseFound(false);
		setCheese('name-style');
		setOldSchoolKirbyFound(false);
		setOldSchool('name-style');
		setTimer(0);
		setMenuPosition({
			left: -120,
			top: -120,
		});
		const cowboyBtn = document.querySelector('#cowboy-kirby-button');
		cowboyBtn.classList.remove('hide');
		const cheeseBtn = document.querySelector('#cheese-button');
		cheeseBtn.classList.remove('hide');
		const oldSchoolBtn = document.querySelector('#old-school-kirby-button');
		oldSchoolBtn.classList.remove('hide');
		const startBtn = document.querySelector('.start-btn');
		startBtn.classList.remove('hide');
	};

	const showHighscore = (event) => {
		const highscore = document.querySelector('.highscore');
		highscore.classList.toggle('hide');
		if (event.target.innerText === 'Highscores') {
			event.target.innerText = '----Close----';
		} else if (event.target.innerText === '----Close----') {
			event.target.innerText = 'Highscores';
		}
	};

	const capitalizeFirstLetter = (word) => {
		return word.charAt(0).toUpperCase() + word.slice(1);
	};

	useEffect(() => {
		if (cowboyKirbyFound && cheeseFound && oldSchoolKirbyFound) {
			let finalTimer = timer;
			alert('You found everyone in ' + finalTimer + '!');
			setGameOver(true);
			const userName = prompt('Enter your name to record your score: ');
			const score = { id: uniqid(), name: userName, score: finalTimer };
			highScores.push(score);
			highScores.sort((a, b) => {
				return a.score - b.score;
			});
			setHighScores(highScores);
			resetGame();
		}
	}, [cowboyKirbyFound, cheeseFound, oldSchoolKirbyFound, timer, highScores]);

	return (
		<div className="App">
			<div id="game">
				<Nav
					startGame={startGame}
					showHighscore={showHighscore}
					timer={timer}
				/>
				<img
					id="image"
					src={image}
					alt="Where is Waldo?"
					onClick={(event) => showMenu(event)}
				/>
				<div className="results">
					<ul>
						<h2>Let's find:</h2>
						<li className={cowboy}>Cowboy Kirby</li>
						<li className={cheese}>Cheese</li>
						<li className={oldSchool}>Old School Kirby</li>
					</ul>
				</div>
				<div id="menu-container" style={menuPosition}>
					<div id="menu" />
					<div className="menu-btn">
						<button
							className="btn blob blob1"
							id="cowboy-kirby-button"
							onClick={(event) => handleUserAnswer(cowboyKirbyPosition, event)}
						>
							Cowboy Kirby
						</button>
						<button
							className="btn blob blob2"
							id="cheese-button"
							onClick={(event) => handleUserAnswer(cheesePosition, event)}
						>
							Cheese
						</button>
						<button
							className="btn blob blob3"
							id="old-school-kirby-button"
							onClick={(event) =>
								handleUserAnswer(oldSchoolKirbyPosition, event)
							}
						>
							Old School Kirby
						</button>
					</div>
				</div>
			</div>
			<div className="highscore hide">
				<h1>Highscores Board:</h1>
				{highScores.map((item, index) => (
					<div key={item.id} id={item.id} className="score">
						{index + 1}. {capitalizeFirstLetter(item.name)}{' '}
						{renderFinalTime(item.score)}
					</div>
				))}
			</div>
		</div>
	);
};

export default App;
